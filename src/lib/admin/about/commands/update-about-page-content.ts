import { revalidatePath } from "next/cache";

import {
  ABOUT_PAGE_CONTENT_ID,
  aboutPageContentDefaults,
} from "@/lib/about/about-page-defaults";
import {
  aboutPageContentSchema,
  aboutPageImagesSchema,
  type AboutPageContentValues,
  type AboutPageImageInput,
} from "@/lib/about/about-page.schema";
import { deleteUploadThingFiles } from "@/lib/admin/uploadthing/delete-files";
import { prisma } from "@/lib/prisma";

export const updateAboutPageContentAdmin = async (
  values: AboutPageContentValues,
  spiritImage: AboutPageImageInput | null,
  ctaImage: AboutPageImageInput | null,
) => {
  const existingContent = await prisma.aboutPageContent.findUnique({
    where: {
      id: ABOUT_PAGE_CONTENT_ID,
    },

    select: {
      spiritImageFileKey: true,
      ctaImageFileKey: true,
    },
  });

  const currentFileKeys = new Set(
    [
      existingContent?.spiritImageFileKey,
      existingContent?.ctaImageFileKey,
    ].filter((fileKey): fileKey is string => Boolean(fileKey)),
  );

  const submittedFileKeys = [spiritImage?.fileKey, ctaImage?.fileKey].filter(
    (fileKey): fileKey is string => Boolean(fileKey),
  );

  const newlyUploadedFileKeys = submittedFileKeys.filter(
    (fileKey) => !currentFileKeys.has(fileKey),
  );

  const cleanupNewUploads = async () => {
    await deleteUploadThingFiles(newlyUploadedFileKeys);
  };

  const contentValidation = aboutPageContentSchema.safeParse(values);

  const imagesValidation = aboutPageImagesSchema.safeParse({
    spiritImage,
    ctaImage,
  });

  if (!contentValidation.success || !imagesValidation.success) {
    await cleanupNewUploads();

    return {
      success: false as const,
      message: "Le contenu de la page À propos est invalide.",
    };
  }

  const content = contentValidation.data;
  const images = imagesValidation.data;

  try {
    await prisma.aboutPageContent.upsert({
      where: {
        id: ABOUT_PAGE_CONTENT_ID,
      },

      update: {
        ...content,

        spiritImageUrl: images.spiritImage?.url ?? null,
        spiritImageFileKey: images.spiritImage?.fileKey ?? null,

        ctaImageUrl: images.ctaImage?.url ?? null,
        ctaImageFileKey: images.ctaImage?.fileKey ?? null,
      },

      create: {
        id: ABOUT_PAGE_CONTENT_ID,

        ...aboutPageContentDefaults,
        ...content,

        spiritImageUrl: images.spiritImage?.url ?? null,
        spiritImageFileKey: images.spiritImage?.fileKey ?? null,

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
    [images.spiritImage?.fileKey, images.ctaImage?.fileKey].filter(
      (fileKey): fileKey is string => Boolean(fileKey),
    ),
  );

  const replacedFileKeys = [...currentFileKeys].filter(
    (fileKey) => !finalFileKeys.has(fileKey),
  );

  await deleteUploadThingFiles(replacedFileKeys);

  revalidatePath("/a-propos");
  revalidatePath("/admin/a-propos");

  return {
    success: true as const,
  };
};
