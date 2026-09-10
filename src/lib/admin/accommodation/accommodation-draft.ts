import {
  accommodationDraftContentSchema,
  type AccommodationDraftContent,
  type AccommodationUpdateFormValues,
} from "~/app/admin/logements/schema";

export const ACCOMMODATION_DRAFT_VALUE_FIELDS = [
  "name",
  "type",
  "subtitle",
  "shortDescription",
  "description",
  "guestCapacity",
  "bedrooms",
  "beds",
  "bathrooms",
  "surface",
  "locationTitle",
  "locationDescription",
  "locationLatitude",
  "locationLongitude",
  "locationRadiusMeters",
  "availabilityCalendarUrl",
  "bookingUrl",
  "availabilityTitle",
  "availabilityDescription",
  "bookingButtonLabel",
] as const satisfies readonly (keyof AccommodationDraftContent["values"])[];

type AccommodationDraftValueSource = Pick<
  AccommodationUpdateFormValues,
  keyof AccommodationDraftContent["values"]
>;

type AccommodationDraftSignatureImage = {
  id: string;
};

type AccommodationDraftSignatureOptions = {
  values: AccommodationDraftContent["values"];
  highlights: AccommodationDraftContent["highlights"];
  amenities: AccommodationDraftContent["amenities"];
  accesses: AccommodationDraftContent["accesses"];
  images: AccommodationDraftSignatureImage[];
  coverImageId: string | null;
  presentationImageId: string | null;
};

export const parseAccommodationDraftContent = (
  content: unknown,
): AccommodationDraftContent => {
  const result = accommodationDraftContentSchema.safeParse(content);

  if (!result.success) {
    throw new Error("Le brouillon du logement est invalide.");
  }

  return result.data;
};

export const getAccommodationDraftValues = (
  values: AccommodationDraftValueSource,
): AccommodationDraftContent["values"] => ({
  name: values.name,
  type: values.type,
  subtitle: values.subtitle,
  shortDescription: values.shortDescription,
  description: values.description,
  guestCapacity: values.guestCapacity,
  bedrooms: values.bedrooms,
  beds: values.beds,
  bathrooms: values.bathrooms,
  surface: values.surface,
  locationTitle: values.locationTitle,
  locationDescription: values.locationDescription,
  locationLatitude: values.locationLatitude,
  locationLongitude: values.locationLongitude,
  locationRadiusMeters: values.locationRadiusMeters,
  availabilityCalendarUrl: values.availabilityCalendarUrl,
  bookingUrl: values.bookingUrl,
  availabilityTitle: values.availabilityTitle,
  availabilityDescription: values.availabilityDescription,
  bookingButtonLabel: values.bookingButtonLabel,
});

export const getAccommodationDraftFileKeys = (
  content: AccommodationDraftContent,
) =>
  content.images.flatMap((image) =>
    "fileKey" in image ? [image.fileKey] : [],
  );

export const getAccommodationDraftExistingImageIds = (
  content: AccommodationDraftContent,
) => content.images.flatMap((image) => ("id" in image ? [image.id] : []));

export const getAccommodationDraftSignature = ({
  values,
  highlights,
  amenities,
  accesses,
  images,
  coverImageId,
  presentationImageId,
}: AccommodationDraftSignatureOptions) =>
  JSON.stringify({
    values,
    highlights,
    amenities,
    accesses,

    images: images.map((image) => ({
      id: image.id,
      isCover: image.id === coverImageId,
      isPresentation: image.id === presentationImageId,
    })),
  });
