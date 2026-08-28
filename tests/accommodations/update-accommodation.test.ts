import { afterAll, beforeEach, describe, expect, it } from "vitest";

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
