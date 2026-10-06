import { expect, test } from "@playwright/test";

test("navigates through the main public pages", async ({ page }) => {
  await page.goto("/", {
    waitUntil: "domcontentloaded",
  });

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Des lieux à part, pour s’évader à deux.",
    }),
  ).toBeVisible();

  const navigation = page.getByRole("navigation", {
    name: "Navigation principale",
  });

  const accommodationsLink = navigation.getByRole("link", {
    name: "Nos logements",
  });

  await expect(accommodationsLink).toHaveAttribute("href", "/logements");

  await page.goto("/logements", {
    waitUntil: "domcontentloaded",
  });

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Nos logements",
    }),
  ).toBeVisible();

  const aboutLink = navigation.getByRole("link", {
    name: "À propos",
  });

  await expect(aboutLink).toHaveAttribute("href", "/a-propos");

  await page.goto("/a-propos", {
    waitUntil: "domcontentloaded",
  });

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Des lieux à part, pour des moments qui comptent.",
    }),
  ).toBeVisible();

  const reviewsLink = navigation.getByRole("link", {
    name: "Avis",
  });

  await expect(reviewsLink).toHaveAttribute("href", "/avis");

  await page.goto("/avis", {
    waitUntil: "domcontentloaded",
  });

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Leurs moments, leurs mots.",
    }),
  ).toBeVisible();

  const faqLink = navigation.getByRole("link", {
    name: "FAQ",
  });

  await expect(faqLink).toHaveAttribute("href", "/faq");

  await page.goto("/faq", {
    waitUntil: "domcontentloaded",
  });

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Tout ce qu’il faut savoir avant votre Évasion.",
    }),
  ).toBeVisible();

  const contactLink = page.getByRole("banner").getByRole("link", {
    name: "Nous contacter",
  });

  await expect(contactLink).toHaveAttribute("href", "/contact");

  await page.goto("/contact", {
    waitUntil: "domcontentloaded",
  });

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Parlons de votre prochaine Évasion.",
    }),
  ).toBeVisible();
});
