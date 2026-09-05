import { afterAll, beforeEach, describe, expect, it } from "vitest";

import { deleteAccommodationAdmin } from "@/lib/admin/accommodation/delete-accommodation.action";
import { deleteUploadThingFiles } from "@/lib/admin/uploadthing/delete-files";
import { prisma } from "@/lib/prisma";

import { createAccommodationFixture } from "../helpers/create-accommodation-fixture";
import { resetAccommodationDatabase } from "../helpers/database";

describe("deleteAccommodationAdmin", () => {
  beforeEach(async () => {
    await resetAccommodationDatabase();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("deletes the accommodation, removes its images and compacts subsequent positions", async () => {
    const first = await createAccommodationFixture({
      position: 1,
    });

    const deleted = await createAccommodationFixture({
      position: 2,
      images: [
        {
          fileKey: "deleted-image-1",
        },
        {
          fileKey: "deleted-image-2",
          isCover: false,
        },
      ],
    });

    const third = await createAccommodationFixture({
      position: 3,
    });

    const fourth = await createAccommodationFixture({
      position: 4,
    });

    await deleteAccommodationAdmin(deleted.id);

    expect(
      await prisma.accommodation.findUnique({
        where: {
          id: deleted.id,
        },
      }),
    ).toBeNull();

    expect(
      await prisma.accommodationImage.count({
        where: {
          accommodationId: deleted.id,
        },
      }),
    ).toBe(0);

    const accommodations = await prisma.accommodation.findMany({
      orderBy: {
        position: "asc",
      },
      select: {
        id: true,
        position: true,
      },
    });

    expect(accommodations).toEqual([
      {
        id: first.id,
        position: 1,
      },
      {
        id: third.id,
        position: 2,
      },
      {
        id: fourth.id,
        position: 3,
      },
    ]);

    expect(deleteUploadThingFiles).toHaveBeenCalledWith([
      "deleted-image-1",
      "deleted-image-2",
    ]);
  });

  it("rejects deleting an accommodation that does not exist", async () => {
    await expect(
      deleteAccommodationAdmin("accommodation-inexistante"),
    ).rejects.toThrow("Logement introuvable");

    expect(await prisma.accommodation.count()).toBe(0);
  });
});
