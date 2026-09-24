"use client";

import { useAdminEditorImage } from "@/hooks/admin/editor/use-admin-editor-image";
import type { AboutPageAdminData } from "@/lib/admin/about/queries/get-about-page-admin-data";

export const useAboutPageImages = (content: AboutPageAdminData["content"]) => {
  const spiritImageState = useAdminEditorImage({
    url: content.spiritImageUrl,
    fileKey: content.spiritImageFileKey,
  });

  const ctaImageState = useAdminEditorImage({
    url: content.ctaImageUrl,
    fileKey: content.ctaImageFileKey,
  });

  return {
    spiritImage: spiritImageState.image,
    ctaImage: ctaImageState.image,

    setSpiritImageFile: spiritImageState.setFile,
    setCtaImageFile: ctaImageState.setFile,

    removeSpiritImage: spiritImageState.remove,
    removeCtaImage: ctaImageState.remove,

    imagesChanged: spiritImageState.changed || ctaImageState.changed,
  };
};
