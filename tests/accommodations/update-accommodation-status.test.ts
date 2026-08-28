import { afterAll, beforeEach, describe, expect, it } from "vitest";

import { updateAccommodationStatusAdmin } from "@/lib/admin/accommodation/update-accommodation-status.action";
import { prisma } from "@/lib/prisma";

import { createAccommodationFixture } from "../helpers/create-accommodation-fixture";
import { resetAccommodationDatabase } from "../helpers/database";

describe("updateAccommodationStatusAdmin", () => {
  beforeEach(async () => {
    await resetAccommodationDatabase();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("publishes a draft accommodation and initializes publishedAt", async () => {
    const accommodation = await createAccommodationFixture({
      status: "DRAFT",
      publishedAt: null,
    });

    const beforePublication = new Date();

    await updateAccommodationStatusAdmin(accommodation.id, "PUBLISHED");

    const afterPublication = new Date();

    const updatedAccommodation = await prisma.accommodation.findUniqueOrThrow({
      where: {
        id: accommodation.id,
      },
    });

    expect(updatedAccommodation.status).toBe("PUBLISHED");
    expect(updatedAccommodation.publishedAt).not.toBeNull();

    expect(updatedAccommodation.publishedAt!.getTime()).toBeGreaterThanOrEqual(
      beforePublication.getTime(),
    );

    expect(updatedAccommodation.publishedAt!.getTime()).toBeLessThanOrEqual(
      afterPublication.getTime(),
    );
  });

  it("preserves publishedAt when an already published accommodation remains published", async () => {
    const initialPublicationDate = new Date("2026-06-15T14:30:00.000Z");

    const accommodation = await createAccommodationFixture({
      status: "PUBLISHED",
      publishedAt: initialPublicationDate,
    });

    await updateAccommodationStatusAdmin(accommodation.id, "PUBLISHED");

    const updatedAccommodation = await prisma.accommodation.findUniqueOrThrow({
      where: {
        id: accommodation.id,
      },
    });

    expect(updatedAccommodation.publishedAt).toEqual(initialPublicationDate);
  });

  it.each(["DRAFT", "ARCHIVED"] as const)(
    "clears publishedAt when the accommodation status changes to %s",
    async (status) => {
      const accommodation = await createAccommodationFixture({
        status: "PUBLISHED",
      });

      await updateAccommodationStatusAdmin(accommodation.id, status);

      const updatedAccommodation = await prisma.accommodation.findUniqueOrThrow(
        {
          where: {
            id: accommodation.id,
          },
        },
      );

      expect(updatedAccommodation.status).toBe(status);
      expect(updatedAccommodation.publishedAt).toBeNull();
    },
  );

  it("rejects updating the status of an accommodation that does not exist", async () => {
    await expect(
      updateAccommodationStatusAdmin("accommodation-inexistante", "PUBLISHED"),
    ).rejects.toThrow("Logement introuvable");
  });
});
