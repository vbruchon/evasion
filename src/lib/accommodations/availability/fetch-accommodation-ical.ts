const INVALID_ICAL_URL_MESSAGE = "Le lien du calendrier iCal est invalide.";

const ICAL_FETCH_ERROR_MESSAGE =
  "Impossible de récupérer le calendrier iCal du logement.";

const LOCAL_SITE_URL = "http://localhost:3000";

const normalizeSiteUrl = (value: string) => {
  const normalizedValue = value.trim().replace(/\/+$/, "");

  if (/^https?:\/\//i.test(normalizedValue)) {
    return normalizedValue;
  }

  return `https://${normalizedValue}`;
};

const getCalendarBaseUrl = () => {
  if (process.env.VERCEL_URL) {
    return new URL(normalizeSiteUrl(process.env.VERCEL_URL));
  }

  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return new URL(normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL));
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return new URL(normalizeSiteUrl(process.env.VERCEL_PROJECT_PRODUCTION_URL));
  }

  return new URL(LOCAL_SITE_URL);
};

const resolveCalendarUrl = (value: string) => {
  const normalizedValue = value.trim();

  if (!normalizedValue) {
    throw new Error(INVALID_ICAL_URL_MESSAGE);
  }

  if (normalizedValue.startsWith("/")) {
    return new URL(normalizedValue, getCalendarBaseUrl());
  }

  let calendarUrl: URL;

  try {
    calendarUrl = new URL(normalizedValue);
  } catch {
    throw new Error(INVALID_ICAL_URL_MESSAGE);
  }

  if (!["http:", "https:"].includes(calendarUrl.protocol)) {
    throw new Error(INVALID_ICAL_URL_MESSAGE);
  }

  return calendarUrl;
};

export const fetchAccommodationIcal = async (url: string): Promise<string> => {
  const calendarUrl = resolveCalendarUrl(url);

  let response: Response;

  try {
    response = await fetch(calendarUrl, {
      next: {
        revalidate: 300,
      },
    });
  } catch {
    throw new Error(ICAL_FETCH_ERROR_MESSAGE);
  }

  if (!response.ok) {
    throw new Error(ICAL_FETCH_ERROR_MESSAGE);
  }

  const content = await response.text();

  if (!content.trim()) {
    throw new Error(ICAL_FETCH_ERROR_MESSAGE);
  }

  return content;
};
