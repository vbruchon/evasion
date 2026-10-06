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

  //
  // 1. The “Accommodation” topic is selected by default
  //

  const accommodationSubject = page.getByRole("button", {
    name: /A place to Live/,
  });

  const otherSubject = page.getByRole("button", {
    name: /Other Request/,
  });

  await expect(accommodationSubject).toHaveAttribute("aria-pressed", "true");

  await expect(
    page.getByText("Quel logement ?", {
      exact: true,
    }),
  ).toBeVisible();

  //
  // 2. Selecting an accommodation
  //

  const accommodationCard = page.getByRole("button", {
    name: "La Cabane",
  });

  await accommodationCard.click();

  await expect(accommodationCard).toHaveAttribute("aria-pressed", "true");

  //
  // 3. Hovering over “Other Request” hides the housing selector
  //

  await otherSubject.click();

  await expect(otherSubject).toHaveAttribute("aria-pressed", "true");

  await expect(
    page.getByText("Quel logement ?", {
      exact: true,
    }),
  ).not.toBeVisible();

  //
  // 4. A Look Back at “A place to Live”
  //

  await accommodationSubject.click();

  await expect(accommodationSubject).toHaveAttribute("aria-pressed", "true");

  await expect(accommodationCard).toHaveAttribute("aria-pressed", "false");

  //
  // 5. Wait for the test Turnstile to make the form usable.
  //
  const submitButton = page.getByRole("button", {
    name: "Envoyer ma demande",
  });

  await expect(submitButton).toBeEnabled({
    timeout: 30_000,
  });

  //
  // 6. Validation of Required Fields
  //

  await submitButton.click();

  await expect(
    page.getByText("Votre adresse e-mail est requise."),
  ).toBeVisible();

  await expect(page.getByText("Votre message est requis.")).toBeVisible();

  await expect(
    page.getByText("Sélectionnez le logement concerné."),
  ).toBeVisible();

  //
  // 7. Validating the email address format
  //

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
