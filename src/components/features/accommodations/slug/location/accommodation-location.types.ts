export type AccommodationLocationData = {
  locationTitle: string | null;
  locationDescription: string | null;
  locationLatitude: number | null;
  locationLongitude: number | null;
  locationRadiusMeters: number | null;
};

export type AccommodationAccessData = {
  key: string;
  details: string | null;
};
