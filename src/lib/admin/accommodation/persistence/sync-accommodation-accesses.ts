import type { Prisma } from "@/generated/prisma/client";

import type { AccommodationAccessesInput } from "@/lib/admin/accommodation/schema";

export const syncAccommodationAccesses = async (
  tx: Prisma.TransactionClient,
  accommodationId: string,
  accesses: AccommodationAccessesInput,
) => {
  await tx.accommodationAccess.deleteMany({
    where: {
      accommodationId,
    },
  });

  if (accesses.length === 0) {
    return;
  }

  await tx.accommodationAccess.createMany({
    data: accesses.map((access) => ({
      accommodationId,
      key: access.key,
      details: access.details || null,
    })),
  });
};
