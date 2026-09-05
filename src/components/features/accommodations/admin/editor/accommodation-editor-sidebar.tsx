"use client";

import type { AccommodationPreviewImage } from "@/hooks/use-accommodation-images";
import {
  accommodationHeroEditorSections,
  accommodationPresentationEditorSections,
  getAccommodationEditorSection,
  type AccommodationEditorSection,
  type AccommodationHeroEditorSection,
  type AccommodationPresentationEditorSection,
} from "@/lib/admin/accommodation/editor-sections";

import { AccommodationEditorSubsectionNav } from "./accommodation-editor-subsection-nav";
import { AccommodationGalleryEditor } from "./section/accommodation-gallery-editor";
import { AccommodationHeroEditor } from "./section/accommodation-hero-editor";
import { AccommodationHighlightsEditor } from "./section/accommodation-highlights-editor";
import { AccommodationPresentationEditor } from "./section/accommodation-presentation-editor";

type AccommodationEditorSidebarProps = {
  activeSection: AccommodationEditorSection;
  activeHeroSection: AccommodationHeroEditorSection;
  activePresentationSection: AccommodationPresentationEditorSection;
  images: AccommodationPreviewImage[];
  coverImageId: string | null;
  presentationImageId: string | null;
  disabled: boolean;

  onSectionChange: (section: AccommodationEditorSection) => void;
  onHeroSectionChange: (section: AccommodationHeroEditorSection) => void;

  onPresentationSectionChange: (
    section: AccommodationPresentationEditorSection,
  ) => void;

  onFilesSelected: (files: File[]) => void;
  onSetCover: (id: string) => void;
  onSetPresentationImage: (id: string) => void;
  onRemoveImage: (id: string) => void;
  onReorderImages: (fromIndex: number, toIndex: number) => void;
};

export const AccommodationEditorSidebar = ({
  activeSection,
  activeHeroSection,
  activePresentationSection,
  images,
  coverImageId,
  presentationImageId,
  disabled,
  onSectionChange,
  onHeroSectionChange,
  onPresentationSectionChange,
  onFilesSelected,
  onSetCover,
  onSetPresentationImage,
  onRemoveImage,
  onReorderImages,
}: AccommodationEditorSidebarProps) => {
  const currentSection = getAccommodationEditorSection(activeSection);

  return (
    <aside className="flex h-full min-h-0 flex-col bg-background lg:border-l lg:border-border/60">
      <header className="shrink-0 border-b border-border/60 bg-card/20 px-5 py-5 sm:px-6 sm:py-6">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-primary">
          Édition
        </p>

        <h2 className="mt-2 font-heading text-2xl">{currentSection?.label}</h2>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {currentSection?.description}
        </p>
      </header>

      {activeSection === "hero" ? (
        <AccommodationEditorSubsectionNav
          sections={accommodationHeroEditorSections}
          activeSection={activeHeroSection}
          columns={4}
          ariaLabel="Sections du hero"
          onSectionChange={onHeroSectionChange}
        />
      ) : null}

      {activeSection === "presentation" ? (
        <AccommodationEditorSubsectionNav
          sections={accommodationPresentationEditorSections}
          activeSection={activePresentationSection}
          columns={2}
          ariaLabel="Sections de la présentation"
          onSectionChange={onPresentationSectionChange}
        />
      ) : null}

      <div className="min-h-0 flex-1 overflow-y-auto">
        {activeSection === "hero" ? (
          <>
            {activeHeroSection === "general" ? (
              <AccommodationHeroEditor section="general" />
            ) : null}

            {activeHeroSection === "key-details" ? (
              <AccommodationHeroEditor section="key-details" />
            ) : null}

            {activeHeroSection === "highlights" ? (
              <AccommodationHighlightsEditor disabled={disabled} />
            ) : null}

            {activeHeroSection === "image" ? (
              <AccommodationHeroEditor
                section="image"
                images={images}
                coverImageId={coverImageId}
                disabled={disabled}
                onSetCover={onSetCover}
                onOpenGallery={() => onSectionChange("gallery")}
              />
            ) : null}
          </>
        ) : null}

        {activeSection === "presentation" ? (
          <AccommodationPresentationEditor
            section={activePresentationSection}
            images={images}
            coverImageId={coverImageId}
            presentationImageId={presentationImageId}
            disabled={disabled}
            onSetPresentationImage={onSetPresentationImage}
          />
        ) : null}

        {activeSection === "gallery" ? (
          <AccommodationGalleryEditor
            images={images}
            coverImageId={coverImageId}
            presentationImageId={presentationImageId}
            disabled={disabled}
            onFilesSelected={onFilesSelected}
            onRemoveImage={onRemoveImage}
            onReorderImages={onReorderImages}
          />
        ) : null}
      </div>
    </aside>
  );
};

// "use client";

// import type { AccommodationPreviewImage } from "@/hooks/use-accommodation-images";
// import {
//   accommodationHeroEditorSections,
//   accommodationPresentationEditorSections,
//   getAccommodationEditorSection,
//   type AccommodationEditorSection,
//   type AccommodationHeroEditorSection,
//   type AccommodationPresentationEditorSection,
// } from "@/lib/admin/accommodation/editor-sections";

// import { AccommodationEditorSubsectionNav } from "./accommodation-editor-subsection-nav";
// import { AccommodationGalleryEditor } from "./section/accommodation-gallery-editor";
// import { AccommodationHeroEditor } from "./section/accommodation-hero-editor";
// import { AccommodationHighlightsEditor } from "./section/accommodation-highlights-editor";
// import { AccommodationPresentationEditor } from "./section/accommodation-presentation-editor";

// type AccommodationEditorSidebarProps = {
//   activeSection: AccommodationEditorSection;
//   activeHeroSection: AccommodationHeroEditorSection;
//   activePresentationSection: AccommodationPresentationEditorSection;
//   images: AccommodationPreviewImage[];
//   coverImageId: string | null;
//   presentationImageId: string | null;
//   disabled: boolean;

//   onHeroSectionChange: (section: AccommodationHeroEditorSection) => void;

//   onPresentationSectionChange: (
//     section: AccommodationPresentationEditorSection,
//   ) => void;

//   onFilesSelected: (files: File[]) => void;
//   onSetCover: (id: string) => void;
//   onSetPresentationImage: (id: string) => void;
//   onRemoveImage: (id: string) => void;
//   onReorderImages: (fromIndex: number, toIndex: number) => void;
// };

// export const AccommodationEditorSidebar = ({
//   activeSection,
//   activeHeroSection,
//   activePresentationSection,
//   images,
//   coverImageId,
//   presentationImageId,
//   disabled,
//   onHeroSectionChange,
//   onPresentationSectionChange,
//   onFilesSelected,
//   onSetCover,
//   onSetPresentationImage,
//   onRemoveImage,
//   onReorderImages,
// }: AccommodationEditorSidebarProps) => {
//   const currentSection = getAccommodationEditorSection(activeSection);

//   return (
//     <aside className="flex h-full min-h-0 flex-col bg-background lg:border-l lg:border-border/60">
//       <header className="shrink-0 border-b border-border/60 bg-card/20 px-5 py-5 sm:px-6 sm:py-6">
//         <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-primary">
//           Édition
//         </p>

//         <h2 className="mt-2 font-heading text-2xl">{currentSection?.label}</h2>

//         <p className="mt-2 text-sm leading-6 text-muted-foreground">
//           {currentSection?.description}
//         </p>
//       </header>

//       {activeSection === "hero" ? (
//         <AccommodationEditorSubsectionNav
//           sections={accommodationHeroEditorSections}
//           activeSection={activeHeroSection}
//           columns={4}
//           ariaLabel="Sections du hero"
//           onSectionChange={onHeroSectionChange}
//         />
//       ) : null}

//       {activeSection === "presentation" ? (
//         <AccommodationEditorSubsectionNav
//           sections={accommodationPresentationEditorSections}
//           activeSection={activePresentationSection}
//           columns={2}
//           ariaLabel="Sections de la présentation"
//           onSectionChange={onPresentationSectionChange}
//         />
//       ) : null}

//       <div className="min-h-0 flex-1 overflow-y-auto">
//         {activeSection === "hero" ? (
//           <>
//             {activeHeroSection === "general" ? (
//               <AccommodationHeroEditor section="general" />
//             ) : null}

//             {activeHeroSection === "key-details" ? (
//               <AccommodationHeroEditor section="key-details" />
//             ) : null}

//             {activeHeroSection === "highlights" ? (
//               <AccommodationHighlightsEditor disabled={disabled} />
//             ) : null}

//             {activeHeroSection === "image" ? (
//               <AccommodationHeroEditor
//                 section="image"
//                 images={images}
//                 coverImageId={coverImageId}
//                 disabled={disabled}
//                 onSetCover={onSetCover}
//               />
//             ) : null}
//           </>
//         ) : null}

//         {activeSection === "presentation" ? (
//           <AccommodationPresentationEditor
//             section={activePresentationSection}
//             images={images}
//             coverImageId={coverImageId}
//             presentationImageId={presentationImageId}
//             disabled={disabled}
//             onSetPresentationImage={onSetPresentationImage}
//           />
//         ) : null}

//         {activeSection === "gallery" ? (
//           <AccommodationGalleryEditor
//             images={images}
//             coverImageId={coverImageId}
//             presentationImageId={presentationImageId}
//             disabled={disabled}
//             onFilesSelected={onFilesSelected}
//             onRemoveImage={onRemoveImage}
//             onReorderImages={onReorderImages}
//           />
//         ) : null}
//       </div>
//     </aside>
//   );
// };
