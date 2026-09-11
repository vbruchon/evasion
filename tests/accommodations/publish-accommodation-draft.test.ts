import { afterAll, beforeEach, describe, expect, it } from "vitest";

import type { AccommodationDraftContent } from "~/app/admin/logements/schema";

import { publishAccommodationDraftAdmin } from "@/lib/admin/accommodation/publish-accommodation-draft.action";
import { saveAccommodationDraftAdmin } from "@/lib/admin/accommodation/save-accommodation-draft.action";
import { prisma } from "@/lib/prisma";

import { createAccommodationFixture } from "../helpers/create-accommodation-fixture";
import { resetAccommodationDatabase } from "../helpers/database";
import { createAccommodationDraftValues } from "../helpers/accommodation-values";

type DraftAmenities = AccommodationDraftContent["amenities"];
type DraftAccesses = AccommodationDraftContent["accesses"];

describe("publishAccommodationDraftAdmin", () => {
  beforeEach(async () => {
    await resetAccommodationDatabase();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("publishes the draft and synchronizes location, highlights, amenities and accesses", async () => {
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

    await prisma.accommodation.update({
      where: {
        id: accommodation.id,
      },

      data: {
        locationTitle: "Ancienne localisation",
        locationDescription: "Ancienne description de localisation",
        locationLatitude: 45,
        locationLongitude: 5,
        locationRadiusMeters: 3000,
      },
    });

    await prisma.accommodationAmenity.createMany({
      data: [
        {
          accommodationId: accommodation.id,
          key: "heating",
          details: "Ancien chauffage",
          position: 0,
        },
        {
          accommodationId: accommodation.id,
          key: "television",
          details: "Ancienne télévision",
          position: 1,
        },
      ],
    });

    await prisma.accommodationAccess.createMany({
      data: [
        {
          accommodationId: accommodation.id,
          key: "parking",
          details: "Ancien stationnement",
        },
        {
          accommodationId: accommodation.id,
          key: "self-check-in",
          details: "Ancienne arrivée autonome",
        },
      ],
    });

    const spa = accommodation.highlights.find(
      (highlight) => highlight.title === "Spa privatif",
    )!;

    const mountain = accommodation.highlights.find(
      (highlight) => highlight.title === "Vue montagne",
    )!;

    const draftAmenities: DraftAmenities = [
      {
        key: "wifi",
        details: "",
      },
      {
        key: "coffee-maker",
        details: "Nespresso",
      },
      {
        key: "jacuzzi",
        details: "Privatif",
      },
    ];

    const draftAccesses: DraftAccesses = [
      {
        key: "car-access",
        details: "Accès direct en voiture jusqu’au logement",
      },
      {
        key: "secure-parking",
        details: "Stationnement sécurisé devant le logement",
      },
      {
        key: "single-level",
        details: "Logement entièrement de plain-pied",
      },
    ];

    const saveResult = await saveAccommodationDraftAdmin(
      accommodation.id,
      createAccommodationDraftValues({
        subtitle: "Une nouvelle version",

        locationTitle: "Aux portes du Vercors",
        locationDescription:
          "Un emplacement calme entre la Drôme et les premiers reliefs du Vercors.",
        locationLatitude: 45.03,
        locationLongitude: 5.09,
        locationRadiusMeters: 6000,

        reviewsTitle: "Vos séjours, vos souvenirs",
        reviewsDescription: "Découvrez leurs impressions après leur séjour.",
      }),
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
      draftAmenities,
      draftAccesses,
    );

    expect(saveResult).toEqual({
      success: true,
    });

    const beforePublication = await prisma.accommodation.findUniqueOrThrow({
      where: {
        id: accommodation.id,
      },

      include: {
        highlights: {
          orderBy: {
            position: "asc",
          },
        },

        amenities: {
          orderBy: {
            position: "asc",
          },
        },

        accesses: true,
      },
    });

    expect(beforePublication.locationTitle).toBe("Ancienne localisation");
    expect(beforePublication.locationLatitude).toBe(45);
    expect(beforePublication.locationLongitude).toBe(5);
    expect(beforePublication.locationRadiusMeters).toBe(3000);

    expect(
      beforePublication.highlights.map((highlight) => highlight.title),
    ).toEqual(["Spa privatif", "Vue montagne", "Point supprimé"]);

    expect(beforePublication.amenities.map((amenity) => amenity.key)).toEqual([
      "heating",
      "television",
    ]);

    expect(
      beforePublication.accesses
        .map((access) => access.key)
        .sort((a, b) => a.localeCompare(b)),
    ).toEqual(["parking", "self-check-in"]);

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

          amenities: {
            orderBy: {
              position: "asc",
            },
          },

          accesses: true,
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

      locationTitle: "Aux portes du Vercors",
      locationDescription:
        "Un emplacement calme entre la Drôme et les premiers reliefs du Vercors.",
      locationLatitude: 45.03,
      locationLongitude: 5.09,
      locationRadiusMeters: 6000,

      reviewsTitle: "Vos séjours, vos souvenirs",
      reviewsDescription: "Découvrez leurs impressions après leur séjour.",

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

    expect(
      publishedAccommodation.amenities.map((amenity) => ({
        key: amenity.key,
        details: amenity.details,
        position: amenity.position,
      })),
    ).toEqual([
      {
        key: "wifi",
        details: null,
        position: 0,
      },
      {
        key: "coffee-maker",
        details: "Nespresso",
        position: 1,
      },
      {
        key: "jacuzzi",
        details: "Privatif",
        position: 2,
      },
    ]);

    expect(
      publishedAccommodation.amenities.some(
        (amenity) => amenity.key === "heating",
      ),
    ).toBe(false);

    expect(
      publishedAccommodation.amenities.some(
        (amenity) => amenity.key === "television",
      ),
    ).toBe(false);

    expect(
      publishedAccommodation.accesses
        .map((access) => ({
          key: access.key,
          details: access.details,
        }))
        .sort((a, b) => a.key.localeCompare(b.key)),
    ).toEqual([
      {
        key: "car-access",
        details: "Accès direct en voiture jusqu’au logement",
      },
      {
        key: "secure-parking",
        details: "Stationnement sécurisé devant le logement",
      },
      {
        key: "single-level",
        details: "Logement entièrement de plain-pied",
      },
    ]);

    expect(
      publishedAccommodation.accesses.some(
        (access) => access.key === "parking",
      ),
    ).toBe(false);

    expect(
      publishedAccommodation.accesses.some(
        (access) => access.key === "self-check-in",
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

          values: createAccommodationDraftValues({
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

          amenities: [],
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

  it("publishes the presentation image from the draft", async () => {
    const accommodation = await createAccommodationFixture({
      status: "PUBLISHED",
      images: [
        {
          fileKey: "cover-image",
          isCover: true,
          isPresentation: false,
        },
        {
          fileKey: "old-presentation",
          isCover: false,
          isPresentation: true,
        },
        {
          fileKey: "new-presentation",
          isCover: false,
          isPresentation: false,
        },
      ],
    });

    const cover = accommodation.images.find(
      (image) => image.fileKey === "cover-image",
    )!;

    const oldPresentation = accommodation.images.find(
      (image) => image.fileKey === "old-presentation",
    )!;

    const newPresentation = accommodation.images.find(
      (image) => image.fileKey === "new-presentation",
    )!;

    await saveAccommodationDraftAdmin(
      accommodation.id,
      createAccommodationDraftValues(),
      [
        {
          id: cover.id,
          isCover: true,
          isPresentation: false,
        },
        {
          id: oldPresentation.id,
          isCover: false,
          isPresentation: false,
        },
        {
          id: newPresentation.id,
          isCover: false,
          isPresentation: true,
        },
      ],
      [],
      [],
      [],
    );

    const result = await publishAccommodationDraftAdmin(accommodation.id);

    expect(result).toEqual({
      success: true,
    });

    const images = await prisma.accommodationImage.findMany({
      where: {
        accommodationId: accommodation.id,
      },

      orderBy: {
        position: "asc",
      },
    });

    expect(
      images.map((image) => ({
        fileKey: image.fileKey,
        isPresentation: image.isPresentation,
      })),
    ).toEqual([
      {
        fileKey: "cover-image",
        isPresentation: false,
      },
      {
        fileKey: "old-presentation",
        isPresentation: false,
      },
      {
        fileKey: "new-presentation",
        isPresentation: true,
      },
    ]);
  });
});
