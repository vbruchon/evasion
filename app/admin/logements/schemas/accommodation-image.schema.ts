import { z } from "zod";

import { MAX_ACCOMMODATION_IMAGES } from "@/lib/accommodations/accommodation-images";

const hasSingleCoverImage = (images: { isCover: boolean }[]) =>
  images.length === 0 || images.filter((image) => image.isCover).length === 1;

const hasSinglePresentationImage = (images: { isPresentation?: boolean }[]) =>
  images.filter((image) => image.isPresentation).length <= 1;

export const accommodationImageSchema = z.object({
  url: z.string().url(),
  fileKey: z.string().min(1),
  isCover: z.boolean(),
  isPresentation: z.boolean().optional(),
});

export const accommodationImagesSchema = z
  .array(accommodationImageSchema)
  .max(
    MAX_ACCOMMODATION_IMAGES,
    `Un logement ne peut pas contenir plus de ${MAX_ACCOMMODATION_IMAGES} images.`,
  )
  .refine(hasSingleCoverImage, {
    message: "Une seule image de couverture doit être sélectionnée.",
  })
  .refine(hasSinglePresentationImage, {
    message: "Une seule image de présentation peut être sélectionnée.",
  });

export const accommodationUpdateImageSchema = z.union([
  z.object({
    id: z.string().min(1),
    isCover: z.boolean(),
    isPresentation: z.boolean().optional(),
  }),

  z.object({
    url: z.string().url(),
    fileKey: z.string().min(1),
    isCover: z.boolean(),
    isPresentation: z.boolean().optional(),
  }),
]);

export const accommodationUpdateImagesSchema = z
  .array(accommodationUpdateImageSchema)
  .max(
    MAX_ACCOMMODATION_IMAGES,
    `Un logement ne peut pas contenir plus de ${MAX_ACCOMMODATION_IMAGES} images.`,
  )
  .refine(hasSingleCoverImage, {
    message: "Une seule image de couverture doit être sélectionnée.",
  })
  .refine(hasSinglePresentationImage, {
    message: "Une seule image de présentation peut être sélectionnée.",
  });

export type AccommodationImageInput = z.infer<typeof accommodationImageSchema>;

export type AccommodationUpdateImageInput = z.infer<
  typeof accommodationUpdateImageSchema
>;
