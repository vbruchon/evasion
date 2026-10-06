import { expect, test } from "@playwright/test";

test("redirects an unauthenticated visitor to the login page", async ({
  page,
}) => {
  await page.goto("/admin", {
    waitUntil: "domcontentloaded",
  });

  await expect(page).toHaveURL(/\/connexion$/);

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Connexion à Évasion",
    }),
  ).toBeVisible();

  await expect(
    page.getByRole("button", {
      name: "Continuer avec Google",
    }),
  ).toBeVisible();
});

test.describe("authenticated admin", () => {
  test.use({
    storageState: "playwright/.auth/admin.json",
  });

  test("allows an authenticated admin to access the dashboard", async ({
    page,
  }) => {
    await page.goto("/admin", {
      waitUntil: "domcontentloaded",
    });

    await expect(page).toHaveURL("/admin");

    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /Bonjour, Admin/,
      }),
    ).toBeVisible();
  });
});
