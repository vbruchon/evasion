"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";

import { updateAccommodation } from "~/app/admin/logements/action";
import {
  accommodationsSchema,
  type AccommodationFormValues,
} from "~/app/admin/logements/schema";

import { AdminFormSubmitButton } from "@/components/layout/admin/admin-form-submit-button";
import { useAccommodationImages } from "@/hooks/use-accommodation-images";
import type { AccommodationUpdateData } from "@/lib/admin/accommodation/get-accommodation-for-update";
import { prepareAccommodationUpdateImages } from "@/lib/admin/accommodation/prepare-accommodation-update-images";

import { AccommodationImagesSection } from "../form/accommodation-images-section";
import { AccommodationInformationSection } from "../form/accommodation-information-section";
import { AccommodationPublicationSection } from "../form/accommodation-publication-section";

type AccommodationUpdateFormProps = {
  accommodation: AccommodationUpdateData;
};

export const AccommodationUpdateForm = ({
  accommodation,
}: AccommodationUpdateFormProps) => {
  const router = useRouter();

  const form = useForm<AccommodationFormValues>({
    resolver: zodResolver(accommodationsSchema),
    defaultValues: {
      name: accommodation.name,
      slug: accommodation.slug,
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

  const handleSubmit = form.handleSubmit(async (values) => {
    form.clearErrors("root");

    try {
      const finalImages = await prepareAccommodationUpdateImages(
        images,
        coverImageId,
      );

      const result = await updateAccommodation(
        accommodation.id,
        values,
        finalImages,
      );

      if (!result.success) {
        if (result.field) {
          form.setError(result.field, {
            type: "server",
            message: result.message,
          });

          return;
        }

        form.setError("root", {
          type: "server",
          message: result.message,
        });

        return;
      }

      router.push("/admin/logements");
      router.refresh();
    } catch (error) {
      form.setError("root", {
        type: "server",
        message:
          error instanceof Error
            ? error.message
            : "Une erreur est survenue pendant la modification du logement.",
      });
    }
  });

  const isSubmitting = form.formState.isSubmitting;

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit} className="space-y-8">
        {form.formState.errors.root ? (
          <p className="text-sm text-destructive">
            {form.formState.errors.root.message}
          </p>
        ) : null}

        <AccommodationInformationSection mode="update" />

        <AccommodationImagesSection
          images={images}
          coverImageId={coverImageId}
          disabled={isSubmitting}
          onFilesSelected={addFiles}
          onSetCover={setCoverImage}
          onRemove={removeImage}
        />

        <AccommodationPublicationSection mode="update" />

        <div className="flex justify-end border-t border-border/60 pt-6">
          <AdminFormSubmitButton
            label="Enregistrer les modifications"
            pendingLabel="Enregistrement..."
          />
        </div>
      </form>
    </FormProvider>
  );
};
