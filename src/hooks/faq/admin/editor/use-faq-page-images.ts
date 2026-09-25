"use client";

import { useAdminEditorImage } from "@/hooks/admin/editor/use-admin-editor-image";
import type { FaqPageAdminData } from "@/lib/admin/faq/queries/get-faq-page-admin-data";

export const useFaqPageImages = (content: FaqPageAdminData["content"]) => {
  const heroImageState = useAdminEditorImage({
    url: content.heroImageUrl,
    fileKey: content.heroImageFileKey,
  });

  const ctaImageState = useAdminEditorImage({
    url: content.ctaImageUrl,
    fileKey: content.ctaImageFileKey,
  });

  return {
    heroImage: heroImageState.image,
    ctaImage: ctaImageState.image,

    setHeroImageFile: heroImageState.setFile,
    setCtaImageFile: ctaImageState.setFile,

    removeHeroImage: heroImageState.remove,
    removeCtaImage: ctaImageState.remove,

    imagesChanged: heroImageState.changed || ctaImageState.changed,
  };
};
