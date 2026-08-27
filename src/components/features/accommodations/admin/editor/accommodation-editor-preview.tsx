"use client";

import { useFormContext, useWatch } from "react-hook-form";

import type { AccommodationUpdateFormValues } from "~/app/admin/logements/schema";

import type { AccommodationPreviewImage } from "@/hooks/use-accommodation-images";
import { getAccommodationDisplayImages } from "@/lib/accommodations/accommodation-images";
import type { AccommodationEditorSection } from "@/lib/admin/accommodation/editor-sections";

import { AccommodationGallery } from "../../slug/accommodation-gallery";
import { AccommodationHero } from "../../slug/accommodation-hero";
import { AccommodationPresentation } from "../../slug/accommodation-presentation";
import { AccommodationEditorSection as EditorSection } from "./accommodation-editor-section";

type AccommodationEditorPreviewProps = {
  images: AccommodationPreviewImage[];
  coverImageId: string | null;
  activeSection: AccommodationEditorSection;
  onSectionChange: (section: AccommodationEditorSection) => void;
};

export const AccommodationEditorPreview = ({
  images,
  coverImageId,
  activeSection,
  onSectionChange,
}: AccommodationEditorPreviewProps) => {
  const { control } = useFormContext<AccommodationUpdateFormValues>();

  const [name, type, subtitle, shortDescription, description] = useWatch({
    control,
    name: ["name", "type", "subtitle", "shortDescription", "description"],
  });

  const accommodation = {
    name,
    type,
    subtitle,
    shortDescription,
    description,
  };

  const previewImages = images.map((image) => ({
    id: image.id,
    url: image.url,
    alt: image.alt ?? null,
  }));

  const { coverImage, presentationImage } = getAccommodationDisplayImages(
    previewImages,
    coverImageId,
  );

  return (
    <div className="min-w-0 bg-background p-2 sm:p-4">
      <EditorSection
        label="Hero"
        active={activeSection === "hero"}
        onSelect={() => onSectionChange("hero")}
      >
        <AccommodationHero
          accommodation={accommodation}
          coverImage={coverImage}
          hasGallery={previewImages.length > 0}
        />
      </EditorSection>

      <EditorSection
        label="Présentation"
        active={activeSection === "presentation"}
        onSelect={() => onSectionChange("presentation")}
      >
        <AccommodationPresentation
          accommodation={accommodation}
          image={presentationImage}
        />
      </EditorSection>

      <EditorSection
        label="Galerie"
        active={activeSection === "gallery"}
        onSelect={() => onSectionChange("gallery")}
      >
        <AccommodationGallery accommodationName={name} images={previewImages} />
      </EditorSection>
    </div>
  );
};

// "use client";

// import { useFormContext, useWatch } from "react-hook-form";

// import type { AccommodationUpdateFormValues } from "~/app/admin/logements/schema";

// import type { AccommodationPreviewImage } from "@/hooks/use-accommodation-images";
// import { getAccommodationDisplayImages } from "@/lib/accommodations/accommodation-images";
// import type { AccommodationEditorSection } from "@/lib/admin/accommodation/editor-sections";

// import { AccommodationGallery } from "../../slug/accommodation-gallery";
// import { AccommodationHero } from "../../slug/accommodation-hero";
// import { AccommodationPresentation } from "../../slug/accommodation-presentation";
// import { AccommodationEditorSection as EditorSection } from "./accommodation-editor-section";

// type AccommodationEditorPreviewProps = {
//   images: AccommodationPreviewImage[];
//   coverImageId: string | null;
//   activeSection: AccommodationEditorSection;
//   onSectionChange: (section: AccommodationEditorSection) => void;
// };

// export const AccommodationEditorPreview = ({
//   images,
//   coverImageId,
//   activeSection,
//   onSectionChange,
// }: AccommodationEditorPreviewProps) => {
//   const { control } = useFormContext<AccommodationUpdateFormValues>();

//   const [name, type, subtitle, shortDescription, description] = useWatch({
//     control,
//     name: ["name", "type", "subtitle", "shortDescription", "description"],
//   });

//   const accommodation = {
//     name,
//     type,
//     subtitle,
//     shortDescription,
//     description,
//   };

//   const previewImages = images.map((image) => ({
//     id: image.id,
//     url: image.url,
//     alt: image.alt ?? null,
//   }));

//   const { coverImage, presentationImage } = getAccommodationDisplayImages(
//     previewImages,
//     coverImageId,
//   );

//   return (
//     <div className="min-w-0 bg-background p-4">
//       <EditorSection
//         label="Hero"
//         active={activeSection === "hero"}
//         onSelect={() => onSectionChange("hero")}
//       >
//         <AccommodationHero
//           accommodation={accommodation}
//           coverImage={coverImage}
//           hasGallery={previewImages.length > 0}
//         />
//       </EditorSection>

//       <EditorSection
//         label="Présentation"
//         active={activeSection === "presentation"}
//         onSelect={() => onSectionChange("presentation")}
//       >
//         <AccommodationPresentation
//           accommodation={accommodation}
//           image={presentationImage}
//         />
//       </EditorSection>

//       <EditorSection
//         label="Galerie"
//         active={activeSection === "gallery"}
//         onSelect={() => onSectionChange("gallery")}
//       >
//         <AccommodationGallery accommodationName={name} images={previewImages} />
//       </EditorSection>
//     </div>
//   );
// };
