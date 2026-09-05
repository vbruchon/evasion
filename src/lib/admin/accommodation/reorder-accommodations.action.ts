import { prisma } from "@/lib/prisma";

import { revalidateAccommodation } from "./revalidate-accommodation";

export type AccommodationPosition = {
  id: string;
  position: number;
};

export const reorderAccommodationsAdmin = async (
  accommodations: AccommodationPosition[],
) => {
  await prisma.$transaction(
    accommodations.map(({ id, position }) =>
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
