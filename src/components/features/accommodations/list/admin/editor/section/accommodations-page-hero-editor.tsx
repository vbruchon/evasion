import { AdminEditorSectionContent } from "@/components/layout/admin/editor/admin-editor-section-content";
import { AdminImageEditor } from "@/components/layout/admin/form/admin-image-editor";
import { AdminTextField } from "@/components/layout/admin/form/admin-text-field";
import { ACCOMMODATIONS_PAGE_DEFAULT_HERO_IMAGE } from "@/lib/accommodations-page/accommodations-page-defaults";
import type { AccommodationsPageContentValues } from "@/lib/accommodations-page/accommodations-page.schema";
import type { AccommodationsPageEditorRegion } from "@/lib/admin/accommodations-page/editor/editor-sections";
import type { AdminEditorImage } from "@/lib/admin/images/admin-editor-image.types";

type AccommodationsPageHeroEditorProps = {
  section: AccommodationsPageEditorRegion;
  image: AdminEditorImage | null;
  disabled: boolean;
  onImageSelected: (file: File) => void;
  onRemoveImage: () => void;
};

export const AccommodationsPageHeroEditor = ({
  section,
  image,
  disabled,
  onImageSelected,
  onRemoveImage,
}: AccommodationsPageHeroEditorProps) => {
  if (section === "image") {
    return (
      <AdminEditorSectionContent>
        <AdminImageEditor
          title="Image du hero"
          description="Cette image est affichée en arrière-plan en haut de la page Nos logements."
          imageUrl={image?.previewUrl ?? ACCOMMODATIONS_PAGE_DEFAULT_HERO_IMAGE}
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
      <AdminTextField<AccommodationsPageContentValues>
        name="heroEyebrow"
        label="Sur-titre"
        placeholder="Ex. Séjours d’exception"
        variant="editor"
      />

      <AdminTextField<AccommodationsPageContentValues>
        name="heroTitle"
        label="Titre"
        placeholder="Ex. Nos logements"
        variant="editor"
      />

      <AdminTextField<AccommodationsPageContentValues>
        name="heroDescription"
        label="Description"
        placeholder="Présentez la collection de logements"
        multiline
        variant="editor"
        className="min-h-28"
      />
    </AdminEditorSectionContent>
  );
};
