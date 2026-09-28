import { AdminEditorSectionContent } from "@/components/layout/admin/editor/admin-editor-section-content";
import { AdminImageEditor } from "@/components/layout/admin/form/admin-image-editor";
import type { HomePageCtaEditorSection } from "@/lib/admin/home/editor/editor-sections";
import type { AdminEditorImage } from "@/lib/admin/images/admin-editor-image.types";
import { HOME_PAGE_DEFAULT_CTA_IMAGE } from "@/lib/home/home-page-defaults";

import { HomePageTextField } from "../../form/home-page-text-field";

type HomePageCtaEditorProps = {
  section: HomePageCtaEditorSection;
  image: AdminEditorImage | null;
  disabled: boolean;
  onImageSelected: (file: File) => void;
  onRemoveImage: () => void;
};

export const HomePageCtaEditor = ({
  section,
  image,
  disabled,
  onImageSelected,
  onRemoveImage,
}: HomePageCtaEditorProps) => {
  if (section === "image") {
    return (
      <AdminEditorSectionContent>
        <AdminImageEditor
          title="Image d’arrière-plan"
          description="Cette image accompagne l’appel à l’action en bas de la page."
          imageUrl={image?.previewUrl ?? HOME_PAGE_DEFAULT_CTA_IMAGE}
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
        name="ctaEyebrow"
        label="Sur-titre"
        placeholder="Ex. Votre prochaine parenthèse"
      />

      <HomePageTextField
        name="ctaTitle"
        label="Titre"
        placeholder="Titre de l’appel à l’action"
      />

      <HomePageTextField
        name="ctaDescription"
        label="Description"
        placeholder="Invitez les visiteurs à découvrir les logements"
        multiline
      />

      <HomePageTextField
        name="ctaButtonLabel"
        label="Libellé du bouton"
        placeholder="Ex. Découvrir les logements"
      />
    </AdminEditorSectionContent>
  );
};
