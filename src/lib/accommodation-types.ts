import type {
  Accommodation,
  AccommodationImage,
} from "@/generated/prisma/client";

export type AccommodationWithImages = Accommodation & {
  images: AccommodationImage[];
};
