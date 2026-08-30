import { deleteUploadThingFiles } from "@/lib/admin/uploadthing/delete-files";
import { prisma } from "@/lib/prisma";

import { parseAccommodationDraftContent } from "./accommodation-draft";
import { revalidateAccommodation } from "./revalidate-accommodation";
import {
  getRemovedAccommodationImages,
  hasForeignAccommodationImage,
  syncAccommodationImages,
} from "./sync-accommodation-images";
import {
  hasForeignAccommodationHighlight,
  syncAccommodationHighlights,
} from "./sync-accommodation-highlights";

export const publishAccommodationDraftAdmin = async (
  accommodationId: string,
) => {
  const accommodation = await prisma.accommodation.findUnique({
    where: {
      id: accommodationId,
    },

    select: {
      id: true,
      slug: true,
      status: true,

      images: {
        select: {
          id: true,
          fileKey: true,
        },
      },

      highlights: {
        select: {
          id: true,
        },
      },

      draft: {
        select: {
          content: true,
        },
      },
    },
  });

  if (!accommodation) {
    throw new Error("Logement introuvable.");
  }

  if (accommodation.status !== "PUBLISHED") {
    return {
      success: false as const,
      message:
        "Seul un logement publié peut publier des modifications en brouillon.",
    };
  }

  if (!accommodation.draft) {
    return {
      success: false as const,
      message: "Aucun brouillon à publier.",
    };
  }

  const draft = parseAccommodationDraftContent(accommodation.draft.content);

  const hasForeignImage = hasForeignAccommodationImage(
    draft.images,
    accommodation.images.map((image) => image.id),
  );

  if (hasForeignImage) {
    return {
      success: false as const,
      message:
        "Le brouillon contient une image qui n'appartient pas à ce logement.",
    };
  }

  const hasForeignHighlight = hasForeignAccommodationHighlight(
    draft.highlights,
    accommodation.highlights.map((highlight) => highlight.id),
  );

  if (hasForeignHighlight) {
    return {
      success: false as const,
      message:
        "Le brouillon contient un point fort qui n'appartient pas à ce logement.",
    };
  }

  const removedImages = getRemovedAccommodationImages(
    accommodation.images,
    draft.images,
  );

  await prisma.$transaction(async (tx) => {
    await tx.accommodation.update({
      where: {
        id: accommodationId,
      },

      data: {
        name: draft.values.name,
        type: draft.values.type,
        subtitle: draft.values.subtitle,
        shortDescription: draft.values.shortDescription,
        description: draft.values.description,
        guestCapacity: draft.values.guestCapacity,
        bedrooms: draft.values.bedrooms,
        beds: draft.values.beds,
        bathrooms: draft.values.bathrooms,
        surface: draft.values.surface,
      },
    });

    await syncAccommodationImages(tx, accommodationId, draft.images);

    await syncAccommodationHighlights(tx, accommodationId, draft.highlights);

    await tx.accommodationDraft.delete({
      where: {
        accommodationId,
      },
    });
  });

  await deleteUploadThingFiles(removedImages.map((image) => image.fileKey));

  revalidateAccommodation();

  return {
    success: true as const,
  };
};
