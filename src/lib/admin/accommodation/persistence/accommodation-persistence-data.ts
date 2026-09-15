import { AccommodationDraftContent } from "../schema";

type AccommodationPersistenceValueSource = AccommodationDraftContent["values"];

export const toAccommodationPersistenceData = (
  values: AccommodationPersistenceValueSource,
) => ({
  name: values.name,
  type: values.type || null,
  subtitle: values.subtitle || null,
  shortDescription: values.shortDescription || null,
  description: values.description || null,

  guestCapacity: values.guestCapacity,
  bedrooms: values.bedrooms,
  beds: values.beds,
  bathrooms: values.bathrooms,
  surface: values.surface,

  locationTitle: values.locationTitle || null,
  locationDescription: values.locationDescription || null,
  locationLatitude: values.locationLatitude,
  locationLongitude: values.locationLongitude,
  locationRadiusMeters: values.locationRadiusMeters,

  availabilityCalendarUrl: values.availabilityCalendarUrl || null,
  bookingUrl: values.bookingUrl || null,

  availabilityTitle: values.availabilityTitle,
  availabilityDescription: values.availabilityDescription,
  bookingButtonLabel: values.bookingButtonLabel,

  reviewsTitle: values.reviewsTitle,
  reviewsDescription: values.reviewsDescription,
});
