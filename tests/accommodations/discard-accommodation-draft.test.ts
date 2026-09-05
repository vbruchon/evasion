import { afterAll, beforeEach, describe, expect, it } from "vitest";

import { discardAccommodationDraftAdmin } from "@/lib/admin/accommodation/discard-accommodation-draft.action";
import { deleteUploadThingFiles } from "@/lib/admin/uploadthing/delete-files";
import { prisma } from "@/lib/prisma";

import { createAccommodationFixture } from "../helpers/create-accommodation-fixture";
import { resetAccommodationDatabase } from "../helpers/database";

describe("discardAccommodationDraftAdmin", () => {
  beforeEach(async () => {
    await resetAccommodationDatabase();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("deletes the draft without modifying the published accommodation", async () => {
    const accommodation = await createAccommodationFixture({
      name: "Published chalet",
      status: "PUBLISHED",

      images: [
        {
          fileKey: "published-cover",
          url: "https://example.com/published-cover.webp",
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
              url: "https://example.com/draft-image.webp",
              fileKey: "draft-image",
              isCover: true,
            },
          ],
        },
      },
    });

    const result = await discardAccommodationDraftAdmin(accommodation.id);

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
          draft: true,
        },
      },
    );

    expect(persistedAccommodation.name).toBe("Published chalet");

    expect(persistedAccommodation.status).toBe("PUBLISHED");

    expect(persistedAccommodation.images).toHaveLength(1);

    expect(persistedAccommodation.images[0].fileKey).toBe("published-cover");

    expect(persistedAccommodation.draft).toBeNull();

    expect(deleteUploadThingFiles).toHaveBeenCalledWith(["draft-image"]);
  });

  it("rejects discarding when no draft exists", async () => {
    const accommodation = await createAccommodationFixture({
      status: "PUBLISHED",
    });

    const result = await discardAccommodationDraftAdmin(accommodation.id);

    expect(result).toEqual({
      success: false,
      message: "Aucun brouillon à abandonner.",
    });
  });

  it("rejects discarding a draft for an accommodation that does not exist", async () => {
    const result = await discardAccommodationDraftAdmin(
      "accommodation-inexistante",
    );

    expect(result).toEqual({
      success: false,
      message: "Le logement est introuvable.",
    });
  });
});
