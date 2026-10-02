import { revalidatePath } from "next/cache";

import {
  ACCOMMODATIONS_PAGE_CONTENT_ID,
  accommodationsPageContentDefaults,
} from "@/lib/accommodations-page/accommodations-page-defaults";
import {
  accommodationsPageContentSchema,
  accommodationsPageImagesSchema,
  type AccommodationsPageContentValues,
  type AccommodationsPageImageInput,
} from "@/lib/accommodations-page/accommodations-page.schema";
import { deleteUploadThingFiles } from "@/lib/admin/uploadthing/delete-files";
import { prisma } from "@/lib/prisma";

export const updateAccommodationsPageContentAdmin = async (
  values: AccommodationsPageContentValues,
  heroImage: AccommodationsPageImageInput | null,
  ctaImage: AccommodationsPageImageInput | null,
) => {
  const existingContent = await prisma.accommodationsPageContent.findUnique({
    where: {
      id: ACCOMMODATIONS_PAGE_CONTENT_ID,
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

  const contentValidation = accommodationsPageContentSchema.safeParse(values);

  const imagesValidation = accommodationsPageImagesSchema.safeParse({
    heroImage,
    ctaImage,
  });

  if (!contentValidation.success || !imagesValidation.success) {
    await cleanupNewUploads();

    return {
      success: false as const,
      message: "Le contenu de la page Nos logements est invalide.",
    };
  }

  const content = contentValidation.data;
  const images = imagesValidation.data;

  try {
    await prisma.accommodationsPageContent.upsert({
      where: {
        id: ACCOMMODATIONS_PAGE_CONTENT_ID,
      },

      update: {
        ...content,

        heroImageUrl: images.heroImage?.url ?? null,
        heroImageFileKey: images.heroImage?.fileKey ?? null,

        ctaImageUrl: images.ctaImage?.url ?? null,
        ctaImageFileKey: images.ctaImage?.fileKey ?? null,
      },

      create: {
        id: ACCOMMODATIONS_PAGE_CONTENT_ID,

        ...accommodationsPageContentDefaults,
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

  revalidatePath("/logements");
  revalidatePath("/admin/nos-logements");

  return {
    success: true as const,
  };
};
