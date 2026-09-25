import { revalidatePath } from "next/cache";

import { deleteUploadThingFiles } from "@/lib/admin/uploadthing/delete-files";
import { prisma } from "@/lib/prisma";
import {
  FAQ_PAGE_CONTENT_ID,
  faqPageContentDefaults,
} from "@/lib/faq/faq-page-defaults";
import {
  faqPageContentSchema,
  faqPageImagesSchema,
  type FaqPageContentValues,
  type FaqPageImageInput,
} from "@/lib/faq/faq-page.schema";

import { hasForeignFaqItem, syncFaqItems } from "../persistence/sync-faq-items";

export const updateFaqPageContentAdmin = async (
  values: FaqPageContentValues,
  heroImage: FaqPageImageInput | null,
  ctaImage: FaqPageImageInput | null,
) => {
  const existingContent = await prisma.faqPageContent.findUnique({
    where: {
      id: FAQ_PAGE_CONTENT_ID,
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

  const contentValidation = faqPageContentSchema.safeParse(values);
  const imagesValidation = faqPageImagesSchema.safeParse({
    heroImage,
    ctaImage,
  });

  if (!contentValidation.success || !imagesValidation.success) {
    await cleanupNewUploads();

    return {
      success: false as const,
      message: "Le contenu de la page FAQ est invalide.",
    };
  }

  const { items, ...content } = contentValidation.data;
  const images = imagesValidation.data;

  const existingItems = await prisma.faqItem.findMany({
    where: {
      faqPageContentId: FAQ_PAGE_CONTENT_ID,
    },

    select: {
      id: true,
    },
  });

  if (
    hasForeignFaqItem(
      items,
      existingItems.map((item) => item.id),
    )
  ) {
    await cleanupNewUploads();

    return {
      success: false as const,
      message: "Une des questions de la FAQ est invalide.",
    };
  }

  try {
    await prisma.$transaction(async (tx) => {
      await tx.faqPageContent.upsert({
        where: {
          id: FAQ_PAGE_CONTENT_ID,
        },

        update: {
          ...content,

          heroImageUrl: images.heroImage?.url ?? null,
          heroImageFileKey: images.heroImage?.fileKey ?? null,

          ctaImageUrl: images.ctaImage?.url ?? null,
          ctaImageFileKey: images.ctaImage?.fileKey ?? null,
        },

        create: {
          id: FAQ_PAGE_CONTENT_ID,

          ...faqPageContentDefaults,
          ...content,

          heroImageUrl: images.heroImage?.url ?? null,
          heroImageFileKey: images.heroImage?.fileKey ?? null,

          ctaImageUrl: images.ctaImage?.url ?? null,
          ctaImageFileKey: images.ctaImage?.fileKey ?? null,
        },
      });

      await syncFaqItems(tx, FAQ_PAGE_CONTENT_ID, items);
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

  revalidatePath("/faq");
  revalidatePath("/admin/faq");

  return {
    success: true as const,
  };
};
