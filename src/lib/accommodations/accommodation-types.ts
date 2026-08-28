import type { Prisma } from "@/generated/prisma/client";

export type AccommodationWithImages = Prisma.AccommodationGetPayload<{
  include: {
    images: true;
  };
}>;

export type AccommodationAdminListItem = Prisma.AccommodationGetPayload<{
  include: {
    images: true;
    draft: {
      select: {
        id: true;
        updatedAt: true;
      };
    };
  };
}>;
