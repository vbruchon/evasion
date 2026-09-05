import type {
  AccommodationUpdateFormValues,
  AccommodationUpdateImageInput,
} from "~/app/admin/logements/schema";

import { prisma } from "@/lib/prisma";

import { syncAccommodationAmenities } from "./sync-accommodation-amenities";
import { syncAccommodationHighlights } from "./sync-accommodation-highlights";
import { syncAccommodationImages } from "./sync-accommodation-images";

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
        name: data.name,
        type: data.type || null,
        subtitle: data.subtitle || null,
        shortDescription: data.shortDescription || null,
        description: data.description || null,

        guestCapacity: data.guestCapacity,
        bedrooms: data.bedrooms,
        beds: data.beds,
        bathrooms: data.bathrooms,
        surface: data.surface,

        status: data.status,

        publishedAt:
          data.status === "PUBLISHED" ? (publishedAt ?? new Date()) : null,
      },
    });

    await syncAccommodationImages(tx, accommodationId, images);

    await syncAccommodationHighlights(tx, accommodationId, data.highlights);

    await syncAccommodationAmenities(tx, accommodationId, data.amenities);

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
