import { AdminEditorSectionContent } from "@/components/layout/admin/editor/admin-editor-section-content";
import type { ReviewsPageCtaEditorSection } from "@/lib/admin/reviews/editor/editor-sections";
import type { ReviewsPageEditorImage } from "@/hooks/reviews/admin/editor/use-reviews-page-images";
import { REVIEWS_PAGE_DEFAULT_CTA_IMAGE } from "@/lib/reviews/reviews-page-defaults";

import { AdminImageEditor } from "@/components/layout/admin/form/admin-image-editor";
import { ReviewsPageTextField } from "../../form/reviews-page-text-field";

type ReviewsPageCtaEditorProps = {
  section: ReviewsPageCtaEditorSection;
  image: ReviewsPageEditorImage | null;
  disabled: boolean;
  onImageSelected: (file: File) => void;
  onRemoveImage: () => void;
};

export const ReviewsPageCtaEditor = ({
  section,
  image,
  disabled,
  onImageSelected,
  onRemoveImage,
}: ReviewsPageCtaEditorProps) => {
  if (section === "image") {
    return (
      <AdminEditorSectionContent>
        <AdminImageEditor
          title="Image d’arrière-plan"
          description="Cette image accompagne l’appel à l’action en bas de la page."
          imageUrl={image?.previewUrl ?? REVIEWS_PAGE_DEFAULT_CTA_IMAGE}
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
      <ReviewsPageTextField
        name="ctaEyebrow"
        label="Sur-titre"
        placeholder="Ex. À votre tour"
      />

      <ReviewsPageTextField
        name="ctaTitle"
        label="Titre"
        placeholder="Titre de l’appel à l’action"
      />

      <ReviewsPageTextField
        name="ctaDescription"
        label="Description"
        placeholder="Invitez les visiteurs à découvrir vos logements"
        multiline
      />

      <ReviewsPageTextField
        name="ctaButtonLabel"
        label="Libellé du bouton"
        placeholder="Ex. Découvrir nos logements"
      />

      <ReviewsPageTextField
        name="ctaHandwrittenPrefix"
        label="Phrase manuscrite"
        placeholder="Ex. Le temps de"
      />

      <ReviewsPageTextField
        name="ctaHandwrittenHighlight"
        label="Partie mise en valeur"
        placeholder="Ex. s’évader un instant."
      />
    </AdminEditorSectionContent>
  );
};
