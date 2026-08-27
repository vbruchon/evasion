"use client";

import type { AccommodationPreviewImage } from "@/hooks/use-accommodation-images";
import {
  getAccommodationEditorSection,
  type AccommodationEditorSection,
} from "@/lib/admin/accommodation/editor-sections";

import { AccommodationGalleryEditor } from "./section/accommodation-gallery-editor";
import { AccommodationHeroEditor } from "./section/accommodation-hero-editor";
import { AccommodationPresentationEditor } from "./section/accommodation-presentation-editor";

type AccommodationEditorSidebarProps = {
  activeSection: AccommodationEditorSection;
  images: AccommodationPreviewImage[];
  coverImageId: string | null;
  disabled: boolean;
  onFilesSelected: (files: File[]) => void;
  onSetCover: (id: string) => void;
  onRemoveImage: (id: string) => void;
};

export const AccommodationEditorSidebar = ({
  activeSection,
  images,
  coverImageId,
  disabled,
  onFilesSelected,
  onSetCover,
  onRemoveImage,
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

      <div className="min-h-0 flex-1 overflow-y-auto">
        {activeSection === "hero" ? <AccommodationHeroEditor /> : null}

        {activeSection === "presentation" ? (
          <AccommodationPresentationEditor />
        ) : null}

        {activeSection === "gallery" ? (
          <AccommodationGalleryEditor
            images={images}
            coverImageId={coverImageId}
            disabled={disabled}
            onFilesSelected={onFilesSelected}
            onSetCover={onSetCover}
            onRemoveImage={onRemoveImage}
          />
        ) : null}
      </div>
    </aside>
  );
};

// "use client";

// import type { AccommodationPreviewImage } from "@/hooks/use-accommodation-images";
// import {
//   getAccommodationEditorSection,
//   type AccommodationEditorSection,
// } from "@/lib/admin/accommodation/editor-sections";

// import { AccommodationGalleryEditor } from "./section/accommodation-gallery-editor";
// import { AccommodationHeroEditor } from "./section/accommodation-hero-editor";
// import { AccommodationPresentationEditor } from "./section/accommodation-presentation-editor";

// type AccommodationEditorSidebarProps = {
//   activeSection: AccommodationEditorSection;
//   images: AccommodationPreviewImage[];
//   coverImageId: string | null;
//   disabled: boolean;
//   onFilesSelected: (files: File[]) => void;
//   onSetCover: (id: string) => void;
//   onRemoveImage: (id: string) => void;
// };

// export const AccommodationEditorSidebar = ({
//   activeSection,
//   images,
//   coverImageId,
//   disabled,
//   onFilesSelected,
//   onSetCover,
//   onRemoveImage,
// }: AccommodationEditorSidebarProps) => {
//   const currentSection = getAccommodationEditorSection(activeSection);

//   return (
//     <aside className="flex h-full min-h-0 flex-col border-l border-border/60 bg-background">
//       <header className="shrink-0 border-b border-border/60 bg-card/20 px-6 py-6">
//         <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-primary">
//           Édition
//         </p>

//         <h2 className="mt-2 font-heading text-2xl">{currentSection?.label}</h2>

//         <p className="mt-2 text-sm leading-6 text-muted-foreground">
//           {currentSection?.description}
//         </p>
//       </header>

//       <div className="min-h-0 flex-1 overflow-y-auto">
//         {activeSection === "hero" ? <AccommodationHeroEditor /> : null}

//         {activeSection === "presentation" ? (
//           <AccommodationPresentationEditor />
//         ) : null}

//         {activeSection === "gallery" ? (
//           <AccommodationGalleryEditor
//             images={images}
//             coverImageId={coverImageId}
//             disabled={disabled}
//             onFilesSelected={onFilesSelected}
//             onSetCover={onSetCover}
//             onRemoveImage={onRemoveImage}
//           />
//         ) : null}
//       </div>
//     </aside>
//   );
// };
