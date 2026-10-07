import { accommodationReorderSchema } from "@/lib/admin/accommodation/schema";
import { prisma } from "@/lib/prisma";

import { revalidateAccommodation } from "../revalidate-accommodation";

export type AccommodationPosition = {
  id: string;
  position: number;
};

export const reorderAccommodationsAdmin = async (
  accommodations: AccommodationPosition[],
) => {
  const result = accommodationReorderSchema.safeParse(accommodations);

  if (!result.success) {
    throw new Error("Ordre des logements invalide.");
  }

  const data = result.data;

  const existingAccommodations = await prisma.accommodation.findMany({
    select: {
      id: true,
    },
  });

  const submittedIds = new Set(data.map((accommodation) => accommodation.id));

  const containsEveryAccommodation =
    existingAccommodations.length === data.length &&
    existingAccommodations.every((accommodation) =>
      submittedIds.has(accommodation.id),
    );

  if (!containsEveryAccommodation) {
    throw new Error("Ordre des logements invalide.");
  }

  await prisma.$transaction(
    data.map(({ id, position }) =>
      prisma.accommodation.update({
        where: {
          id,
        },

        data: {
          position,
        },
      }),
    ),
  );

  revalidateAccommodation();
};
