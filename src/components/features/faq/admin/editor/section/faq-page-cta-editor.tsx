import { AdminEditorSectionContent } from "@/components/layout/admin/editor/admin-editor-section-content";
import { AdminImageEditor } from "@/components/layout/admin/form/admin-image-editor";
import type { FaqPageCtaEditorSection } from "@/lib/admin/faq/editor/editor-sections";
import type { AdminEditorImage } from "@/lib/admin/images/admin-editor-image.types";
import { FAQ_PAGE_DEFAULT_CTA_IMAGE } from "@/lib/faq/faq-page-defaults";

import { FaqPageTextField } from "../../form/faq-page-text-field";

type FaqPageCtaEditorProps = {
  section: FaqPageCtaEditorSection;
  image: AdminEditorImage | null;
  disabled: boolean;
  onImageSelected: (file: File) => void;
  onRemoveImage: () => void;
};

export const FaqPageCtaEditor = ({
  section,
  image,
  disabled,
  onImageSelected,
  onRemoveImage,
}: FaqPageCtaEditorProps) => {
  if (section === "image") {
    return (
      <AdminEditorSectionContent>
        <AdminImageEditor
          title="Image d’arrière-plan"
          description="Cette image accompagne l’appel à l’action en bas de la page."
          imageUrl={image?.previewUrl ?? FAQ_PAGE_DEFAULT_CTA_IMAGE}
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
        name="ctaEyebrow"
        label="Sur-titre"
        placeholder="Ex. Besoin d’aide ?"
      />

      <FaqPageTextField
        name="ctaTitle"
        label="Titre"
        placeholder="Titre de l’appel à l’action"
      />

      <FaqPageTextField
        name="ctaDescription"
        label="Description"
        placeholder="Invitez les visiteurs à vous contacter"
        multiline
      />

      <FaqPageTextField
        name="ctaButtonLabel"
        label="Libellé du bouton"
        placeholder="Ex. Nous contacter"
      />
    </AdminEditorSectionContent>
  );
};
