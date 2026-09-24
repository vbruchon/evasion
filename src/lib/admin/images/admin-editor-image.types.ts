export type AdminEditorImageInput = {
  url: string;
  fileKey: string;
};

export type AdminEditorImage = {
  previewUrl: string;
  persisted: AdminEditorImageInput | null;
  file: File | null;
};
