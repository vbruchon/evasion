"use client";

import { useAdminEditorImage } from "@/hooks/admin/editor/use-admin-editor-image";
import type { HomePageAdminData } from "@/lib/admin/home/queries/get-home-page-admin-data";

export const useHomePageImages = (content: HomePageAdminData["content"]) => {
  const escapeImageState = useAdminEditorImage({
    url: content.escapeImageUrl,
    fileKey: content.escapeImageFileKey,
  });

  const ctaImageState = useAdminEditorImage({
    url: content.ctaImageUrl,
    fileKey: content.ctaImageFileKey,
  });

  return {
    escapeImage: escapeImageState.image,
    ctaImage: ctaImageState.image,

    setEscapeImageFile: escapeImageState.setFile,
    setCtaImageFile: ctaImageState.setFile,

    removeEscapeImage: escapeImageState.remove,
    removeCtaImage: ctaImageState.remove,

    imagesChanged: escapeImageState.changed || ctaImageState.changed,
  };
};
