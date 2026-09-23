"use client";

import { useCallback, useState } from "react";
import type { UseFormReturn } from "react-hook-form";

import { updateAboutPageContent } from "~/app/admin/a-propos/action";
import { uploadFiles } from "@/lib/admin/uploadthing/client";
import type {
  AboutPageContentValues,
  AboutPageImageInput,
} from "@/lib/about/about-page.schema";

import type { AboutPageEditorImage } from "./use-about-page-images";

type AboutPageImageSlot = "spirit" | "cta";

type PendingImageUpload = {
  slot: AboutPageImageSlot;
  file: File;
};

type UseAboutPageEditorSubmitOptions = {
  form: UseFormReturn<AboutPageContentValues>;
  spiritImage: AboutPageEditorImage | null;
  ctaImage: AboutPageEditorImage | null;
};

const prepareAboutPageImages = async (
  spiritImage: AboutPageEditorImage | null,
  ctaImage: AboutPageEditorImage | null,
) => {
  const pendingUploads: PendingImageUpload[] = [];

  if (spiritImage?.file) {
    pendingUploads.push({
      slot: "spirit",
      file: spiritImage.file,
    });
  }

  if (ctaImage?.file) {
    pendingUploads.push({
      slot: "cta",
      file: ctaImage.file,
    });
  }

  const uploadedFiles =
    pendingUploads.length > 0
      ? await uploadFiles("aboutPageImages", {
          files: pendingUploads.map(({ file }) => file),
        })
      : [];

  if (uploadedFiles.length !== pendingUploads.length) {
    throw new Error("Une image n’a pas pu être envoyée.");
  }

  const uploadedImages = new Map<AboutPageImageSlot, AboutPageImageInput>();

  pendingUploads.forEach(({ slot }, index) => {
    const uploadedFile = uploadedFiles[index];

    if (!uploadedFile?.key || !uploadedFile.ufsUrl) {
      throw new Error("Une image n’a pas pu être envoyée.");
    }

    uploadedImages.set(slot, {
      fileKey: uploadedFile.key,
      url: uploadedFile.ufsUrl,
    });
  });

  const resolveImage = (
    slot: AboutPageImageSlot,
    image: AboutPageEditorImage | null,
  ): AboutPageImageInput | null => {
    if (!image) {
      return null;
    }

    if (image.persisted) {
      return image.persisted;
    }

    const uploadedImage = uploadedImages.get(slot);

    if (!uploadedImage) {
      throw new Error("Une image n’a pas pu être envoyée.");
    }

    return uploadedImage;
  };

  return {
    spiritImage: resolveImage("spirit", spiritImage),
    ctaImage: resolveImage("cta", ctaImage),
  };
};

export const useAboutPageEditorSubmit = ({
  form,
  spiritImage,
  ctaImage,
}: UseAboutPageEditorSubmitOptions) => {
  const [isSaving, setIsSaving] = useState(false);

  const setRootError = useCallback(
    (message: string) => {
      form.setError("root", {
        message,
      });
    },
    [form],
  );

  const saveAboutPage = useCallback(
    async (values: AboutPageContentValues) => {
      form.clearErrors("root");
      setIsSaving(true);

      try {
        const preparedImages = await prepareAboutPageImages(
          spiritImage,
          ctaImage,
        );

        const result = await updateAboutPageContent(
          values,
          preparedImages.spiritImage,
          preparedImages.ctaImage,
        );

        if (!result.success) {
          setRootError(result.message);
          return;
        }

        window.location.reload();
      } catch {
        setRootError(
          "Une erreur est survenue pendant l’enregistrement de la page À propos.",
        );
      } finally {
        setIsSaving(false);
      }
    },
    [ctaImage, form, setRootError, spiritImage],
  );

  const handleSubmit = form.handleSubmit(saveAboutPage);

  return {
    handleSubmit,
    isSaving,
  };
};
