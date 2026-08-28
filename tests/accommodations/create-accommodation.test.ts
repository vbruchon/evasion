import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";

import type {
  AccommodationCreateFormValues,
  AccommodationImageInput,
} from "~/app/admin/logements/schema";

import { createAccommodationAdmin } from "@/lib/admin/accommodation/create-accommodation.action";
import { deleteUploadThingFiles } from "@/lib/admin/uploadthing/delete-files";
import { prisma } from "@/lib/prisma";

import { createAccommodationFixture } from "../helpers/create-accommodation-fixture";
import { resetAccommodationDatabase } from "../helpers/database";

const createValues = (
  overrides: Partial<AccommodationCreateFormValues> = {},
): AccommodationCreateFormValues => ({
  name: "Le Chalet Test",
  slug: "le-chalet-test",
  type: "Chalet de montagne",
  subtitle: "Un refuge au cœur des montagnes",
  shortDescription:
    "Un chalet confortable imaginé pour tester la création d'un logement.",
  description:
    "Description complète du logement utilisée dans les tests d'intégration.",
  status: "DRAFT",
  ...overrides,
});

const createImages = (): AccommodationImageInput[] => [
  {
    url: "https://example.com/chalet-cover.webp",
    fileKey: "chalet-cover",
    isCover: true,
  },
  {
    url: "https://example.com/chalet-bedroom.webp",
    fileKey: "chalet-bedroom",
    isCover: false,
  },
];

describe("createAccommodationAdmin", () => {
  beforeEach(async () => {
    await resetAccommodationDatabase();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("creates an accommodation with its images at the next available position", async () => {
    await createAccommodationFixture({
      position: 2,
    });

    await createAccommodationFixture({
      position: 5,
    });

    const result = await createAccommodationAdmin(
      createValues(),
      createImages(),
    );

    expect(result).toEqual({
      success: true,
      slug: "le-chalet-test",
    });

    const accommodation = await prisma.accommodation.findUnique({
      where: {
        slug: "le-chalet-test",
      },
      include: {
        images: {
          orderBy: {
            position: "asc",
          },
        },
      },
    });

    expect(accommodation).not.toBeNull();

    expect(accommodation).toMatchObject({
      name: "Le Chalet Test",
      slug: "le-chalet-test",
      type: "Chalet de montagne",
      status: "DRAFT",
      position: 6,
      publishedAt: null,
    });

    expect(accommodation?.images).toHaveLength(2);

    expect(
      accommodation?.images.map((image) => ({
        fileKey: image.fileKey,
        isCover: image.isCover,
      })),
    ).toEqual([
      {
        fileKey: "chalet-cover",
        isCover: true,
      },
      {
        fileKey: "chalet-bedroom",
        isCover: false,
      },
    ]);
  });

  it("sets publishedAt when an accommodation is created as published", async () => {
    const beforeCreation = new Date();

    const result = await createAccommodationAdmin(
      createValues({
        slug: "logement-publie",
        status: "PUBLISHED",
      }),
      [],
    );

    const afterCreation = new Date();

    expect(result.success).toBe(true);

    const accommodation = await prisma.accommodation.findUniqueOrThrow({
      where: {
        slug: "logement-publie",
      },
    });

    expect(accommodation.status).toBe("PUBLISHED");
    expect(accommodation.publishedAt).not.toBeNull();

    expect(accommodation.publishedAt!.getTime()).toBeGreaterThanOrEqual(
      beforeCreation.getTime(),
    );

    expect(accommodation.publishedAt!.getTime()).toBeLessThanOrEqual(
      afterCreation.getTime(),
    );
  });

  it("rejects an existing slug and cleans up newly uploaded files", async () => {
    await createAccommodationFixture({
      slug: "slug-existant",
    });

    const images = createImages();

    const result = await createAccommodationAdmin(
      createValues({
        slug: "slug-existant",
      }),
      images,
    );

    expect(result).toEqual({
      success: false,
      field: "slug",
      message: expect.any(String),
    });

    expect(deleteUploadThingFiles).toHaveBeenCalledWith([
      "chalet-cover",
      "chalet-bedroom",
    ]);

    const accommodations = await prisma.accommodation.findMany({
      where: {
        slug: "slug-existant",
      },
    });

    expect(accommodations).toHaveLength(1);
  });

  it("does not persist anything when the submitted data is invalid", async () => {
    const result = await createAccommodationAdmin(
      {
        ...createValues(),
        name: "",
      },
      createImages(),
    );

    expect(result.success).toBe(false);

    expect(await prisma.accommodation.count()).toBe(0);

    expect(vi.mocked(deleteUploadThingFiles)).toHaveBeenCalled();
  });
});
