import { parseAccommodationDraftContent } from "@/lib/admin/accommodation/accommodation-draft";
import { revalidateAccommodation } from "@/lib/admin/accommodation/revalidate-accommodation";
import { deleteUploadThingFiles } from "@/lib/admin/uploadthing/delete-files";
import { prisma } from "@/lib/prisma";

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

  const accommodationImageIds = new Set(
    accommodation.images.map((image) => image.id),
  );

  const draftExistingImageIds = draft.images.flatMap((image) =>
    "id" in image ? [image.id] : [],
  );

  const hasForeignImage = draftExistingImageIds.some(
    (id) => !accommodationImageIds.has(id),
  );

  if (hasForeignImage) {
    return {
      success: false as const,
      message:
        "Le brouillon contient une image qui n'appartient pas à ce logement.",
    };
  }

  const accommodationHighlightIds = new Set(
    accommodation.highlights.map((highlight) => highlight.id),
  );

  const draftExistingHighlightIds = draft.highlights.flatMap((highlight) =>
    highlight.id ? [highlight.id] : [],
  );

  const hasForeignHighlight = draftExistingHighlightIds.some(
    (id) => !accommodationHighlightIds.has(id),
  );

  if (hasForeignHighlight) {
    return {
      success: false as const,
      message:
        "Le brouillon contient un point fort qui n'appartient pas à ce logement.",
    };
  }

  const existingImageIds = new Set(draftExistingImageIds);

  const removedImages = accommodation.images.filter(
    (image) => !existingImageIds.has(image.id),
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

    await tx.accommodationImage.deleteMany({
      where: {
        accommodationId,

        ...(draftExistingImageIds.length > 0
          ? {
              id: {
                notIn: draftExistingImageIds,
              },
            }
          : {}),
      },
    });

    for (const [position, image] of draft.images.entries()) {
      if ("id" in image) {
        await tx.accommodationImage.update({
          where: {
            id: image.id,
          },

          data: {
            position,
            isCover: image.isCover,
          },
        });

        continue;
      }

      await tx.accommodationImage.create({
        data: {
          accommodationId,
          url: image.url,
          fileKey: image.fileKey,
          position,
          isCover: image.isCover,
        },
      });
    }

    await tx.accommodationHighlight.deleteMany({
      where: {
        accommodationId,

        ...(draftExistingHighlightIds.length > 0
          ? {
              id: {
                notIn: draftExistingHighlightIds,
              },
            }
          : {}),
      },
    });

    for (const [position, highlight] of draft.highlights.entries()) {
      if (highlight.id) {
        await tx.accommodationHighlight.update({
          where: {
            id: highlight.id,
          },

          data: {
            title: highlight.title,
            description: highlight.description || null,
            icon: highlight.icon,
            position,
          },
        });

        continue;
      }

      await tx.accommodationHighlight.create({
        data: {
          accommodationId,
          title: highlight.title,
          description: highlight.description || null,
          icon: highlight.icon,
          position,
        },
      });
    }

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
