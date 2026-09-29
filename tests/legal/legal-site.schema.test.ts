import { describe, expect, it } from "vitest";

import { legalSiteSettingsDefaults } from "@/lib/legal/legal-site-defaults";
import { legalSiteSettingsSchema } from "@/lib/legal/legal-site.schema";

describe("legalSiteSettingsSchema", () => {
  it("accepts valid legal settings", () => {
    const result = legalSiteSettingsSchema.safeParse({
      ...legalSiteSettingsDefaults,

      businessName: "Évasion SARL",
      legalForm: "SARL",
      capital: "10 000 €",

      registeredOfficeAddress: "1 rue de la Drôme, 26000 Valence",
      email: "contact@evasion.fr",
      phone: "04 00 00 00 00",

      siren: "123 456 789",
      siret: "123 456 789 00012",
      rcs: "RCS Romans-sur-Isère 123 456 789",
      rne: "123 456 789",
      vatNumber: "FR00123456789",

      publicationDirector: "Jean Dupont",

      hostName: "Vercel",
      hostCompany: "Vercel Inc.",
      hostAddress: "340 S Lemon Ave #4133, Walnut, CA 91789",
      hostPhone: "+1 559 288 7060",

      privacyEmail: "privacy@evasion.fr",
      contactDataRetentionPeriod: "12 mois après le dernier échange",
    });

    expect(result.success).toBe(true);
  });

  it("accepts empty optional email fields", () => {
    const result = legalSiteSettingsSchema.safeParse({
      ...legalSiteSettingsDefaults,
      email: "",
      privacyEmail: "",
    });

    expect(result.success).toBe(true);
  });

  it("rejects an invalid company email", () => {
    const result = legalSiteSettingsSchema.safeParse({
      ...legalSiteSettingsDefaults,
      email: "contact-evasion",
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.flatten().fieldErrors.email).toContain(
        "Adresse e-mail invalide.",
      );
    }
  });

  it("rejects an invalid privacy email", () => {
    const result = legalSiteSettingsSchema.safeParse({
      ...legalSiteSettingsDefaults,
      privacyEmail: "privacy-evasion",
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.flatten().fieldErrors.privacyEmail).toContain(
        "Adresse e-mail invalide.",
      );
    }
  });

  it("trims submitted values", () => {
    const result = legalSiteSettingsSchema.parse({
      ...legalSiteSettingsDefaults,
      businessName: "  Évasion SARL  ",
      email: "  contact@evasion.fr  ",
    });

    expect(result.businessName).toBe("Évasion SARL");
    expect(result.email).toBe("contact@evasion.fr");
  });
});
