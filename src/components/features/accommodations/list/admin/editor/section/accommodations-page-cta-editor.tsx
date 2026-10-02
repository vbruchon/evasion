import { AdminEditorSectionContent } from "@/components/layout/admin/editor/admin-editor-section-content";
import { AdminImageEditor } from "@/components/layout/admin/form/admin-image-editor";
import { AdminTextField } from "@/components/layout/admin/form/admin-text-field";
import { ACCOMMODATIONS_PAGE_DEFAULT_CTA_IMAGE } from "@/lib/accommodations-page/accommodations-page-defaults";
import type { AccommodationsPageContentValues } from "@/lib/accommodations-page/accommodations-page.schema";
import type { AccommodationsPageEditorRegion } from "@/lib/admin/accommodations-page/editor/editor-sections";
import type { AdminEditorImage } from "@/lib/admin/images/admin-editor-image.types";

type AccommodationsPageCtaEditorProps = {
  section: AccommodationsPageEditorRegion;
  image: AdminEditorImage | null;
  disabled: boolean;
  onImageSelected: (file: File) => void;
  onRemoveImage: () => void;
};

export const AccommodationsPageCtaEditor = ({
  section,
  image,
  disabled,
  onImageSelected,
  onRemoveImage,
}: AccommodationsPageCtaEditorProps) => {
  if (section === "image") {
    return (
      <AdminEditorSectionContent>
        <AdminImageEditor
          title="Image d’arrière-plan"
          description="Cette image accompagne l’appel à l’action en bas de la page."
          imageUrl={image?.previewUrl ?? ACCOMMODATIONS_PAGE_DEFAULT_CTA_IMAGE}
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
        name="ctaEyebrow"
        label="Sur-titre"
        placeholder="Ex. Une question ? Une demande particulière ?"
        variant="editor"
      />

      <AdminTextField<AccommodationsPageContentValues>
        name="ctaTitle"
        label="Titre"
        placeholder="Titre de l’appel à l’action"
        multiline
        variant="editor"
        className="min-h-28"
      />

      <AdminTextField<AccommodationsPageContentValues>
        name="ctaButtonLabel"
        label="Libellé du bouton"
        placeholder="Ex. Nous contacter"
        variant="editor"
      />
    </AdminEditorSectionContent>
  );
};
