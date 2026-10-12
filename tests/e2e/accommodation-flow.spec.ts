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
  const startingPrice = 275;
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
  // 4. Update name
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
  // 5. Update starting price
  //

  await page
    .getByRole("button", {
      name: "Infos clés",
      exact: true,
    })
    .click();

  const startingPriceField = page.getByLabel("Prix à partir de");

  await expect(startingPriceField).toHaveValue("");

  const priceAutosaveResponsePromise = page.waitForResponse(
    (response) =>
      response.request().method() === "POST" &&
      new URL(response.url()).pathname === createdEditHref,
    {
      timeout: 30_000,
    },
  );

  await startingPriceField.fill(String(startingPrice));

  const priceAutosaveResponse = await priceAutosaveResponsePromise;

  expect(priceAutosaveResponse.ok()).toBe(true);

  await expect(startingPriceField).toHaveValue(String(startingPrice));

  //
  // 6. Publication
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

  const saveButton = page.getByRole("button", {
    name: "Enregistrer",
    exact: true,
  });

  await expect(saveButton).toBeEnabled();

  await saveButton.click();

  const publishResponse = await publishResponsePromise;

  expect(publishResponse.ok()).toBe(true);

  await expect(
    page.getByRole("button", {
      name: "Sauvegarder en brouillon",
    }),
  ).toBeVisible();

  //
  // 7. Verify persisted state
  //

  await expect(page).toHaveURL(createdEditHref);

  await expect(page.getByLabel("Nom")).toHaveValue(updatedName);

  await expect(page.getByLabel("Modifier le statut du logement")).toContainText(
    "Publié",
  );

  await page
    .getByRole("button", {
      name: "Infos clés",
      exact: true,
    })
    .click();

  await expect(page.getByLabel("Prix à partir de")).toHaveValue(
    String(startingPrice),
  );

  //
  // 8. Public list check
  //

  await page.goto("/logements", {
    waitUntil: "domcontentloaded",
  });

  const publicLink = page.locator(`a[href="/logements/${expectedSlug}"]`);

  await expect(publicLink).toBeVisible();

  await expect(publicLink).toContainText(updatedName);

  await expect(
    publicLink.getByText("À partir de", {
      exact: true,
    }),
  ).toBeVisible();

  await expect(
    publicLink.getByText(`${startingPrice} €`, {
      exact: true,
    }),
  ).toBeVisible();

  const publicHref = await publicLink.getAttribute("href");

  expect(publicHref).toBe(`/logements/${expectedSlug}`);

  //
  // 9. Public page
  //

  await publicLink.click();

  await expect(page).toHaveURL(`/logements/${expectedSlug}`);

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: updatedName,
    }),
  ).toBeVisible();

  await expect(
    page.getByText("À partir de", {
      exact: true,
    }),
  ).toBeVisible();

  await expect(
    page.getByText(`${startingPrice} €`, {
      exact: true,
    }),
  ).toBeVisible();
});
