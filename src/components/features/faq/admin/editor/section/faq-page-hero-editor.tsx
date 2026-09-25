import { AdminEditorSectionContent } from "@/components/layout/admin/editor/admin-editor-section-content";
import { AdminImageEditor } from "@/components/layout/admin/form/admin-image-editor";
import type { FaqPageHeroEditorSection } from "@/lib/admin/faq/editor/editor-sections";
import type { AdminEditorImage } from "@/lib/admin/images/admin-editor-image.types";
import { FAQ_PAGE_DEFAULT_HERO_IMAGE } from "@/lib/faq/faq-page-defaults";

import { FaqPageTextField } from "../../form/faq-page-text-field";

type FaqPageHeroEditorProps = {
  section: FaqPageHeroEditorSection;
  image: AdminEditorImage | null;
  disabled: boolean;
  onImageSelected: (file: File) => void;
  onRemoveImage: () => void;
};

export const FaqPageHeroEditor = ({
  section,
  image,
  disabled,
  onImageSelected,
  onRemoveImage,
}: FaqPageHeroEditorProps) => {
  if (section === "image") {
    return (
      <AdminEditorSectionContent>
        <AdminImageEditor
          title="Image du hero"
          description="Cette image est affichée en arrière-plan en haut de la page."
          imageUrl={image?.previewUrl ?? FAQ_PAGE_DEFAULT_HERO_IMAGE}
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
      <FaqPageTextField
        name="heroEyebrow"
        label="Sur-titre"
        placeholder="Ex. Questions fréquentes"
      />

      <FaqPageTextField
        name="heroTitle"
        label="Titre"
        placeholder="Titre principal"
      />

      <FaqPageTextField
        name="heroDescription"
        label="Description"
        placeholder="Présentez la page FAQ"
        multiline
      />

      <FaqPageTextField
        name="heroHandwrittenFirstLine"
        label="Phrase manuscrite — première ligne"
        placeholder="Ex. Toutes les réponses,"
      />

      <FaqPageTextField
        name="heroHandwrittenSecondLine"
        label="Phrase manuscrite — deuxième ligne"
        placeholder="Ex. simplement."
      />
    </AdminEditorSectionContent>
  );
};
