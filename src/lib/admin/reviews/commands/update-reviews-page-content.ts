import { revalidatePath } from "next/cache";

import { deleteUploadThingFiles } from "@/lib/admin/uploadthing/delete-files";
import { prisma } from "@/lib/prisma";
import {
  REVIEWS_PAGE_CONTENT_ID,
  reviewsPageContentDefaults,
} from "@/lib/reviews/reviews-page-defaults";
import {
  reviewsPageContentSchema,
  reviewsPageImagesSchema,
  type ReviewsPageContentValues,
  type ReviewsPageImageInput,
} from "@/lib/reviews/reviews-page.schema";

export const updateReviewsPageContentAdmin = async (
  values: ReviewsPageContentValues,
  heroImage: ReviewsPageImageInput | null,
  ctaImage: ReviewsPageImageInput | null,
) => {
  const existingContent = await prisma.reviewsPageContent.findUnique({
    where: {
      id: REVIEWS_PAGE_CONTENT_ID,
    },

    select: {
      heroImageFileKey: true,
      ctaImageFileKey: true,
    },
  });

  const currentFileKeys = new Set(
    [
      existingContent?.heroImageFileKey,
      existingContent?.ctaImageFileKey,
    ].filter((fileKey): fileKey is string => Boolean(fileKey)),
  );

  const submittedFileKeys = [heroImage?.fileKey, ctaImage?.fileKey].filter(
    (fileKey): fileKey is string => Boolean(fileKey),
  );

  const newlyUploadedFileKeys = submittedFileKeys.filter(
    (fileKey) => !currentFileKeys.has(fileKey),
  );

  const cleanupNewUploads = async () => {
    await deleteUploadThingFiles(newlyUploadedFileKeys);
  };

  const contentValidation = reviewsPageContentSchema.safeParse(values);
  const imagesValidation = reviewsPageImagesSchema.safeParse({
    heroImage,
    ctaImage,
  });

  if (!contentValidation.success || !imagesValidation.success) {
    await cleanupNewUploads();

    return {
      success: false as const,
      message: "Le contenu de la page Avis est invalide.",
    };
  }

  const content = contentValidation.data;
  const images = imagesValidation.data;

  try {
    await prisma.reviewsPageContent.upsert({
      where: {
        id: REVIEWS_PAGE_CONTENT_ID,
      },

      update: {
        ...content,

        heroImageUrl: images.heroImage?.url ?? null,
        heroImageFileKey: images.heroImage?.fileKey ?? null,

        ctaImageUrl: images.ctaImage?.url ?? null,
        ctaImageFileKey: images.ctaImage?.fileKey ?? null,
      },

      create: {
        id: REVIEWS_PAGE_CONTENT_ID,

        ...reviewsPageContentDefaults,
        ...content,

        heroImageUrl: images.heroImage?.url ?? null,
        heroImageFileKey: images.heroImage?.fileKey ?? null,

        ctaImageUrl: images.ctaImage?.url ?? null,
        ctaImageFileKey: images.ctaImage?.fileKey ?? null,
      },
    });
  } catch {
    await cleanupNewUploads();

    return {
      success: false as const,
      message: "Une erreur est survenue pendant l’enregistrement.",
    };
  }

  const finalFileKeys = new Set(
    [images.heroImage?.fileKey, images.ctaImage?.fileKey].filter(
      (fileKey): fileKey is string => Boolean(fileKey),
    ),
  );

  const replacedFileKeys = [...currentFileKeys].filter(
    (fileKey) => !finalFileKeys.has(fileKey),
  );

  await deleteUploadThingFiles(replacedFileKeys);

  revalidatePath("/avis");
  revalidatePath("/admin/avis");

  return {
    success: true as const,
  };
};
