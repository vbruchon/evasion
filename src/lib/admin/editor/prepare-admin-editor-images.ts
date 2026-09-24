import type {
  AdminEditorImage,
  AdminEditorImageInput,
} from "@/lib/admin/images/admin-editor-image.types";

const IMAGE_UPLOAD_ERROR = "Une image n’a pas pu être envoyée.";

type AdminEditorImages = Record<string, AdminEditorImage | null>;

type PreparedAdminEditorImages<TImages extends AdminEditorImages> = {
  [TKey in keyof TImages]: AdminEditorImageInput | null;
};

type UploadedAdminEditorImage = {
  key: string;
  ufsUrl: string;
};

type UploadAdminEditorImages = (
  files: File[],
) => Promise<readonly UploadedAdminEditorImage[]>;

export const prepareAdminEditorImages = async <
  TImages extends AdminEditorImages,
>(
  images: TImages,
  upload: UploadAdminEditorImages,
): Promise<PreparedAdminEditorImages<TImages>> => {
  const entries = Object.entries(images) as Array<
    [keyof TImages, AdminEditorImage | null]
  >;

  const pendingUploads = entries.flatMap(([slot, image]) =>
    image?.file
      ? [
          {
            slot,
            file: image.file,
          },
        ]
      : [],
  );

  const uploadedFiles =
    pendingUploads.length > 0
      ? await upload(pendingUploads.map(({ file }) => file))
      : [];

  if (uploadedFiles.length !== pendingUploads.length) {
    throw new Error(IMAGE_UPLOAD_ERROR);
  }

  const uploadedImages = new Map<keyof TImages, AdminEditorImageInput>();

  pendingUploads.forEach(({ slot }, index) => {
    const uploadedFile = uploadedFiles[index];

    if (!uploadedFile?.key || !uploadedFile.ufsUrl) {
      throw new Error(IMAGE_UPLOAD_ERROR);
    }

    uploadedImages.set(slot, {
      fileKey: uploadedFile.key,
      url: uploadedFile.ufsUrl,
    });
  });

  const preparedEntries = entries.map(([slot, image]) => {
    if (!image) {
      return [slot, null] as const;
    }

    if (image.persisted) {
      return [slot, image.persisted] as const;
    }

    const uploadedImage = uploadedImages.get(slot);

    if (!uploadedImage) {
      throw new Error(IMAGE_UPLOAD_ERROR);
    }

    return [slot, uploadedImage] as const;
  });

  return Object.fromEntries(
    preparedEntries,
  ) as PreparedAdminEditorImages<TImages>;
};
