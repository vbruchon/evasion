import { expect, test } from "@playwright/test";

test.setTimeout(90_000);

test("validates the public contact form flow", async ({ page }) => {
  let contactActionRequests = 0;

  page.on("request", (request) => {
    if (
      request.method() === "POST" &&
      new URL(request.url()).pathname === "/contact"
    ) {
      contactActionRequests += 1;
    }
  });

  await page.goto("/contact", {
    waitUntil: "domcontentloaded",
  });

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Parlons de votre prochaine Évasion.",
    }),
  ).toBeVisible();

  const accommodationSubject = page.getByRole("button", {
    name: /Un logement/,
  });

  const otherSubject = page.getByRole("button", {
    name: /Autre demande/,
  });

  await expect(accommodationSubject).toHaveAttribute("aria-pressed", "true");

  await expect(
    page.getByText("Quel logement ?", {
      exact: true,
    }),
  ).toBeVisible();

  const accommodationCard = page.getByRole("button", {
    name: "La Cabane",
  });

  await accommodationCard.click();

  await expect(accommodationCard).toHaveAttribute("aria-pressed", "true");

  await otherSubject.click();

  await expect(otherSubject).toHaveAttribute("aria-pressed", "true");

  await expect(
    page.getByText("Quel logement ?", {
      exact: true,
    }),
  ).not.toBeVisible();

  await accommodationSubject.click();

  await expect(accommodationSubject).toHaveAttribute("aria-pressed", "true");

  await expect(accommodationCard).toHaveAttribute("aria-pressed", "false");

  const submitButton = page.getByRole("button", {
    name: "Envoyer ma demande",
  });

  await expect(submitButton).toBeEnabled({
    timeout: 30_000,
  });

  await submitButton.click();

  await expect(
    page.getByText("Votre adresse e-mail est requise."),
  ).toBeVisible();

  await expect(page.getByText("Votre message est requis.")).toBeVisible();

  await expect(
    page.getByText("Sélectionnez le logement concerné."),
  ).toBeVisible();

  await page.getByLabel("E-mail").fill("adresse-invalide");

  await page
    .getByLabel("Comment pouvons-nous vous aider ?")
    .fill("Bonjour, j’ai une question sur ce logement.");

  await submitButton.click();

  await expect(
    page.getByText("Saisissez une adresse e-mail valide."),
  ).toBeVisible();

  expect(contactActionRequests).toBe(0);
});
