import { randomUUID } from "node:crypto";

import type { AccommodationStatus } from "@/generated/prisma/client";
import { DEFAULT_ACCOMMODATION_HIGHLIGHT_ICON } from "@/lib/accommodations/accommodation-highlights";
import { prisma } from "@/lib/prisma";

type AccommodationFixtureImage = {
  url?: string;
  fileKey?: string;
  alt?: string | null;
  caption?: string | null;
  position?: number;
  isCover?: boolean;
};

type AccommodationFixtureHighlight = {
  title?: string;
  description?: string | null;
  icon?: string;
  position?: number;
};

type CreateAccommodationFixtureOptions = {
  name?: string;
  slug?: string;
  type?: string | null;
  subtitle?: string | null;
  shortDescription?: string | null;
  description?: string | null;

  guestCapacity?: number | null;
  bedrooms?: number | null;
  beds?: number | null;
  bathrooms?: number | null;
  surface?: number | null;

  status?: AccommodationStatus;
  position?: number;
  publishedAt?: Date | null;

  images?: AccommodationFixtureImage[];
  highlights?: AccommodationFixtureHighlight[];
};

export const createAccommodationFixture = async (
  options: CreateAccommodationFixtureOptions = {},
) => {
  const identifier = randomUUID();

  const status = options.status ?? "DRAFT";

  return prisma.accommodation.create({
    data: {
      name: options.name ?? `Logement ${identifier}`,
      slug: options.slug ?? `logement-${identifier}`,
      type: options.type ?? "Chalet",
      subtitle:
        options.subtitle ?? "Un logement créé pour les tests automatisés.",
      shortDescription:
        options.shortDescription ??
        "Une description courte suffisamment complète pour les tests.",
      description:
        options.description ??
        "Une description détaillée utilisée uniquement pendant les tests automatisés.",

      guestCapacity:
        options.guestCapacity === undefined ? 2 : options.guestCapacity,

      bedrooms: options.bedrooms === undefined ? 1 : options.bedrooms,

      beds: options.beds === undefined ? 1 : options.beds,

      bathrooms: options.bathrooms === undefined ? 1 : options.bathrooms,

      surface: options.surface === undefined ? 35 : options.surface,

      status,
      position: options.position ?? 1,

      publishedAt:
        options.publishedAt !== undefined
          ? options.publishedAt
          : status === "PUBLISHED"
            ? new Date("2026-08-01T10:00:00.000Z")
            : null,

      images: {
        create: (options.images ?? []).map((image, index) => ({
          url: image.url ?? `https://example.com/${identifier}-${index}.webp`,
          fileKey: image.fileKey ?? `test-file-${identifier}-${index}`,
          alt: image.alt ?? null,
          caption: image.caption ?? null,
          position: image.position ?? index,
          isCover: image.isCover ?? index === 0,
        })),
      },

      highlights: {
        create: (options.highlights ?? []).map((highlight, index) => ({
          title: highlight.title ?? `Point fort ${index + 1}`,
          description: highlight.description ?? null,
          icon: highlight.icon ?? DEFAULT_ACCOMMODATION_HIGHLIGHT_ICON,
          position: highlight.position ?? index,
        })),
      },
    },

    include: {
      images: {
        orderBy: {
          position: "asc",
        },
      },

      highlights: {
        orderBy: {
          position: "asc",
        },
      },
    },
  });
};
