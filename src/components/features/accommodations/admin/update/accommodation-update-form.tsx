"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";

import { updateAccommodation } from "~/app/admin/logements/action";
import {
  accommodationsSchema,
  type AccommodationFormValues,
  type AccommodationUpdateImageInput,
} from "~/app/admin/logements/schema";

import { AdminFormSubmitButton } from "@/components/layout/admin/admin-form-submit-button";
import {
  type AccommodationInitialImage,
  type AccommodationPreviewImage,
  useAccommodationImages,
} from "@/hooks/use-accommodation-images";
import { uploadAccommodationImageFiles } from "@/lib/admin/uploadthing/upload-accommodation-image-files";

import { AccommodationUpdateImages } from "./accommodation-update-images";
import { AccommodationUpdateInformation } from "./accommodation-update-information";
import { AccommodationUpdatePublication } from "./accommodation-update-publication";

type AccommodationUpdateFormProps = {
  accommodation: {
    id: string;
    name: string;
    slug: string;
    type: string | null;
    subtitle: string | null;
    shortDescription: string | null;
    description: string | null;
    status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
    images: AccommodationInitialImage[];
  };
};

const isNewImage = (
  image: AccommodationPreviewImage,
): image is AccommodationPreviewImage & {
  file: File;
} => !image.isExisting && image.file instanceof File;

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
      const newImages = images.filter(isNewImage);

      const uploadedImages = await uploadAccommodationImageFiles(
        newImages.map((image) => image.file),
      );

      const uploadedImagesById = new Map(
        newImages.map((image, index) => [image.id, uploadedImages[index]]),
      );

      const finalImages: AccommodationUpdateImageInput[] = images.map(
        (image) => {
          const isCover = image.id === coverImageId;

          if (image.isExisting) {
            return {
              id: image.id,
              isCover,
            };
          }

          const uploadedImage = uploadedImagesById.get(image.id);

          if (!uploadedImage) {
            throw new Error("Une image n’a pas pu être envoyée.");
          }

          return {
            url: uploadedImage.url,
            fileKey: uploadedImage.fileKey,
            isCover,
          };
        },
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
      console.error("Erreur pendant la modification du logement :", error);

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

        <AccommodationUpdateInformation />

        <AccommodationUpdateImages
          images={images}
          coverImageId={coverImageId}
          disabled={isSubmitting}
          onFilesSelected={addFiles}
          onSetCover={setCoverImage}
          onRemove={removeImage}
        />

        <AccommodationUpdatePublication />

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
