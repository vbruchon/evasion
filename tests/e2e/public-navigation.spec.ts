import { expect, test } from "@playwright/test";

test("navigates through the main public pages", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Des lieux à part, pour s’évader à deux.",
    }),
  ).toBeVisible();

  const navigation = page.getByRole("navigation", {
    name: "Navigation principale",
  });

  await navigation.getByRole("link", { name: "Nos logements" }).click();

  await expect(page).toHaveURL("/logements");
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Nos logements",
    }),
  ).toBeVisible();

  await navigation.getByRole("link", { name: "À propos" }).click();

  await expect(page).toHaveURL("/a-propos");
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Des lieux à part, pour des moments qui comptent.",
    }),
  ).toBeVisible();

  await navigation.getByRole("link", { name: "Avis" }).click();

  await expect(page).toHaveURL("/avis");
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Leurs moments, leurs mots.",
    }),
  ).toBeVisible();

  await navigation.getByRole("link", { name: "FAQ" }).click();

  await expect(page).toHaveURL("/faq");
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Tout ce qu’il faut savoir avant votre Évasion.",
    }),
  ).toBeVisible();

  await page
    .getByRole("banner")
    .getByRole("link", { name: "Nous contacter" })
    .click();

  await expect(page).toHaveURL("/contact");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Parlons de votre prochaine Évasion.",
    }),
  ).toBeVisible();
});
