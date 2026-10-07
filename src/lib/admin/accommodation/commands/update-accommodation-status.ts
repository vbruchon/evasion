import type { AccommodationStatus } from "@/generated/prisma/client";

import {
  accommodationIdSchema,
  accommodationStatusSchema,
} from "@/lib/admin/accommodation/schema";
import { prisma } from "@/lib/prisma";

import { revalidateAccommodation } from "../revalidate-accommodation";

export const updateAccommodationStatusAdmin = async (
  id: string,
  status: AccommodationStatus,
) => {
  const idResult = accommodationIdSchema.safeParse(id);

  if (!idResult.success) {
    throw new Error("Identifiant de logement invalide.");
  }

  const statusResult = accommodationStatusSchema.safeParse(status);

  if (!statusResult.success) {
    throw new Error("Statut de logement invalide.");
  }

  const accommodation = await prisma.accommodation.findUnique({
    where: {
      id: idResult.data,
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
      id: accommodation.id,
    },

    data: {
      status: statusResult.data,

      publishedAt:
        statusResult.data === "PUBLISHED"
          ? (accommodation.publishedAt ?? new Date())
          : null,
    },
  });

  revalidateAccommodation({
    id: accommodation.id,
    slug: accommodation.slug,
  });
};
