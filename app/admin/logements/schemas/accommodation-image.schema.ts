import { z } from "zod";

const MAX_ACCOMMODATION_IMAGES = 15;

const hasSingleCoverImage = (images: { isCover: boolean }[]) =>
  images.length === 0 || images.filter((image) => image.isCover).length === 1;

export const accommodationImageSchema = z.object({
  url: z.string().url(),
  fileKey: z.string().min(1),
  isCover: z.boolean(),
});

export const accommodationImagesSchema = z
  .array(accommodationImageSchema)
  .max(
    MAX_ACCOMMODATION_IMAGES,
    `Un logement ne peut pas contenir plus de ${MAX_ACCOMMODATION_IMAGES} images.`,
  )
  .refine(hasSingleCoverImage, {
    message: "Une seule image de couverture doit être sélectionnée.",
  });

export const accommodationUpdateImageSchema = z.union([
  z.object({
    id: z.string().min(1),
    isCover: z.boolean(),
  }),
  z.object({
    url: z.string().url(),
    fileKey: z.string().min(1),
    isCover: z.boolean(),
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
  });

export type AccommodationImageInput = z.infer<typeof accommodationImageSchema>;

export type AccommodationUpdateImageInput = z.infer<
  typeof accommodationUpdateImageSchema
>;
