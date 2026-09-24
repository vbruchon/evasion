import { AdminEditorSectionContent } from "@/components/layout/admin/editor/admin-editor-section-content";
import type { AboutPageEditorImage } from "@/hooks/about/admin/editor/use-about-page-images";
import type { AboutPageSpiritEditorSection } from "@/lib/admin/about/editor/editor-sections";
import { ABOUT_PAGE_DEFAULT_SPIRIT_IMAGE } from "@/lib/about/about-page-defaults";

import { AdminImageEditor } from "@/components/layout/admin/form/admin-image-editor";
import { AboutPageTextField } from "../../form/about-page-text-field";

type AboutPageSpiritEditorProps = {
  section: AboutPageSpiritEditorSection;
  image: AboutPageEditorImage | null;
  disabled: boolean;
  onImageSelected: (file: File) => void;
  onRemoveImage: () => void;
};

export const AboutPageSpiritEditor = ({
  section,
  image,
  disabled,
  onImageSelected,
  onRemoveImage,
}: AboutPageSpiritEditorProps) => {
  if (section === "image") {
    return (
      <AdminEditorSectionContent>
        <AdminImageEditor
          title="Image de la section"
          description="Cette image accompagne la présentation de l’esprit Évasion."
          imageUrl={image?.previewUrl ?? ABOUT_PAGE_DEFAULT_SPIRIT_IMAGE}
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
        name="spiritEyebrow"
        label="Sur-titre"
        placeholder="Ex. L’esprit Évasion"
      />

      <AboutPageTextField
        name="spiritTitle"
        label="Titre"
        placeholder="Titre de la section"
      />

      <AboutPageTextField
        name="spiritFirstParagraph"
        label="Premier paragraphe"
        placeholder="Présentez l’esprit Évasion"
        multiline
      />

      <AboutPageTextField
        name="spiritSecondParagraph"
        label="Deuxième paragraphe"
        placeholder="Complétez la présentation"
        multiline
      />

      <AboutPageTextField
        name="spiritHandwritten"
        label="Phrase manuscrite"
        placeholder="Ex. Prendre le temps, simplement."
      />
    </AdminEditorSectionContent>
  );
};
