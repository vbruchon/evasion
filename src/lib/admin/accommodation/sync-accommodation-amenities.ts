import type { Prisma } from "@/generated/prisma/client";

import type { AccommodationAmenitiesInput } from "~/app/admin/logements/schema";

export const syncAccommodationAmenities = async (
  tx: Prisma.TransactionClient,
  accommodationId: string,
  amenities: AccommodationAmenitiesInput,
) => {
  await tx.accommodationAmenity.deleteMany({
    where: {
      accommodationId,
    },
  });

  if (amenities.length === 0) {
    return;
  }

  await tx.accommodationAmenity.createMany({
    data: amenities.map((amenity, position) => ({
      accommodationId,
      key: amenity.key,
      details: amenity.details || null,
      position,
    })),
  });
};
