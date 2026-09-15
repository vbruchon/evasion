import type {
  AccommodationUpdateFormValues,
  AccommodationUpdateImageInput,
} from "@/lib/admin/accommodation/schema";

import { prisma } from "@/lib/prisma";

import { syncAccommodationAccesses } from "./sync-accommodation-accesses";
import { syncAccommodationAmenities } from "./sync-accommodation-amenities";
import { syncAccommodationHighlights } from "./sync-accommodation-highlights";
import { syncAccommodationImages } from "./images/sync-accommodation-images";
import { toAccommodationPersistenceData } from "./accommodation-persistence-data";

type PersistAccommodationUpdateOptions = {
  accommodationId: string;
  publishedAt: Date | null;
  data: AccommodationUpdateFormValues;
  images: AccommodationUpdateImageInput[];
};

export const persistAccommodationUpdate = async ({
  accommodationId,
  publishedAt,
  data,
  images,
}: PersistAccommodationUpdateOptions) => {
  return prisma.$transaction(async (tx) => {
    await tx.accommodation.update({
      where: {
        id: accommodationId,
      },

      data: {
        ...toAccommodationPersistenceData(data),

        status: data.status,

        publishedAt:
          data.status === "PUBLISHED" ? (publishedAt ?? new Date()) : null,
      },
    });

    await syncAccommodationImages(tx, accommodationId, images);

    await syncAccommodationHighlights(tx, accommodationId, data.highlights);

    await syncAccommodationAmenities(tx, accommodationId, data.amenities);

    await syncAccommodationAccesses(tx, accommodationId, data.accesses);

    await tx.accommodationDraft.deleteMany({
      where: {
        accommodationId,
      },
    });

    return tx.accommodationImage.findMany({
      where: {
        accommodationId,
      },

      orderBy: {
        position: "asc",
      },

      select: {
        id: true,
        url: true,
        fileKey: true,
        alt: true,
        isCover: true,
        isPresentation: true,
      },
    });
  });
};
