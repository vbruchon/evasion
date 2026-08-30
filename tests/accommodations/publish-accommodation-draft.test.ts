import { afterAll, beforeEach, describe, expect, it } from "vitest";

import type { AccommodationDraftContent } from "~/app/admin/logements/schema";

import { publishAccommodationDraftAdmin } from "@/lib/admin/accommodation/publish-accommodation-draft.action";
import { saveAccommodationDraftAdmin } from "@/lib/admin/accommodation/save-accommodation-draft.action";
import { prisma } from "@/lib/prisma";

import { createAccommodationFixture } from "../helpers/create-accommodation-fixture";
import { resetAccommodationDatabase } from "../helpers/database";

type DraftValues = AccommodationDraftContent["values"];

const createDraftValues = (
  overrides: Partial<DraftValues> = {},
): DraftValues => ({
  name: "Le Chalet modifié",
  type: "Chalet premium",
  subtitle: "Une nouvelle version",
  shortDescription: "Nouvelle description courte",
  description: "Nouvelle description complète",

  guestCapacity: 4,
  bedrooms: 2,
  beds: 3,
  bathrooms: 2,
  surface: 72.5,

  ...overrides,
});

describe("publishAccommodationDraftAdmin", () => {
  beforeEach(async () => {
    await resetAccommodationDatabase();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("publishes the draft and synchronizes highlights", async () => {
    const accommodation = await createAccommodationFixture({
      name: "Le Chalet public",
      status: "PUBLISHED",

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
          title: "Point supprimé",
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

    const saveResult = await saveAccommodationDraftAdmin(
      accommodation.id,
      createDraftValues(),
      [],
      [
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
    );

    expect(saveResult).toEqual({
      success: true,
    });

    const beforePublication = await prisma.accommodationHighlight.findMany({
      where: {
        accommodationId: accommodation.id,
      },
      orderBy: {
        position: "asc",
      },
    });

    expect(beforePublication.map((highlight) => highlight.title)).toEqual([
      "Spa privatif",
      "Vue montagne",
      "Point supprimé",
    ]);

    const result = await publishAccommodationDraftAdmin(accommodation.id);

    expect(result).toEqual({
      success: true,
    });

    const publishedAccommodation = await prisma.accommodation.findUniqueOrThrow(
      {
        where: {
          id: accommodation.id,
        },

        include: {
          draft: true,

          highlights: {
            orderBy: {
              position: "asc",
            },
          },
        },
      },
    );

    expect(publishedAccommodation).toMatchObject({
      name: "Le Chalet modifié",
      type: "Chalet premium",
      subtitle: "Une nouvelle version",

      guestCapacity: 4,
      bedrooms: 2,
      beds: 3,
      bathrooms: 2,
      surface: 72.5,

      status: "PUBLISHED",
    });

    expect(publishedAccommodation.draft).toBeNull();

    expect(
      publishedAccommodation.highlights.map((highlight) => ({
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
      publishedAccommodation.highlights.some(
        (highlight) => highlight.title === "Point supprimé",
      ),
    ).toBe(false);
  });

  it("rejects a draft containing a highlight from another accommodation", async () => {
    const accommodation = await createAccommodationFixture({
      status: "PUBLISHED",

      highlights: [
        {
          title: "Highlight légitime",
          description: "Description légitime",
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
          description: "Description étrangère",
          icon: "Mountain",
        },
      ],
    });

    const foreignHighlight = otherAccommodation.highlights[0];

    await prisma.accommodationDraft.create({
      data: {
        accommodationId: accommodation.id,

        content: {
          version: 1,

          values: createDraftValues({
            name: "Modification interdite",
          }),

          images: [],

          highlights: [
            {
              id: foreignHighlight.id,
              title: foreignHighlight.title,
              description: foreignHighlight.description,
              icon: foreignHighlight.icon,
            },
          ],
        },
      },
    });

    const result = await publishAccommodationDraftAdmin(accommodation.id);

    expect(result).toEqual({
      success: false,
      message: expect.stringContaining("n'appartient pas"),
    });

    const persistedAccommodation = await prisma.accommodation.findUniqueOrThrow(
      {
        where: {
          id: accommodation.id,
        },

        include: {
          draft: true,
          highlights: true,
        },
      },
    );

    expect(persistedAccommodation.name).toBe(accommodation.name);

    expect(persistedAccommodation.highlights).toHaveLength(1);

    expect(persistedAccommodation.highlights[0].title).toBe(
      "Highlight légitime",
    );

    expect(persistedAccommodation.draft).not.toBeNull();
  });
});
