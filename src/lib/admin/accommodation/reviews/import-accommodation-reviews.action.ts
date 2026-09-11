import { importAccommodationReviews } from "@/lib/admin/accommodation/reviews/import-accommodation-reviews";
import { revalidateAccommodation } from "@/lib/admin/accommodation/revalidate-accommodation";
import { prisma } from "@/lib/prisma";

const MAX_REVIEWS_CSV_SIZE = 5 * 1024 * 1024;

export type ImportAccommodationReviewsActionResult =
  | {
      success: true;
      total: number;
      imported: number;
      existing: number;
      duplicates: number;
    }
  | {
      success: false;
      message: string;
    };

export const importAccommodationReviewsAdmin = async (
  accommodationId: string,
  file: File,
): Promise<ImportAccommodationReviewsActionResult> => {
  if (!file || file.size === 0) {
    return {
      success: false,
      message: "Aucun fichier CSV n'a été sélectionné.",
    };
  }

  if (!file.name.toLowerCase().endsWith(".csv")) {
    return {
      success: false,
      message: "Le fichier sélectionné doit être au format CSV.",
    };
  }

  if (file.size > MAX_REVIEWS_CSV_SIZE) {
    return {
      success: false,
      message: "Le fichier CSV est trop volumineux.",
    };
  }

  const accommodation = await prisma.accommodation.findUnique({
    where: {
      id: accommodationId,
    },
    select: {
      id: true,
    },
  });

  if (!accommodation) {
    return {
      success: false,
      message: "Logement introuvable.",
    };
  }

  try {
    const csvContent = await file.text();

    const result = await importAccommodationReviews({
      accommodationId,
      csvContent,
    });

    revalidateAccommodation();

    return {
      success: true,
      ...result,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Impossible d'importer les avis.",
    };
  }
};
