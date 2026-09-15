export type AccommodationLocationSearchResult = {
  id: string;
  label: string;
  latitude: number;
  longitude: number;
};

type NominatimSearchResult = {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
};

const NOMINATIM_SEARCH_URL = "https://nominatim.openstreetmap.org/search";

export const searchAccommodationLocationsAdmin = async (
  query: string,
): Promise<AccommodationLocationSearchResult[]> => {
  const normalizedQuery = query.trim();

  if (normalizedQuery.length < 3) {
    return [];
  }

  const searchParams = new URLSearchParams({
    q: normalizedQuery,
    format: "jsonv2",
    limit: "5",
    addressdetails: "1",
    "accept-language": "fr",
  });

  const response = await fetch(
    `${NOMINATIM_SEARCH_URL}?${searchParams.toString()}`,
    {
      headers: {
        Accept: "application/json",
        "User-Agent": "Evasion/1.0 accommodation-location-search",
      },

      next: {
        revalidate: 60 * 60 * 24 * 30,
      },
    },
  );

  if (!response.ok) {
    throw new Error("La recherche de localisation a échoué.");
  }

  const results = (await response.json()) as NominatimSearchResult[];

  return results.flatMap((result) => {
    const latitude = Number(result.lat);
    const longitude = Number(result.lon);

    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      return [];
    }

    return [
      {
        id: String(result.place_id),
        label: result.display_name,
        latitude,
        longitude,
      },
    ];
  });
};
