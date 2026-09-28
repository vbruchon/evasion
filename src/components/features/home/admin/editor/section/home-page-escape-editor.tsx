import { AdminEditorSectionContent } from "@/components/layout/admin/editor/admin-editor-section-content";
import { AdminImageEditor } from "@/components/layout/admin/form/admin-image-editor";
import type { HomePageEscapeEditorSection } from "@/lib/admin/home/editor/editor-sections";
import type { AdminEditorImage } from "@/lib/admin/images/admin-editor-image.types";
import { HOME_PAGE_DEFAULT_ESCAPE_IMAGE } from "@/lib/home/home-page-defaults";

import { HomePageTextField } from "../../form/home-page-text-field";

type HomePageEscapeEditorProps = {
  section: HomePageEscapeEditorSection;
  image: AdminEditorImage | null;
  disabled: boolean;
  onImageSelected: (file: File) => void;
  onRemoveImage: () => void;
};

export const HomePageEscapeEditor = ({
  section,
  image,
  disabled,
  onImageSelected,
  onRemoveImage,
}: HomePageEscapeEditorProps) => {
  if (section === "image") {
    return (
      <AdminEditorSectionContent>
        <AdminImageEditor
          title="Image de la section"
          description="Cette image accompagne la présentation de l’esprit Évasion."
          imageUrl={image?.previewUrl ?? HOME_PAGE_DEFAULT_ESCAPE_IMAGE}
          hasCustomImage={Boolean(image)}
          disabled={disabled}
          onFileSelected={onImageSelected}
          onRemove={onRemoveImage}
        />
      </AdminEditorSectionContent>
    );
  }

  return (
    <AdminEditorSectionContent>
      <HomePageTextField
        name="escapeEyebrow"
        label="Sur-titre"
        placeholder="Ex. L’esprit Évasion"
      />

      <HomePageTextField
        name="escapeTitle"
        label="Titre"
        placeholder="Titre de la section"
      />

      <HomePageTextField
        name="escapeDescription"
        label="Description"
        placeholder="Présentez l’esprit Évasion"
        multiline
      />

      <HomePageTextField
        name="escapeHandwritten"
        label="Phrase manuscrite"
        placeholder="Ex. Juste vous deux."
      />
    </AdminEditorSectionContent>
  );
};
