import { expect, test } from "@playwright/test";

test.use({
  storageState: "playwright/.auth/admin.json",
});

test.setTimeout(180_000);

test("creates, modifies and publishes an accommodation", async ({ page }) => {
  const initialName = "Le Refuge E2E";
  const updatedName = "Le Refuge E2E Modifié";
  const expectedSlug = "le-refuge-e2e";

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

  await expect(accommodationRow).toBeVisible();

  const editLink = accommodationRow.locator(
    'a[href^="/admin/logements/"][href$="/modifier"]',
  );

  await expect(editLink).toBeVisible();

  const editHref = await editLink.getAttribute("href");

  expect(editHref).not.toBeNull();
  expect(editHref).toMatch(/^\/admin\/logements\/[^/]+\/modifier$/);

  //
  // 3. open editor
  //

  await page.goto(editHref!, {
    waitUntil: "domcontentloaded",
  });

  await expect(page).toHaveURL(/\/admin\/logements\/[^/]+\/modifier$/);

  const nameField = page.getByLabel("Nom");

  await expect(nameField).toHaveValue(initialName);

  //
  // 4. Update
  //

  const autosaveResponsePromise = page.waitForResponse(
    (response) =>
      response.request().method() === "POST" &&
      new URL(response.url()).pathname === editHref,
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
      new URL(response.url()).pathname === editHref,
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

  //
  // 6. Verifying the actual persisted state
  //

  await page.goto(editHref!, {
    waitUntil: "domcontentloaded",
  });

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

  const publicLink = page.getByRole("link", {
    name: `Découvrir ${updatedName}`,
  });

  await expect(publicLink).toBeVisible();

  const publicHref = await publicLink.getAttribute("href");

  expect(publicHref).toBe(`/logements/${expectedSlug}`);

  //
  // 8. Public page
  //

  await page.goto(publicHref!, {
    waitUntil: "domcontentloaded",
  });

  await expect(page).toHaveURL(`/logements/${expectedSlug}`);

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: updatedName,
    }),
  ).toBeVisible();
});
