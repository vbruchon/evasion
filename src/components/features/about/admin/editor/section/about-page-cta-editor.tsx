import { AdminEditorSectionContent } from "@/components/layout/admin/editor/admin-editor-section-content";
import type { AboutPageEditorImage } from "@/hooks/about/admin/editor/use-about-page-images";
import type { AboutPageCtaEditorSection } from "@/lib/admin/about/editor/editor-sections";
import { ABOUT_PAGE_DEFAULT_CTA_IMAGE } from "@/lib/about/about-page-defaults";

import { AdminImageEditor } from "@/components/layout/admin/form/admin-image-editor";
import { AboutPageTextField } from "../../form/about-page-text-field";

type AboutPageCtaEditorProps = {
  section: AboutPageCtaEditorSection;
  image: AboutPageEditorImage | null;
  disabled: boolean;
  onImageSelected: (file: File) => void;
  onRemoveImage: () => void;
};

export const AboutPageCtaEditor = ({
  section,
  image,
  disabled,
  onImageSelected,
  onRemoveImage,
}: AboutPageCtaEditorProps) => {
  if (section === "image") {
    return (
      <AdminEditorSectionContent>
        <AdminImageEditor
          title="Image d’arrière-plan"
          description="Cette image accompagne l’appel à l’action en bas de la page."
          imageUrl={image?.previewUrl ?? ABOUT_PAGE_DEFAULT_CTA_IMAGE}
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
      <AboutPageTextField
        name="ctaEyebrow"
        label="Sur-titre"
        placeholder="Ex. Votre prochaine parenthèse"
      />

      <AboutPageTextField
        name="ctaTitle"
        label="Titre"
        placeholder="Titre de l’appel à l’action"
      />

      <AboutPageTextField
        name="ctaDescription"
        label="Description"
        placeholder="Invitez les visiteurs à découvrir les logements"
        multiline
      />

      <AboutPageTextField
        name="ctaButtonLabel"
        label="Libellé du bouton"
        placeholder="Ex. Découvrir les logements"
      />
    </AdminEditorSectionContent>
  );
};
