import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";

import type {
  AccommodationDraftContent,
  AccommodationUpdateImageInput,
} from "~/app/admin/logements/schema";

import { saveAccommodationDraftAdmin } from "@/lib/admin/accommodation/save-accommodation-draft.action";
import { deleteUploadThingFiles } from "@/lib/admin/uploadthing/delete-files";
import { prisma } from "@/lib/prisma";

import { createAccommodationFixture } from "../helpers/create-accommodation-fixture";
import { resetAccommodationDatabase } from "../helpers/database";
import { createAccommodationDraftValues } from "../helpers/accommodation-values";

type DraftValues = AccommodationDraftContent["values"];
type DraftHighlights = AccommodationDraftContent["highlights"];

const createDraftValues = (
  overrides: Partial<DraftValues> = {},
): DraftValues => ({
  name: "Le Chalet modifié",
  type: "Chalet premium",
  subtitle: "Un nouveau sous-titre",
  shortDescription:
    "Une nouvelle description courte enregistrée dans le brouillon.",
  description:
    "Une nouvelle description complète enregistrée uniquement dans le brouillon.",

  guestCapacity: 4,
  bedrooms: 2,
  beds: 3,
  bathrooms: 2,
  surface: 72.5,

  ...overrides,
});

describe("saveAccommodationDraftAdmin", () => {
  beforeEach(async () => {
    await resetAccommodationDatabase();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("creates a draft without modifying the published accommodation", async () => {
    const publicationDate = new Date("2026-08-01T10:00:00.000Z");

    const accommodation = await createAccommodationFixture({
      name: "Le Chalet publié",
      type: "Chalet",
      subtitle: "Version publique",
      shortDescription: "Description publique courte",
      description: "Description publique complète",

      guestCapacity: 2,
      bedrooms: 1,
      beds: 1,
      bathrooms: 1,
      surface: 45,

      status: "PUBLISHED",
      publishedAt: publicationDate,

      images: [
        {
          fileKey: "published-cover",
          url: "https://example.com/published-cover.webp",
          isCover: true,
        },
      ],

      highlights: [
        {
          title: "Spa public",
          description: "Description publique",
          icon: "Waves",
        },
      ],
    });

    const existingImage = accommodation.images[0];
    const existingHighlight = accommodation.highlights[0];

    const draftHighlights: DraftHighlights = [
      {
        id: existingHighlight.id,
        title: "Spa privatif",
        description: "Nouvelle description spa",
        icon: "Waves",
      },
      {
        title: "Vue montagne",
        description: "Panorama sur le Vercors",
        icon: "Mountain",
      },
    ];

    const result = await saveAccommodationDraftAdmin(
      accommodation.id,
      createAccommodationDraftValues(),
      [
        {
          id: existingImage.id,
          isCover: false,
        },
        {
          url: "https://example.com/draft-image.webp",
          fileKey: "draft-image",
          isCover: true,
        },
      ],
      draftHighlights,
    );

    expect(result).toEqual({
      success: true,
    });

    const persistedAccommodation = await prisma.accommodation.findUniqueOrThrow(
      {
        where: {
          id: accommodation.id,
        },

        include: {
          images: true,
          highlights: true,
          draft: true,
        },
      },
    );

    expect(persistedAccommodation).toMatchObject({
      name: "Le Chalet publié",
      type: "Chalet",
      subtitle: "Version publique",
      shortDescription: "Description publique courte",
      description: "Description publique complète",

      guestCapacity: 2,
      bedrooms: 1,
      beds: 1,
      bathrooms: 1,
      surface: 45,

      status: "PUBLISHED",
      publishedAt: publicationDate,
    });

    expect(persistedAccommodation.images).toHaveLength(1);
    expect(persistedAccommodation.images[0].fileKey).toBe("published-cover");

    expect(persistedAccommodation.highlights).toHaveLength(1);

    expect(persistedAccommodation.highlights[0]).toMatchObject({
      id: existingHighlight.id,
      title: "Spa public",
      description: "Description publique",
      icon: "Waves",
    });

    expect(persistedAccommodation.draft).not.toBeNull();

    expect(persistedAccommodation.draft?.content).toEqual({
      version: 1,

      values: {
        name: "Le Chalet modifié",
        type: "Chalet premium",
        subtitle: "Un nouveau sous-titre",
        shortDescription:
          "Une nouvelle description courte enregistrée dans le brouillon.",
        description:
          "Une nouvelle description complète enregistrée uniquement dans le brouillon.",

        guestCapacity: 4,
        bedrooms: 2,
        beds: 3,
        bathrooms: 2,
        surface: 72.5,
      },

      images: [
        {
          id: existingImage.id,
          isCover: false,
        },
        {
          url: "https://example.com/draft-image.webp",
          fileKey: "draft-image",
          isCover: true,
        },
      ],

      highlights: draftHighlights,
    });
  });

  it("updates the existing draft instead of creating another one", async () => {
    const accommodation = await createAccommodationFixture({
      status: "PUBLISHED",
    });

    await saveAccommodationDraftAdmin(
      accommodation.id,
      createDraftValues({
        name: "First draft",
      }),
      [],
      [],
    );

    const firstDraft = await prisma.accommodationDraft.findUniqueOrThrow({
      where: {
        accommodationId: accommodation.id,
      },
    });

    await saveAccommodationDraftAdmin(
      accommodation.id,
      createDraftValues({
        name: "Second draft",
      }),
      [],
      [
        {
          title: "Nouveau point fort",
          description: "Description",
          icon: "Sparkles",
        },
      ],
    );

    const drafts = await prisma.accommodationDraft.findMany({
      where: {
        accommodationId: accommodation.id,
      },
    });

    expect(drafts).toHaveLength(1);
    expect(drafts[0].id).toBe(firstDraft.id);

    expect(drafts[0].content).toMatchObject({
      version: 1,

      values: {
        name: "Second draft",
      },

      highlights: [
        {
          title: "Nouveau point fort",
          description: "Description",
          icon: "Sparkles",
        },
      ],
    });
  });

  it("rejects creating a modification draft for an unpublished accommodation", async () => {
    const accommodation = await createAccommodationFixture({
      status: "DRAFT",
    });

    const images: AccommodationUpdateImageInput[] = [
      {
        url: "https://example.com/new-draft-image.webp",
        fileKey: "new-draft-image",
        isCover: true,
      },
    ];

    const result = await saveAccommodationDraftAdmin(
      accommodation.id,
      createAccommodationDraftValues(),
      images,
      [],
    );

    expect(result).toEqual({
      success: false,
      message:
        "Un brouillon de modifications ne peut être créé que pour un logement publié.",
    });

    expect(
      await prisma.accommodationDraft.findUnique({
        where: {
          accommodationId: accommodation.id,
        },
      }),
    ).toBeNull();

    expect(deleteUploadThingFiles).toHaveBeenCalledWith(["new-draft-image"]);
  });

  it("rejects an existing image that belongs to another accommodation", async () => {
    const accommodation = await createAccommodationFixture({
      status: "PUBLISHED",

      images: [
        {
          fileKey: "legitimate-image",
        },
      ],
    });

    const otherAccommodation = await createAccommodationFixture({
      status: "PUBLISHED",
      position: 2,

      images: [
        {
          fileKey: "foreign-image",
        },
      ],
    });

    const foreignImage = otherAccommodation.images[0];

    const result = await saveAccommodationDraftAdmin(
      accommodation.id,
      createAccommodationDraftValues(),
      [
        {
          id: foreignImage.id,
          isCover: false,
        },
        {
          url: "https://example.com/new-image.webp",
          fileKey: "new-image",
          isCover: true,
        },
      ],
      [],
    );

    expect(result).toEqual({
      success: false,
      message: "Une image sélectionnée n'appartient pas à ce logement.",
    });

    expect(
      await prisma.accommodationDraft.findUnique({
        where: {
          accommodationId: accommodation.id,
        },
      }),
    ).toBeNull();

    expect(deleteUploadThingFiles).toHaveBeenCalledWith(["new-image"]);
  });

  it("rejects an existing highlight that belongs to another accommodation", async () => {
    const accommodation = await createAccommodationFixture({
      status: "PUBLISHED",
      highlights: [
        {
          title: "Highlight légitime",
          icon: "Sparkles",
        },
      ],
    });

    const otherAccommodation = await createAccommodationFixture({
      status: "PUBLISHED",
      position: 2,
      highlights: [
        {
          title: "Highlight étranger",
          icon: "Mountain",
        },
      ],
    });

    const foreignHighlight = otherAccommodation.highlights[0];

    const result = await saveAccommodationDraftAdmin(
      accommodation.id,
      createAccommodationDraftValues(),
      [],
      [
        {
          id: foreignHighlight.id,
          title: foreignHighlight.title,
          description: foreignHighlight.description,
          icon: foreignHighlight.icon,
        },
      ],
    );

    expect(result).toEqual({
      success: false,
      message: "Un point fort n'appartient pas à ce logement.",
    });

    expect(
      await prisma.accommodationDraft.findUnique({
        where: {
          accommodationId: accommodation.id,
        },
      }),
    ).toBeNull();
  });

  it("removes draft-only files that are no longer referenced after saving", async () => {
    const accommodation = await createAccommodationFixture({
      status: "PUBLISHED",
    });

    await saveAccommodationDraftAdmin(
      accommodation.id,
      createAccommodationDraftValues(),
      [
        {
          url: "https://example.com/draft-a.webp",
          fileKey: "draft-a",
          isCover: true,
        },
        {
          url: "https://example.com/draft-b.webp",
          fileKey: "draft-b",
          isCover: false,
        },
      ],
      [],
    );

    await saveAccommodationDraftAdmin(
      accommodation.id,
      createDraftValues({
        name: "Updated draft",
      }),
      [
        {
          url: "https://example.com/draft-b.webp",
          fileKey: "draft-b",
          isCover: true,
        },
        {
          url: "https://example.com/draft-c.webp",
          fileKey: "draft-c",
          isCover: false,
        },
      ],
      [],
    );

    expect(deleteUploadThingFiles).toHaveBeenLastCalledWith(["draft-a"]);

    const draft = await prisma.accommodationDraft.findUniqueOrThrow({
      where: {
        accommodationId: accommodation.id,
      },
    });

    expect(draft.content).toMatchObject({
      images: [
        {
          fileKey: "draft-b",
        },
        {
          fileKey: "draft-c",
        },
      ],
    });
  });

  it("keeps existing draft files when updating the draft with invalid data", async () => {
    const accommodation = await createAccommodationFixture({
      status: "PUBLISHED",
    });

    await saveAccommodationDraftAdmin(
      accommodation.id,
      createAccommodationDraftValues(),
      [
        {
          url: "https://example.com/existing-draft-image.webp",
          fileKey: "existing-draft-image",
          isCover: true,
        },
      ],
      [],
    );

    vi.mocked(deleteUploadThingFiles).mockClear();

    const result = await saveAccommodationDraftAdmin(
      accommodation.id,
      createDraftValues({
        name: "",
      }),
      [
        {
          url: "https://example.com/existing-draft-image.webp",
          fileKey: "existing-draft-image",
          isCover: true,
        },
        {
          url: "https://example.com/new-draft-image.webp",
          fileKey: "new-draft-image",
          isCover: false,
        },
      ],
      [],
    );

    expect(result).toEqual({
      success: false,
      message: "Les données du brouillon sont invalides.",
    });

    expect(deleteUploadThingFiles).toHaveBeenCalledWith(["new-draft-image"]);

    expect(deleteUploadThingFiles).not.toHaveBeenCalledWith([
      "existing-draft-image",
    ]);

    const draft = await prisma.accommodationDraft.findUniqueOrThrow({
      where: {
        accommodationId: accommodation.id,
      },
    });

    expect(draft.content).toMatchObject({
      values: {
        name: "Le Chalet modifié",
      },

      images: [
        {
          fileKey: "existing-draft-image",
        },
      ],
    });
  });

  it("rejects saving a draft for an accommodation that does not exist", async () => {
    await expect(
      saveAccommodationDraftAdmin(
        "accommodation-inexistante",
        createAccommodationDraftValues(),
        [
          {
            url: "https://example.com/orphan.webp",
            fileKey: "orphan",
            isCover: true,
          },
        ],
        [],
      ),
    ).rejects.toThrow("Logement introuvable");

    expect(deleteUploadThingFiles).toHaveBeenCalledWith(["orphan"]);
  });
});
