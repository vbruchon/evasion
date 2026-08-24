"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { createAccommodation } from "~/app/admin/logements/action";
import {
  accommodationsSchema,
  type AccommodationFormValues,
} from "~/app/admin/logements/schema";

import { uploadAccommodationImages } from "@/lib/admin/uploadthing/upload-accommodation-images";
import { AdminFormSubmitButton } from "@/components/layout/admin/admin-form-submit-button";
import { AccommodationPublicationSection } from "../form/accommodation-publication-section";
import { AccommodationInformationSection } from "../form/accommodation-information-section";
import { useAccommodationImages } from "@/hooks/use-accommodation-images";
import { AccommodationImagesSection } from "../form/accommodation-images-section";

const defaultValues: AccommodationFormValues = {
  name: "",
  slug: "",
  type: "",
  subtitle: "",
  shortDescription: "",
  description: "",
  status: "DRAFT",
};

export const AccommodationCreateForm = () => {
  const router = useRouter();

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [coverImageIndex, setCoverImageIndex] = useState(0);

  const { images, coverImageId, addFiles, removeImage, setCoverImage } =
    useAccommodationImages({
      onFilesChange: (files, coverIndex) => {
        setImageFiles(files);
        setCoverImageIndex(coverIndex);
      },
    });

  const form = useForm<AccommodationFormValues>({
    resolver: zodResolver(accommodationsSchema),
    defaultValues,
    mode: "onSubmit",
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    form.clearErrors("root");

    try {
      const uploadedImages = await uploadAccommodationImages(
        imageFiles,
        coverImageIndex,
      );

      const result = await createAccommodation(values, uploadedImages);

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
            : "Une erreur est survenue. Veuillez réessayer.",
      });
    }
  });

  const isSubmitting = form.formState.isSubmitting;

  return (
    <FormProvider {...form}>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
        {form.formState.errors.root ? (
          <div className="border border-destructive/40 bg-destructive/5 px-4 py-3">
            <p className="text-sm text-destructive">
              {form.formState.errors.root.message}
            </p>
          </div>
        ) : null}

        <AccommodationInformationSection mode="create" />

        <AccommodationImagesSection
          images={images}
          coverImageId={coverImageId}
          disabled={isSubmitting}
          onFilesSelected={addFiles}
          onSetCover={setCoverImage}
          onRemove={removeImage}
        />

        <AccommodationPublicationSection mode="create" />

        <div className="flex justify-end border-t border-border/60 pt-6">
          <AdminFormSubmitButton
            label="Créer le logement"
            pendingLabel="Création..."
          />
        </div>
      </form>
    </FormProvider>
  );
};
