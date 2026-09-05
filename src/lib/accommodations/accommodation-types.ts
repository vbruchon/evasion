import type {
  Accommodation,
  AccommodationHighlight,
  AccommodationImage,
  Prisma,
} from "@/generated/prisma/client";

export type AccommodationWithImages = Prisma.AccommodationGetPayload<{
  include: {
    images: true;
  };
}>;

export type AccommodationAdminListItem = Prisma.AccommodationGetPayload<{
  include: {
    images: true;

    draft: {
      select: {
        id: true;
        updatedAt: true;
      };
    };
  };
}>;

export type AccommodationHeroData = Pick<
  Accommodation,
  | "name"
  | "type"
  | "subtitle"
  | "guestCapacity"
  | "bedrooms"
  | "beds"
  | "bathrooms"
  | "surface"
>;

export type AccommodationHeroGeneralData = Pick<
  AccommodationHeroData,
  "name" | "type" | "subtitle"
>;

export type AccommodationKeyDetailsData = Pick<
  AccommodationHeroData,
  "guestCapacity" | "bedrooms" | "beds" | "bathrooms" | "surface"
>;

export type AccommodationPresentationData = Pick<
  Accommodation,
  "name" | "shortDescription" | "description"
>;

export type AccommodationDisplayImage = Pick<
  AccommodationImage,
  "id" | "url" | "alt"
>;

export type AccommodationDisplayImageSource = Pick<
  AccommodationImage,
  "url" | "alt"
>;

export type AccommodationHighlightDisplay = Omit<
  Pick<AccommodationHighlight, "id" | "title" | "description" | "icon">,
  "id"
> & {
  id?: string;
};
