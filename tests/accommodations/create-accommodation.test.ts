import { afterAll, beforeEach, describe, expect, it } from "vitest";

import { createAccommodationAdmin } from "@/lib/admin/accommodation/create-accommodation.action";
import { prisma } from "@/lib/prisma";

import { createAccommodationFixture } from "../helpers/create-accommodation-fixture";
import { resetAccommodationDatabase } from "../helpers/database";
import { createAccommodationCreateValues } from "../helpers/accommodation-values";

describe("createAccommodationAdmin", () => {
  beforeEach(async () => {
    await resetAccommodationDatabase();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("creates a minimal draft accommodation at the next available position", async () => {
    await createAccommodationFixture({
      position: 2,
    });

    await createAccommodationFixture({
      position: 5,
    });

    const result = await createAccommodationAdmin(
      createAccommodationCreateValues(),
    );

    expect(result).toMatchObject({
      success: true,
      slug: "le-chalet-test",
    });

    if (!result.success) {
      throw new Error("Accommodation creation failed.");
    }

    expect(result.id).toEqual(expect.any(String));

    const accommodation = await prisma.accommodation.findUnique({
      where: {
        id: result.id,
      },

      include: {
        images: true,
        highlights: true,
      },
    });

    expect(accommodation).not.toBeNull();

    expect(accommodation).toMatchObject({
      name: "Le Chalet Test",
      slug: "le-chalet-test",
      type: "Chalet de montagne",

      subtitle: null,
      shortDescription: null,
      description: null,

      guestCapacity: null,
      bedrooms: null,
      beds: null,
      bathrooms: null,
      surface: null,

      status: "DRAFT",
      position: 6,
      publishedAt: null,
    });

    expect(accommodation?.images).toEqual([]);
    expect(accommodation?.highlights).toEqual([]);
  });

  it("generates a unique slug when the generated slug already exists", async () => {
    await createAccommodationFixture({
      name: "Le Chalet Test",
      slug: "le-chalet-test",
    });

    const result = await createAccommodationAdmin(
      createAccommodationCreateValues(),
    );

    expect(result).toMatchObject({
      success: true,
      slug: "le-chalet-test-2",
    });

    const accommodation = await prisma.accommodation.findUnique({
      where: {
        slug: "le-chalet-test-2",
      },
    });

    expect(accommodation).not.toBeNull();
    expect(accommodation?.name).toBe("Le Chalet Test");
    expect(accommodation?.status).toBe("DRAFT");
  });

  it("increments the slug suffix until an available slug is found", async () => {
    await createAccommodationFixture({
      slug: "le-chalet-test",
    });

    await createAccommodationFixture({
      slug: "le-chalet-test-2",
    });

    const result = await createAccommodationAdmin(
      createAccommodationCreateValues(),
    );

    expect(result).toMatchObject({
      success: true,
      slug: "le-chalet-test-3",
    });
  });

  it("does not persist anything when the submitted data is invalid", async () => {
    const result = await createAccommodationAdmin({
      ...createAccommodationCreateValues(),
      name: "",
    });

    expect(result.success).toBe(false);

    expect(await prisma.accommodation.count()).toBe(0);
  });

  it("requires a type when creating an accommodation", async () => {
    const result = await createAccommodationAdmin({
      ...createAccommodationCreateValues(),
      type: "",
    });

    expect(result.success).toBe(false);

    expect(await prisma.accommodation.count()).toBe(0);
  });
});
