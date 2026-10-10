import { expect, test } from "@playwright/test";

test.use({
  storageState: "playwright/.auth/admin.json",
});

test.setTimeout(180_000);

test("creates, modifies and publishes an accommodation", async ({
  page,
}, testInfo) => {
  const retrySuffix = testInfo.retry === 0 ? "" : ` R${testInfo.retry}`;

  const slugRetrySuffix = testInfo.retry === 0 ? "" : `-r${testInfo.retry}`;

  const initialName = `Le Refuge E2E${retrySuffix}`;
  const updatedName = `${initialName} Modifié`;
  const expectedSlug = `le-refuge-e2e${slugRetrySuffix}`;

  //
  // 1. Create
  //

  await page.goto("/admin/logements/nouveau", {
    waitUntil: "domcontentloaded",
  });

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Créer un logement",
    }),
  ).toBeVisible();

  await page.getByLabel("Nom du logement").fill(initialName);

  await page.getByLabel("Type de logement").fill("Cabane de test automatisé");

  const createResponsePromise = page.waitForResponse(
    (response) =>
      response.request().method() === "POST" &&
      new URL(response.url()).pathname === "/admin/logements/nouveau",
    {
      timeout: 30_000,
    },
  );

  await page
    .getByRole("button", {
      name: "Créer et personnaliser",
    })
    .click();

  const createResponse = await createResponsePromise;

  expect(createResponse.ok()).toBe(true);

  // La création déclenche elle-même un router.push vers l'éditeur.
  // On attend qu'il soit réellement terminé avant de continuer.
  await expect(page).toHaveURL(/\/admin\/logements\/[^/]+\/modifier$/);

  const createdEditHref = new URL(page.url()).pathname;

  //
  // 2. Check in admin
  //

  await page.goto("/admin/logements", {
    waitUntil: "domcontentloaded",
  });

  const accommodationRow = page.getByRole("row").filter({
    has: page.getByText(initialName, {
      exact: true,
    }),
  });

  const paginationButtons = page.getByRole("button", {
    name: /^Page \d+$/,
  });

  await expect
    .poll(
      async () =>
        (await accommodationRow.isVisible()) ||
        (await paginationButtons.count()) > 0,
    )
    .toBe(true);

  if (!(await accommodationRow.isVisible())) {
    await paginationButtons.last().click();

    await expect(accommodationRow).toBeVisible();
  }

  const editLink = accommodationRow.locator(
    'a[href^="/admin/logements/"][href$="/modifier"]',
  );

  await expect(editLink).toBeVisible();

  const editHref = await editLink.getAttribute("href");

  expect(editHref).not.toBeNull();
  expect(editHref).toBe(createdEditHref);

  //
  // 3. Open editor
  //

  await editLink.click();

  await expect(page).toHaveURL(createdEditHref);

  const nameField = page.getByLabel("Nom");

  await expect(nameField).toHaveValue(initialName);

  //
  // 4. Update
  //

  const autosaveResponsePromise = page.waitForResponse(
    (response) =>
      response.request().method() === "POST" &&
      new URL(response.url()).pathname === createdEditHref,
    {
      timeout: 30_000,
    },
  );

  await nameField.fill(updatedName);

  const autosaveResponse = await autosaveResponsePromise;

  expect(autosaveResponse.ok()).toBe(true);

  await expect(nameField).toHaveValue(updatedName);

  //
  // 5. Publication
  //

  const statusTrigger = page.getByLabel("Modifier le statut du logement");

  await statusTrigger.click();

  await page
    .getByRole("menuitem", {
      name: "Publié",
      exact: true,
    })
    .click();

  await expect(statusTrigger).toContainText("Publié");

  const publishResponsePromise = page.waitForResponse(
    (response) =>
      response.request().method() === "POST" &&
      new URL(response.url()).pathname === createdEditHref,
    {
      timeout: 30_000,
    },
  );

  const reloadPromise = page.waitForEvent("load");

  const saveButton = page.getByRole("button", {
    name: "Enregistrer",
    exact: true,
  });

  await expect(saveButton).toBeEnabled();

  await saveButton.click();

  const publishResponse = await publishResponsePromise;

  expect(publishResponse.ok()).toBe(true);

  // L'application appelle window.location.reload() après la sauvegarde.
  // Surtout ne pas lancer un page.goto() en concurrence avec ce reload.
  await reloadPromise;

  //
  // 6. Verify persisted state
  //

  await expect(page).toHaveURL(createdEditHref);

  await expect(page.getByLabel("Nom")).toHaveValue(updatedName);

  await expect(page.getByLabel("Modifier le statut du logement")).toContainText(
    "Publié",
  );

  //
  // 7. Public check
  //

  await page.goto("/logements", {
    waitUntil: "domcontentloaded",
  });

  const publicLink = page.locator(`a[href="/logements/${expectedSlug}"]`);

  await expect(publicLink).toBeVisible();

  await expect(publicLink).toContainText(updatedName);

  const publicHref = await publicLink.getAttribute("href");

  expect(publicHref).toBe(`/logements/${expectedSlug}`);

  //
  // 8. Public page
  //

  await publicLink.click();

  await expect(page).toHaveURL(`/logements/${expectedSlug}`);

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: updatedName,
    }),
  ).toBeVisible();
});
