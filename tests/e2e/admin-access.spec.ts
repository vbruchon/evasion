import { expect, test } from "@playwright/test";

test("redirects an unauthenticated visitor to the login page", async ({
  page,
}) => {
  await page.goto("/admin");

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
