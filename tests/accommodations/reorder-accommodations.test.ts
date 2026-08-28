import { afterAll, beforeEach, describe, expect, it } from "vitest";

import { reorderAccommodationsAdmin } from "@/lib/admin/accommodation/reorder-accommodations.action";
import { prisma } from "@/lib/prisma";

import { createAccommodationFixture } from "../helpers/create-accommodation-fixture";
import { resetAccommodationDatabase } from "../helpers/database";

describe("reorderAccommodationsAdmin", () => {
  beforeEach(async () => {
    await resetAccommodationDatabase();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("persists the new accommodation order", async () => {
    const first = await createAccommodationFixture({
      name: "Premier",
      position: 1,
    });

    const second = await createAccommodationFixture({
      name: "Deuxième",
      position: 2,
    });

    const third = await createAccommodationFixture({
      name: "Troisième",
      position: 3,
    });

    await reorderAccommodationsAdmin([
      {
        id: third.id,
        position: 1,
      },
      {
        id: first.id,
        position: 2,
      },
      {
        id: second.id,
        position: 3,
      },
    ]);

    const accommodations = await prisma.accommodation.findMany({
      orderBy: {
        position: "asc",
      },
      select: {
        id: true,
        name: true,
        position: true,
      },
    });

    expect(accommodations).toEqual([
      {
        id: third.id,
        name: "Troisième",
        position: 1,
      },
      {
        id: first.id,
        name: "Premier",
        position: 2,
      },
      {
        id: second.id,
        name: "Deuxième",
        position: 3,
      },
    ]);
  });
});
