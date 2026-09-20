import { AdminEditorSectionContent } from "@/components/layout/admin/editor/admin-editor-section-content";
import { REVIEWS_PAGE_DEFAULT_HERO_IMAGE } from "@/lib/reviews/reviews-page-defaults";
import type { ReviewsPageHeroEditorSection } from "@/lib/admin/reviews/editor/editor-sections";
import type { ReviewsPageEditorImage } from "@/hooks/reviews/admin/editor/use-reviews-page-images";

import { ReviewsPageImageEditor } from "../../form/reviews-page-image-editor";
import { ReviewsPageTextField } from "../../form/reviews-page-text-field";

type ReviewsPageHeroEditorProps = {
  section: ReviewsPageHeroEditorSection;
  image: ReviewsPageEditorImage | null;
  disabled: boolean;
  onImageSelected: (file: File) => void;
  onRemoveImage: () => void;
};

export const ReviewsPageHeroEditor = ({
  section,
  image,
  disabled,
  onImageSelected,
  onRemoveImage,
}: ReviewsPageHeroEditorProps) => {
  if (section === "image") {
    return (
      <AdminEditorSectionContent>
        <ReviewsPageImageEditor
          title="Image du hero"
          description="Cette image est affichée en arrière-plan en haut de la page."
          imageUrl={image?.previewUrl ?? REVIEWS_PAGE_DEFAULT_HERO_IMAGE}
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
        name="heroEyebrow"
        label="Sur-titre"
        placeholder="Ex. Avis voyageurs"
      />

      <ReviewsPageTextField
        name="heroTitle"
        label="Titre"
        placeholder="Titre principal"
      />

      <ReviewsPageTextField
        name="heroDescription"
        label="Description"
        placeholder="Présentez les avis de vos voyageurs"
        multiline
      />
      <ReviewsPageTextField
        name="heroHandwrittenFirstLine"
        label="Phrase manuscrite — première ligne"
        placeholder="Ex. Plus qu’un séjour,"
      />

      <ReviewsPageTextField
        name="heroHandwrittenSecondLine"
        label="Phrase manuscrite — deuxième ligne"
        placeholder="Ex. une Évasion."
      />
    </AdminEditorSectionContent>
  );
};
