"use client";

import { useEffect, useMemo, useState } from "react";
import type { AdminEditorImage } from "@/lib/admin/images/admin-editor-image.types";

type UseAdminEditorImageOptions = {
  url: string | null;
  fileKey: string | null;
};

const createPersistedImage = (
  url: string | null,
  fileKey: string | null,
): AdminEditorImage | null => {
  if (!url || !fileKey) {
    return null;
  }

  return {
    previewUrl: url,
    persisted: {
      url,
      fileKey,
    },
    file: null,
  };
};

const createLocalImage = (file: File): AdminEditorImage => ({
  previewUrl: URL.createObjectURL(file),
  persisted: null,
  file,
});

const hasImageChanged = (
  current: AdminEditorImage | null,
  initial: AdminEditorImage | null,
) => {
  if (current?.file) {
    return true;
  }

  return (
    (current?.persisted?.fileKey ?? null) !==
    (initial?.persisted?.fileKey ?? null)
  );
};

export const useAdminEditorImage = ({
  url,
  fileKey,
}: UseAdminEditorImageOptions) => {
  const initialImage = useMemo(
    () => createPersistedImage(url, fileKey),
    [fileKey, url],
  );

  const [image, setImage] = useState<AdminEditorImage | null>(() =>
    createPersistedImage(url, fileKey),
  );

  useEffect(
    () => () => {
      if (image?.file) {
        URL.revokeObjectURL(image.previewUrl);
      }
    },
    [image],
  );

  const setFile = (file: File) => {
    setImage(createLocalImage(file));
  };

  const remove = () => {
    setImage(null);
  };

  return {
    image,
    setFile,
    remove,
    changed: hasImageChanged(image, initialImage),
  };
};
