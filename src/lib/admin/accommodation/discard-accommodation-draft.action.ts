import {
  getAccommodationDraftFileKeys,
  parseAccommodationDraftContent,
} from "@/lib/admin/accommodation/accommodation-draft";
import { deleteUploadThingFiles } from "@/lib/admin/uploadthing/delete-files";
import { prisma } from "@/lib/prisma";

export const discardAccommodationDraftAdmin = async (
  accommodationId: string,
) => {
  const accommodation = await prisma.accommodation.findUnique({
    where: {
      id: accommodationId,
    },

    select: {
      id: true,

      draft: {
        select: {
          content: true,
        },
      },
    },
  });

  if (!accommodation) {
    return {
      success: false as const,
      message: "Le logement est introuvable.",
    };
  }

  if (!accommodation.draft) {
    return {
      success: false as const,
      message: "Aucun brouillon à abandonner.",
    };
  }

  const draft = parseAccommodationDraftContent(accommodation.draft.content);

  const draftFileKeys = getAccommodationDraftFileKeys(draft);

  try {
    await prisma.accommodationDraft.delete({
      where: {
        accommodationId,
      },
    });
  } catch {
    return {
      success: false as const,
      message: "Une erreur est survenue pendant la suppression du brouillon.",
    };
  }

  try {
    await deleteUploadThingFiles(draftFileKeys);
  } catch {
    // Le brouillon est déjà supprimé.
    // Un échec du nettoyage distant ne doit pas transformer
    // le discard en faux échec côté utilisateur.
  }

  return {
    success: true as const,
  };
};
