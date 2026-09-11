import { prisma } from "@/lib/prisma";

import { parseAccommodationReviewsCsv } from "./parse-accommodation-reviews-csv";

export type AccommodationReviewsImportResult = {
  total: number;
  imported: number;
  existing: number;
  duplicates: number;
};

export const importAccommodationReviews = async ({
  accommodationId,
  csvContent,
}: {
  accommodationId: string;
  csvContent: string;
}): Promise<AccommodationReviewsImportResult> => {
  const parsedReviews = parseAccommodationReviewsCsv(csvContent);

  if (parsedReviews.length === 0) {
    throw new Error("Le fichier CSV ne contient aucun avis.");
  }

  const reviewsByImportKey = new Map(
    parsedReviews.map((review) => [review.importKey, review]),
  );

  const uniqueReviews = [...reviewsByImportKey.values()];
  const duplicates = parsedReviews.length - uniqueReviews.length;

  const result = await prisma.$transaction(async (tx) => {
    const created = await tx.accommodationReview.createMany({
      data: uniqueReviews.map((review) => ({
        accommodationId,
        importKey: review.importKey,
        authorName: review.authorName,
        rating: review.rating,
        comment: review.comment,
        reviewedAt: review.reviewedAt,
      })),
      skipDuplicates: true,
    });

    await tx.accommodation.update({
      where: {
        id: accommodationId,
      },
      data: {
        lastReviewsImportAt: new Date(),
      },
    });

    return created;
  });

  return {
    total: parsedReviews.length,
    imported: result.count,
    existing: uniqueReviews.length - result.count,
    duplicates,
  };
};
