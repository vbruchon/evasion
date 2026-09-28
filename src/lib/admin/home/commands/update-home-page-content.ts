import { revalidatePath } from "next/cache";

import { deleteUploadThingFiles } from "@/lib/admin/uploadthing/delete-files";
import {
  HOME_PAGE_CONTENT_ID,
  homePageContentDefaults,
} from "@/lib/home/home-page-defaults";
import {
  homePageContentSchema,
  homePageImagesSchema,
  type HomePageContentValues,
  type HomePageImageInput,
} from "@/lib/home/home-page.schema";
import { prisma } from "@/lib/prisma";

export const updateHomePageContentAdmin = async (
  values: HomePageContentValues,
  escapeImage: HomePageImageInput | null,
  ctaImage: HomePageImageInput | null,
) => {
  const existingContent = await prisma.homePageContent.findUnique({
    where: {
      id: HOME_PAGE_CONTENT_ID,
    },

    select: {
      escapeImageFileKey: true,
      ctaImageFileKey: true,
    },
  });

  const currentFileKeys = new Set(
    [
      existingContent?.escapeImageFileKey,
      existingContent?.ctaImageFileKey,
    ].filter((fileKey): fileKey is string => Boolean(fileKey)),
  );

  const submittedFileKeys = [escapeImage?.fileKey, ctaImage?.fileKey].filter(
    (fileKey): fileKey is string => Boolean(fileKey),
  );

  const newlyUploadedFileKeys = submittedFileKeys.filter(
    (fileKey) => !currentFileKeys.has(fileKey),
  );

  const cleanupNewUploads = async () => {
    await deleteUploadThingFiles(newlyUploadedFileKeys);
  };

  const contentValidation = homePageContentSchema.safeParse(values);

  const imagesValidation = homePageImagesSchema.safeParse({
    escapeImage,
    ctaImage,
  });

  if (!contentValidation.success || !imagesValidation.success) {
    await cleanupNewUploads();

    return {
      success: false as const,
      message: "Le contenu de la page d’accueil est invalide.",
    };
  }

  const content = contentValidation.data;
  const images = imagesValidation.data;

  try {
    await prisma.homePageContent.upsert({
      where: {
        id: HOME_PAGE_CONTENT_ID,
      },

      update: {
        ...content,

        escapeImageUrl: images.escapeImage?.url ?? null,
        escapeImageFileKey: images.escapeImage?.fileKey ?? null,

        ctaImageUrl: images.ctaImage?.url ?? null,
        ctaImageFileKey: images.ctaImage?.fileKey ?? null,
      },

      create: {
        id: HOME_PAGE_CONTENT_ID,

        ...homePageContentDefaults,
        ...content,

        escapeImageUrl: images.escapeImage?.url ?? null,
        escapeImageFileKey: images.escapeImage?.fileKey ?? null,

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
    [images.escapeImage?.fileKey, images.ctaImage?.fileKey].filter(
      (fileKey): fileKey is string => Boolean(fileKey),
    ),
  );

  const replacedFileKeys = [...currentFileKeys].filter(
    (fileKey) => !finalFileKeys.has(fileKey),
  );

  await deleteUploadThingFiles(replacedFileKeys);

  revalidatePath("/");
  revalidatePath("/admin/accueil");

  return {
    success: true as const,
  };
};
