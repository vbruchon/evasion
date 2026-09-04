import type { AccommodationStatus } from "@/generated/prisma/client";

import { prisma } from "@/lib/prisma";

import { revalidateAccommodation } from "./revalidate-accommodation";

export const updateAccommodationStatusAdmin = async (
  id: string,
  status: AccommodationStatus,
) => {
  const accommodation = await prisma.accommodation.findUnique({
    where: {
      id,
    },

    select: {
      id: true,
      slug: true,
      publishedAt: true,
    },
  });

  if (!accommodation) {
    throw new Error("Logement introuvable.");
  }

  await prisma.accommodation.update({
    where: {
      id,
    },

    data: {
      status,

      publishedAt:
        status === "PUBLISHED"
          ? (accommodation.publishedAt ?? new Date())
          : null,
    },
  });

  revalidateAccommodation({
    id: accommodation.id,
    slug: accommodation.slug,
  });
};
