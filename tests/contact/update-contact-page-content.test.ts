import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";

const { revalidatePathMock } = vi.hoisted(() => ({
  revalidatePathMock: vi.fn(),
}));

vi.mock("next/cache", () => ({
  revalidatePath: revalidatePathMock,
}));

import { updateContactPageContentAdmin } from "@/lib/admin/contact/commands/update-contact-page-content";
import {
  CONTACT_PAGE_CONTENT_ID,
  contactPageContentDefaults,
} from "@/lib/contact/contact-page-defaults";
import type { ContactPageContentValues } from "@/lib/contact/contact-page.schema";
import { prisma } from "@/lib/prisma";

const createContentValues = (
  overrides: Partial<ContactPageContentValues> = {},
): ContactPageContentValues => ({
  ...contactPageContentDefaults,
  ...overrides,
});

describe("updateContactPageContentAdmin", () => {
  beforeEach(async () => {
    await prisma.contactPageContent.deleteMany();

    vi.clearAllMocks();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("creates the contact page content with all editable fields", async () => {
    const values = createContentValues({
      title: "Parlons de votre séjour.",
      reassuranceFirstLabel: "Réponse sous 24 h",

      accommodationSubjectTitle: "À propos d’un logement",
      accommodationSubjectDescription:
        "Une question concernant votre futur séjour",

      otherSubjectTitle: "Une autre question",
      otherSubjectDescription: "Pour toute autre demande",

      accommodationLabel: "Choisissez votre logement",

      firstNameLabel: "Votre prénom",
      firstNamePlaceholder: "Ex. : Camille",

      emailLabel: "Votre e-mail",
      emailPlaceholder: "Ex. : camille@email.fr",

      messageLabel: "Votre message",
      messagePlaceholder: "Expliquez-nous votre demande...",

      submitLabel: "Envoyer",

      successEyebrow: "Merci",
      successTitle: "Votre message a bien été envoyé.",
      successDescription: "Nous vous répondrons dans les meilleurs délais.",
      successResetLabel: "Envoyer une nouvelle demande",
    });

    const result = await updateContactPageContentAdmin(values);

    expect(result).toEqual({
      success: true,
    });

    const createdContent = await prisma.contactPageContent.findUniqueOrThrow({
      where: {
        id: CONTACT_PAGE_CONTENT_ID,
      },
    });

    expect(createdContent).toMatchObject({
      title: "Parlons de votre séjour.",
      reassuranceFirstLabel: "Réponse sous 24 h",

      accommodationSubjectTitle: "À propos d’un logement",
      accommodationSubjectDescription:
        "Une question concernant votre futur séjour",

      otherSubjectTitle: "Une autre question",
      otherSubjectDescription: "Pour toute autre demande",

      accommodationLabel: "Choisissez votre logement",

      firstNameLabel: "Votre prénom",
      firstNamePlaceholder: "Ex. : Camille",

      emailLabel: "Votre e-mail",
      emailPlaceholder: "Ex. : camille@email.fr",

      messageLabel: "Votre message",
      messagePlaceholder: "Expliquez-nous votre demande...",

      submitLabel: "Envoyer",

      successEyebrow: "Merci",
      successTitle: "Votre message a bien été envoyé.",
      successDescription: "Nous vous répondrons dans les meilleurs délais.",
      successResetLabel: "Envoyer une nouvelle demande",
    });

    expect(revalidatePathMock).toHaveBeenCalledWith("/contact");
    expect(revalidatePathMock).toHaveBeenCalledWith("/admin/contact");
  });

  it("updates an existing contact page content", async () => {
    const firstResult = await updateContactPageContentAdmin(
      createContentValues({
        formTitle: "Titre initial",
        messageLabel: "Message initial",
        successTitle: "Confirmation initiale",
      }),
    );

    expect(firstResult).toEqual({
      success: true,
    });

    const secondResult = await updateContactPageContentAdmin(
      createContentValues({
        formTitle: "Titre modifié",
        messageLabel: "Votre demande",
        successTitle: "Merci pour votre message.",
        successResetLabel: "Écrire un autre message",
      }),
    );

    expect(secondResult).toEqual({
      success: true,
    });

    const updatedContent = await prisma.contactPageContent.findUniqueOrThrow({
      where: {
        id: CONTACT_PAGE_CONTENT_ID,
      },
    });

    expect(updatedContent).toMatchObject({
      formTitle: "Titre modifié",
      messageLabel: "Votre demande",
      successTitle: "Merci pour votre message.",
      successResetLabel: "Écrire un autre message",
    });

    expect(
      await prisma.contactPageContent.count({
        where: {
          id: CONTACT_PAGE_CONTENT_ID,
        },
      }),
    ).toBe(1);
  });

  it("rejects invalid contact page content", async () => {
    const result = await updateContactPageContentAdmin(
      createContentValues({
        formTitle: "",
      }),
    );

    expect(result).toEqual({
      success: false,
      message: "Le contenu de la page Contact est invalide.",
    });

    expect(
      await prisma.contactPageContent.findUnique({
        where: {
          id: CONTACT_PAGE_CONTENT_ID,
        },
      }),
    ).toBeNull();

    expect(revalidatePathMock).not.toHaveBeenCalled();
  });

  it("does not overwrite existing content when an update is invalid", async () => {
    await updateContactPageContentAdmin(
      createContentValues({
        title: "Titre conservé",
      }),
    );

    vi.clearAllMocks();

    const result = await updateContactPageContentAdmin(
      createContentValues({
        title: "",
      }),
    );

    expect(result).toEqual({
      success: false,
      message: "Le contenu de la page Contact est invalide.",
    });

    const persistedContent = await prisma.contactPageContent.findUniqueOrThrow({
      where: {
        id: CONTACT_PAGE_CONTENT_ID,
      },
    });

    expect(persistedContent.title).toBe("Titre conservé");

    expect(revalidatePathMock).not.toHaveBeenCalled();
  });
});
