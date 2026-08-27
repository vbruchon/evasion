"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";

import {
  accommodationUpdateSchema,
  type AccommodationUpdateFormValues,
} from "~/app/admin/logements/schema";

import { useAccommodationEditorSubmit } from "@/hooks/use-accommodation-editor-submit";
import { useAccommodationImages } from "@/hooks/use-accommodation-images";
import type { AccommodationUpdateData } from "@/lib/admin/accommodation/get-accommodation-for-update";
import type { AccommodationEditorSection } from "@/lib/admin/accommodation/editor-sections";
import { cn } from "@/lib/utils";

import { AccommodationEditorHeader } from "./accommodation-editor-header";
import {
  AccommodationEditorMobileNavigation,
  type AccommodationEditorMobileView,
} from "./accommodation-editor-mobile-navigation";
import { AccommodationEditorPreview } from "./accommodation-editor-preview";
import { AccommodationEditorSidebar } from "./accommodation-editor-sidebar";

type AccommodationEditorProps = {
  accommodation: AccommodationUpdateData;
};

export const AccommodationEditor = ({
  accommodation,
}: AccommodationEditorProps) => {
  const [activeSection, setActiveSection] =
    useState<AccommodationEditorSection>("hero");

  const [mobileView, setMobileView] =
    useState<AccommodationEditorMobileView>("preview");

  const form = useForm<AccommodationUpdateFormValues>({
    resolver: zodResolver(accommodationUpdateSchema),
    defaultValues: {
      name: accommodation.name,
      type: accommodation.type ?? "",
      subtitle: accommodation.subtitle ?? "",
      shortDescription: accommodation.shortDescription ?? "",
      description: accommodation.description ?? "",
      status: accommodation.status,
    },
    mode: "onSubmit",
  });

  const { images, coverImageId, addFiles, removeImage, setCoverImage } =
    useAccommodationImages({
      initialImages: accommodation.images,
    });

  const handleSubmit = useAccommodationEditorSubmit({
    accommodationId: accommodation.id,
    form,
    images,
    coverImageId,
  });

  const handleSectionChange = (section: AccommodationEditorSection) => {
    setActiveSection(section);
    setMobileView("editor");
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit}
        className="flex min-h-0 flex-1 flex-col overflow-hidden"
      >
        <AccommodationEditorHeader slug={accommodation.slug} />

        <AccommodationEditorMobileNavigation
          activeView={mobileView}
          onViewChange={setMobileView}
        />

        {form.formState.errors.root ? (
          <div className="shrink-0 border-b border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive sm:px-6">
            {form.formState.errors.root.message}
          </div>
        ) : null}

        <div className="min-h-0 flex-1 overflow-hidden lg:grid lg:grid-cols-[minmax(0,1fr)_420px]">
          <div
            className={cn(
              "h-full min-h-0 overflow-y-auto",
              mobileView !== "preview" && "hidden lg:block",
            )}
          >
            <AccommodationEditorPreview
              images={images}
              coverImageId={coverImageId}
              activeSection={activeSection}
              onSectionChange={handleSectionChange}
            />
          </div>

          <div
            className={cn(
              "h-full min-h-0 overflow-hidden",
              mobileView !== "editor" && "hidden lg:block",
            )}
          >
            <AccommodationEditorSidebar
              activeSection={activeSection}
              images={images}
              coverImageId={coverImageId}
              disabled={form.formState.isSubmitting}
              onFilesSelected={addFiles}
              onSetCover={setCoverImage}
              onRemoveImage={removeImage}
            />
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { FormProvider, useForm } from "react-hook-form";
// import { useState } from "react";

// import {
//   accommodationUpdateSchema,
//   type AccommodationUpdateFormValues,
// } from "~/app/admin/logements/schema";

// import { useAccommodationEditorSubmit } from "@/hooks/use-accommodation-editor-submit";
// import { useAccommodationImages } from "@/hooks/use-accommodation-images";
// import type { AccommodationUpdateData } from "@/lib/admin/accommodation/get-accommodation-for-update";
// import type { AccommodationEditorSection } from "@/lib/admin/accommodation/editor-sections";

// import { AccommodationEditorHeader } from "./accommodation-editor-header";
// import { AccommodationEditorPreview } from "./accommodation-editor-preview";
// import { AccommodationEditorSidebar } from "./accommodation-editor-sidebar";

// type AccommodationEditorProps = {
//   accommodation: AccommodationUpdateData;
// };

// export const AccommodationEditor = ({
//   accommodation,
// }: AccommodationEditorProps) => {
//   const [activeSection, setActiveSection] =
//     useState<AccommodationEditorSection>("hero");

//   const form = useForm<AccommodationUpdateFormValues>({
//     resolver: zodResolver(accommodationUpdateSchema),
//     defaultValues: {
//       name: accommodation.name,
//       type: accommodation.type ?? "",
//       subtitle: accommodation.subtitle ?? "",
//       shortDescription: accommodation.shortDescription ?? "",
//       description: accommodation.description ?? "",
//       status: accommodation.status,
//     },
//     mode: "onSubmit",
//   });

//   const { images, coverImageId, addFiles, removeImage, setCoverImage } =
//     useAccommodationImages({
//       initialImages: accommodation.images,
//     });

//   const handleSubmit = useAccommodationEditorSubmit({
//     accommodationId: accommodation.id,
//     form,
//     images,
//     coverImageId,
//   });

//   return (
//     <FormProvider {...form}>
//       <form
//         onSubmit={handleSubmit}
//         className="flex min-h-0 flex-1 flex-col overflow-hidden"
//       >
//         <AccommodationEditorHeader slug={accommodation.slug} />

//         {form.formState.errors.root ? (
//           <div className="shrink-0 border-b border-destructive/30 bg-destructive/5 px-6 py-3 text-sm text-destructive">
//             {form.formState.errors.root.message}
//           </div>
//         ) : null}

//         <div className="grid min-h-0 flex-1 overflow-hidden lg:grid-cols-[minmax(0,1fr)_420px]">
//           <div className="min-h-0 overflow-y-auto">
//             <AccommodationEditorPreview
//               images={images}
//               coverImageId={coverImageId}
//               activeSection={activeSection}
//               onSectionChange={setActiveSection}
//             />
//           </div>

//           <div className="min-h-0 overflow-hidden">
//             <AccommodationEditorSidebar
//               activeSection={activeSection}
//               images={images}
//               coverImageId={coverImageId}
//               disabled={form.formState.isSubmitting}
//               onFilesSelected={addFiles}
//               onSetCover={setCoverImage}
//               onRemoveImage={removeImage}
//             />
//           </div>
//         </div>
//       </form>
//     </FormProvider>
//   );
// };
