"use client";

import type { AccommodationPreviewImage } from "@/hooks/use-accommodation-images";
import {
  accommodationHeroEditorSections,
  getAccommodationEditorSection,
  type AccommodationEditorSection,
  type AccommodationHeroEditorSection,
} from "@/lib/admin/accommodation/editor-sections";
import { cn } from "@/lib/utils";

import { AccommodationGalleryEditor } from "./section/accommodation-gallery-editor";
import { AccommodationHeroEditor } from "./section/accommodation-hero-editor";
import { AccommodationHighlightsEditor } from "./section/accommodation-highlights-editor";
import { AccommodationPresentationEditor } from "./section/accommodation-presentation-editor";

type AccommodationEditorSidebarProps = {
  activeSection: AccommodationEditorSection;
  activeHeroSection: AccommodationHeroEditorSection;
  images: AccommodationPreviewImage[];
  coverImageId: string | null;
  disabled: boolean;
  onHeroSectionChange: (section: AccommodationHeroEditorSection) => void;
  onFilesSelected: (files: File[]) => void;
  onSetCover: (id: string) => void;
  onRemoveImage: (id: string) => void;
};

export const AccommodationEditorSidebar = ({
  activeSection,
  activeHeroSection,
  images,
  coverImageId,
  disabled,
  onHeroSectionChange,
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

      {activeSection === "hero" ? (
        <nav
          className="grid shrink-0 grid-cols-3 border-b border-border/60 bg-background px-5 sm:px-6"
          aria-label="Sections du hero"
        >
          {accommodationHeroEditorSections.map((section) => {
            const active = activeHeroSection === section.id;

            return (
              <button
                key={section.id}
                type="button"
                className={cn(
                  "relative px-2 py-3.5 text-xs font-medium transition-colors",
                  active
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )}
                aria-current={active ? "page" : undefined}
                onClick={() => onHeroSectionChange(section.id)}
              >
                {section.label}

                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-x-2 bottom-0 h-px bg-primary transition-opacity",
                    active ? "opacity-100" : "opacity-0",
                  )}
                />
              </button>
            );
          })}
        </nav>
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
          </>
        ) : null}

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

// import { useState } from "react";

// import type { AccommodationPreviewImage } from "@/hooks/use-accommodation-images";
// import {
//   getAccommodationEditorSection,
//   type AccommodationEditorSection,
// } from "@/lib/admin/accommodation/editor-sections";
// import { cn } from "@/lib/utils";

// import { AccommodationGalleryEditor } from "./section/accommodation-gallery-editor";
// import { AccommodationHeroEditor } from "./section/accommodation-hero-editor";
// import { AccommodationHighlightsEditor } from "./section/accommodation-highlights-editor";
// import { AccommodationPresentationEditor } from "./section/accommodation-presentation-editor";

// type AccommodationHeroEditorSection = "general" | "key-details" | "highlights";

// const HERO_EDITOR_SECTIONS: {
//   id: AccommodationHeroEditorSection;
//   label: string;
// }[] = [
//   {
//     id: "general",
//     label: "Général",
//   },
//   {
//     id: "key-details",
//     label: "Infos clés",
//   },
//   {
//     id: "highlights",
//     label: "Points forts",
//   },
// ];

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

//   const [activeHeroSection, setActiveHeroSection] =
//     useState<AccommodationHeroEditorSection>("general");

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
//         <nav
//           className="grid shrink-0 grid-cols-3 border-b border-border/60 bg-background px-5 sm:px-6"
//           aria-label="Sections du hero"
//         >
//           {HERO_EDITOR_SECTIONS.map((section) => {
//             const active = activeHeroSection === section.id;

//             return (
//               <button
//                 key={section.id}
//                 type="button"
//                 className={cn(
//                   "relative px-2 py-3.5 text-xs font-medium transition-colors",
//                   active
//                     ? "text-primary"
//                     : "text-muted-foreground hover:text-foreground",
//                 )}
//                 aria-current={active ? "page" : undefined}
//                 onClick={() => setActiveHeroSection(section.id)}
//               >
//                 {section.label}

//                 <span
//                   aria-hidden="true"
//                   className={cn(
//                     "absolute inset-x-2 bottom-0 h-px bg-primary transition-opacity",
//                     active ? "opacity-100" : "opacity-0",
//                   )}
//                 />
//               </button>
//             );
//           })}
//         </nav>
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
//           </>
//         ) : null}

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
