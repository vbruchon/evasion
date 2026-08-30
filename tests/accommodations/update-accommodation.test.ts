import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";

import type {
  AccommodationUpdateFormValues,
  AccommodationUpdateImageInput,
} from "~/app/admin/logements/schema";

import { updateAccommodationAdmin } from "@/lib/admin/accommodation/update-accommodation.action";
import { deleteUploadThingFiles } from "@/lib/admin/uploadthing/delete-files";
import { prisma } from "@/lib/prisma";

import { createAccommodationFixture } from "../helpers/create-accommodation-fixture";
import { resetAccommodationDatabase } from "../helpers/database";

const updateValues = (
  overrides: Partial<AccommodationUpdateFormValues> = {},
): AccommodationUpdateFormValues => ({
  name: "Le Chalet Modifié",
  type: "Chalet premium",
  subtitle: "Un nouveau sous-titre",
  shortDescription:
    "Une nouvelle description courte après modification du logement.",
  description:
    "La nouvelle description complète enregistrée par l'éditeur visuel.",

  guestCapacity: 4,
  bedrooms: 2,
  beds: 3,
  bathrooms: 2,
  surface: 72.5,

  highlights: [],

  status: "PUBLISHED",
  ...overrides,
});

describe("updateAccommodationAdmin", () => {
  beforeEach(async () => {
    await resetAccommodationDatabase();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("updates the accommodation content without changing its slug", async () => {
    const accommodation = await createAccommodationFixture({
      slug: "le-chalet-immuable",
      status: "DRAFT",
    });

    const result = await updateAccommodationAdmin(
      accommodation.id,
      updateValues(),
      [],
    );

    expect(result).toEqual({
      success: true,
    });

    const updatedAccommodation = await prisma.accommodation.findUniqueOrThrow({
      where: {
        id: accommodation.id,
      },
    });

    expect(updatedAccommodation).toMatchObject({
      name: "Le Chalet Modifié",
      slug: "le-chalet-immuable",
      type: "Chalet premium",
      subtitle: "Un nouveau sous-titre",

      guestCapacity: 4,
      bedrooms: 2,
      beds: 3,
      bathrooms: 2,
      surface: 72.5,

      status: "PUBLISHED",
    });

    expect(updatedAccommodation.publishedAt).not.toBeNull();
  });

  it("keeps existing images, adds new images and removes deleted images", async () => {
    const accommodation = await createAccommodationFixture({
      images: [
        {
          fileKey: "existing-cover",
          url: "https://example.com/existing-cover.webp",
          position: 0,
          isCover: true,
        },
        {
          fileKey: "existing-second",
          url: "https://example.com/existing-second.webp",
          position: 1,
          isCover: false,
        },
        {
          fileKey: "image-to-remove",
          url: "https://example.com/remove.webp",
          position: 2,
          isCover: false,
        },
      ],
    });

    const cover = accommodation.images.find(
      (image) => image.fileKey === "existing-cover",
    )!;

    const second = accommodation.images.find(
      (image) => image.fileKey === "existing-second",
    )!;

    const images: AccommodationUpdateImageInput[] = [
      {
        id: second.id,
        isCover: false,
      },
      {
        url: "https://example.com/new-image.webp",
        fileKey: "new-image",
        isCover: true,
      },
      {
        id: cover.id,
        isCover: false,
      },
    ];

    const result = await updateAccommodationAdmin(
      accommodation.id,
      updateValues({
        status: "DRAFT",
      }),
      images,
    );

    expect(result).toEqual({
      success: true,
    });

    const persistedImages = await prisma.accommodationImage.findMany({
      where: {
        accommodationId: accommodation.id,
      },
      orderBy: {
        position: "asc",
      },
    });

    expect(persistedImages).toHaveLength(3);

    expect(
      persistedImages.map((image) => ({
        fileKey: image.fileKey,
        position: image.position,
        isCover: image.isCover,
      })),
    ).toEqual([
      {
        fileKey: "existing-second",
        position: 0,
        isCover: false,
      },
      {
        fileKey: "new-image",
        position: 1,
        isCover: true,
      },
      {
        fileKey: "existing-cover",
        position: 2,
        isCover: false,
      },
    ]);

    expect(
      await prisma.accommodationImage.findFirst({
        where: {
          fileKey: "image-to-remove",
        },
      }),
    ).toBeNull();

    expect(deleteUploadThingFiles).toHaveBeenCalledWith(["image-to-remove"]);
  });

  it("updates, creates, removes and reorders highlights", async () => {
    const accommodation = await createAccommodationFixture({
      highlights: [
        {
          title: "Spa privatif",
          description: "Ancienne description spa",
          icon: "Waves",
          position: 0,
        },
        {
          title: "Vue montagne",
          description: "Ancienne description montagne",
          icon: "Mountain",
          position: 1,
        },
        {
          title: "Point à supprimer",
          description: "Ce point doit disparaître",
          icon: "Sparkles",
          position: 2,
        },
      ],
    });

    const spa = accommodation.highlights.find(
      (highlight) => highlight.title === "Spa privatif",
    )!;

    const mountain = accommodation.highlights.find(
      (highlight) => highlight.title === "Vue montagne",
    )!;

    const result = await updateAccommodationAdmin(
      accommodation.id,
      updateValues({
        highlights: [
          {
            id: mountain.id,
            title: "Vue sur le Vercors",
            description: "Panorama sur les reliefs du Vercors",
            icon: "Mountain",
          },
          {
            title: "Terrasse privative",
            description: "Un espace ouvert sur le paysage",
            icon: "Sun",
          },
          {
            id: spa.id,
            title: "Spa privatif",
            description: "Jacuzzi rien que pour vous",
            icon: "Waves",
          },
        ],
      }),
      [],
    );

    expect(result).toEqual({
      success: true,
    });

    const highlights = await prisma.accommodationHighlight.findMany({
      where: {
        accommodationId: accommodation.id,
      },
      orderBy: {
        position: "asc",
      },
    });

    expect(
      highlights.map((highlight) => ({
        id: highlight.id,
        title: highlight.title,
        description: highlight.description,
        icon: highlight.icon,
        position: highlight.position,
      })),
    ).toEqual([
      {
        id: mountain.id,
        title: "Vue sur le Vercors",
        description: "Panorama sur les reliefs du Vercors",
        icon: "Mountain",
        position: 0,
      },
      {
        id: expect.any(String),
        title: "Terrasse privative",
        description: "Un espace ouvert sur le paysage",
        icon: "Sun",
        position: 1,
      },
      {
        id: spa.id,
        title: "Spa privatif",
        description: "Jacuzzi rien que pour vous",
        icon: "Waves",
        position: 2,
      },
    ]);

    expect(
      highlights.some((highlight) => highlight.title === "Point à supprimer"),
    ).toBe(false);
  });

  it("rejects an existing highlight that belongs to another accommodation", async () => {
    const accommodation = await createAccommodationFixture({
      highlights: [
        {
          title: "Highlight légitime",
          icon: "Sparkles",
        },
      ],
    });

    const otherAccommodation = await createAccommodationFixture({
      position: 2,
      highlights: [
        {
          title: "Highlight étranger",
          icon: "Mountain",
        },
      ],
    });

    const foreignHighlight = otherAccommodation.highlights[0];

    const result = await updateAccommodationAdmin(
      accommodation.id,
      updateValues({
        highlights: [
          {
            id: foreignHighlight.id,
            title: foreignHighlight.title,
            description: foreignHighlight.description,
            icon: foreignHighlight.icon,
          },
        ],
      }),
      [],
    );

    expect(result).toEqual({
      success: false,
      message: expect.stringContaining("appartient"),
    });

    const persistedHighlights = await prisma.accommodationHighlight.findMany({
      where: {
        accommodationId: accommodation.id,
      },
    });

    expect(persistedHighlights).toHaveLength(1);
    expect(persistedHighlights[0].title).toBe("Highlight légitime");
  });

  it("rejects an existing image that belongs to another accommodation", async () => {
    const accommodation = await createAccommodationFixture({
      images: [
        {
          fileKey: "legitimate-image",
        },
      ],
    });

    const otherAccommodation = await createAccommodationFixture({
      position: 2,
      images: [
        {
          fileKey: "foreign-image",
        },
      ],
    });

    const foreignImage = otherAccommodation.images[0];

    const result = await updateAccommodationAdmin(
      accommodation.id,
      updateValues(),
      [
        {
          id: foreignImage.id,
          isCover: true,
        },
      ],
    );

    expect(result).toEqual({
      success: false,
      message: expect.stringContaining("appartient"),
    });

    const persistedAccommodation = await prisma.accommodation.findUniqueOrThrow(
      {
        where: {
          id: accommodation.id,
        },
      },
    );

    expect(persistedAccommodation.name).toBe(accommodation.name);

    const legitimateImage = await prisma.accommodationImage.findUniqueOrThrow({
      where: {
        id: accommodation.images[0].id,
      },
    });

    expect(legitimateImage.fileKey).toBe("legitimate-image");
  });

  it("removes the existing draft when changes are saved directly", async () => {
    const accommodation = await createAccommodationFixture({
      status: "PUBLISHED",
      images: [
        {
          url: "https://example.com/published-image.webp",
          fileKey: "published-image",
          isCover: true,
        },
      ],
    });

    const publishedImage = accommodation.images[0];

    await prisma.accommodationDraft.create({
      data: {
        accommodationId: accommodation.id,
        content: {
          version: 1,
          values: {
            name: "Draft chalet",
            type: "Draft type",
            subtitle: "Draft subtitle",
            shortDescription: "Draft short description",
            description: "Draft description",
          },
          images: [
            {
              id: publishedImage.id,
              isCover: false,
            },
            {
              url: "https://example.com/draft-kept.webp",
              fileKey: "draft-kept",
              isCover: true,
            },
            {
              url: "https://example.com/draft-abandoned.webp",
              fileKey: "draft-abandoned",
              isCover: false,
            },
          ],
        },
      },
    });

    const result = await updateAccommodationAdmin(
      accommodation.id,
      updateValues({
        name: "Directly saved chalet",
        status: "PUBLISHED",
      }),
      [
        {
          id: publishedImage.id,
          isCover: false,
        },
        {
          url: "https://example.com/draft-kept.webp",
          fileKey: "draft-kept",
          isCover: true,
        },
      ],
    );

    expect(result).toEqual({
      success: true,
    });

    const updatedAccommodation = await prisma.accommodation.findUniqueOrThrow({
      where: {
        id: accommodation.id,
      },
      include: {
        draft: true,

        images: {
          orderBy: {
            position: "asc",
          },
        },
      },
    });

    expect(updatedAccommodation.name).toBe("Directly saved chalet");

    expect(updatedAccommodation.draft).toBeNull();

    expect(updatedAccommodation.images.map((image) => image.fileKey)).toEqual([
      "published-image",
      "draft-kept",
    ]);

    expect(deleteUploadThingFiles).toHaveBeenCalledWith(["draft-abandoned"]);
  });

  it("keeps existing draft files when direct saving fails", async () => {
    const accommodation = await createAccommodationFixture({
      status: "PUBLISHED",
    });

    await prisma.accommodationDraft.create({
      data: {
        accommodationId: accommodation.id,
        content: {
          version: 1,
          values: {
            name: "Draft chalet",
            type: "Draft type",
            subtitle: "Draft subtitle",
            shortDescription: "Draft short description",
            description: "Draft description",
          },

          images: [
            {
              url: "https://example.com/existing-draft-image.webp",
              fileKey: "existing-draft-image",
              isCover: true,
            },
          ],
        },
      },
    });

    vi.mocked(deleteUploadThingFiles).mockClear();

    const result = await updateAccommodationAdmin(
      accommodation.id,
      updateValues({
        name: "",
      }),
      [
        {
          url: "https://example.com/existing-draft-image.webp",
          fileKey: "existing-draft-image",
          isCover: true,
        },
        {
          url: "https://example.com/new-image.webp",
          fileKey: "new-image",
          isCover: false,
        },
      ],
    );

    expect(result).toEqual({
      success: false,
      field: "name",
      message: "Le nom du logement est obligatoire.",
    });

    expect(deleteUploadThingFiles).toHaveBeenCalledWith(["new-image"]);

    expect(deleteUploadThingFiles).not.toHaveBeenCalledWith([
      "existing-draft-image",
    ]);

    const draft = await prisma.accommodationDraft.findUniqueOrThrow({
      where: {
        accommodationId: accommodation.id,
      },
    });

    expect(draft.content).toMatchObject({
      images: [
        {
          fileKey: "existing-draft-image",
        },
      ],
    });
  });

  it("preserves publishedAt when an already published accommodation is updated", async () => {
    const publicationDate = new Date("2026-07-01T12:00:00.000Z");

    const accommodation = await createAccommodationFixture({
      status: "PUBLISHED",
      publishedAt: publicationDate,
    });

    await updateAccommodationAdmin(
      accommodation.id,
      updateValues({
        status: "PUBLISHED",
      }),
      [],
    );

    const updatedAccommodation = await prisma.accommodation.findUniqueOrThrow({
      where: {
        id: accommodation.id,
      },
    });

    expect(updatedAccommodation.publishedAt).toEqual(publicationDate);
  });

  it("clears publishedAt when a published accommodation is moved back to draft", async () => {
    const accommodation = await createAccommodationFixture({
      status: "PUBLISHED",
    });

    await updateAccommodationAdmin(
      accommodation.id,
      updateValues({
        status: "DRAFT",
      }),
      [],
    );

    const updatedAccommodation = await prisma.accommodation.findUniqueOrThrow({
      where: {
        id: accommodation.id,
      },
    });

    expect(updatedAccommodation.status).toBe("DRAFT");
    expect(updatedAccommodation.publishedAt).toBeNull();
  });
});
