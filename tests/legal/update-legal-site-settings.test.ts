import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";

const { revalidatePathMock } = vi.hoisted(() => ({
  revalidatePathMock: vi.fn(),
}));

vi.mock("next/cache", () => ({
  revalidatePath: revalidatePathMock,
}));

import { updateLegalSiteSettingsAdmin } from "@/lib/admin/legal/commands/update-legal-site-settings";
import {
  LEGAL_SITE_SETTINGS_ID,
  legalSiteSettingsDefaults,
} from "@/lib/legal/legal-site-defaults";
import type { LegalSiteSettingsValues } from "@/lib/legal/legal-site.schema";
import { prisma } from "@/lib/prisma";

const createLegalSettingsValues = (
  overrides: Partial<LegalSiteSettingsValues> = {},
): LegalSiteSettingsValues => ({
  ...legalSiteSettingsDefaults,
  ...overrides,
});

describe("updateLegalSiteSettingsAdmin", () => {
  beforeEach(async () => {
    await prisma.legalSiteSettings.deleteMany();

    vi.clearAllMocks();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("creates the legal site settings", async () => {
    const result = await updateLegalSiteSettingsAdmin(
      createLegalSettingsValues({
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
      }),
    );

    expect(result).toEqual({
      success: true,
    });

    const settings = await prisma.legalSiteSettings.findUniqueOrThrow({
      where: {
        id: LEGAL_SITE_SETTINGS_ID,
      },
    });

    expect(settings).toMatchObject({
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

    expect(revalidatePathMock).toHaveBeenCalledWith("/mentions-legales");

    expect(revalidatePathMock).toHaveBeenCalledWith(
      "/politique-de-confidentialite",
    );

    expect(revalidatePathMock).toHaveBeenCalledWith(
      "/admin/informations-legales",
    );
  });

  it("stores empty fields as null", async () => {
    const result = await updateLegalSiteSettingsAdmin(
      createLegalSettingsValues({
        businessName: "Évasion SARL",
        legalForm: "SARL",

        email: "",
        phone: "",
        privacyEmail: "",
        hostPhone: "",
      }),
    );

    expect(result).toEqual({
      success: true,
    });

    const settings = await prisma.legalSiteSettings.findUniqueOrThrow({
      where: {
        id: LEGAL_SITE_SETTINGS_ID,
      },
    });

    expect(settings.businessName).toBe("Évasion SARL");
    expect(settings.legalForm).toBe("SARL");

    expect(settings.email).toBeNull();
    expect(settings.phone).toBeNull();
    expect(settings.privacyEmail).toBeNull();
    expect(settings.hostPhone).toBeNull();
  });

  it("updates the existing singleton instead of creating another row", async () => {
    await updateLegalSiteSettingsAdmin(
      createLegalSettingsValues({
        businessName: "Ancienne société",
        email: "ancien@example.com",
      }),
    );

    const result = await updateLegalSiteSettingsAdmin(
      createLegalSettingsValues({
        businessName: "Évasion SARL",
        email: "contact@evasion.fr",
      }),
    );

    expect(result).toEqual({
      success: true,
    });

    const settings = await prisma.legalSiteSettings.findUniqueOrThrow({
      where: {
        id: LEGAL_SITE_SETTINGS_ID,
      },
    });

    expect(settings.businessName).toBe("Évasion SARL");
    expect(settings.email).toBe("contact@evasion.fr");

    expect(await prisma.legalSiteSettings.count()).toBe(1);
  });

  it("rejects invalid settings", async () => {
    const result = await updateLegalSiteSettingsAdmin(
      createLegalSettingsValues({
        email: "invalid-email",
      }),
    );

    expect(result).toEqual({
      success: false,
      message: "Les informations légales renseignées sont invalides.",
    });

    expect(await prisma.legalSiteSettings.count()).toBe(0);

    expect(revalidatePathMock).not.toHaveBeenCalled();
  });

  it("does not overwrite existing settings when validation fails", async () => {
    await updateLegalSiteSettingsAdmin(
      createLegalSettingsValues({
        businessName: "Évasion SARL",
        email: "contact@evasion.fr",
      }),
    );

    vi.clearAllMocks();

    const result = await updateLegalSiteSettingsAdmin(
      createLegalSettingsValues({
        businessName: "Nom à ne pas enregistrer",
        email: "invalid-email",
      }),
    );

    expect(result).toEqual({
      success: false,
      message: "Les informations légales renseignées sont invalides.",
    });

    const settings = await prisma.legalSiteSettings.findUniqueOrThrow({
      where: {
        id: LEGAL_SITE_SETTINGS_ID,
      },
    });

    expect(settings.businessName).toBe("Évasion SARL");
    expect(settings.email).toBe("contact@evasion.fr");

    expect(revalidatePathMock).not.toHaveBeenCalled();
  });
});
