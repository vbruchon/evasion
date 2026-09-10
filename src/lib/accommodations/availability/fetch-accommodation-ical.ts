const INVALID_ICAL_URL_MESSAGE = "Le lien du calendrier iCal est invalide.";

const ICAL_FETCH_ERROR_MESSAGE =
  "Impossible de récupérer le calendrier iCal du logement.";

export const fetchAccommodationIcal = async (url: string): Promise<string> => {
  let calendarUrl: URL;

  try {
    calendarUrl = new URL(url);
  } catch {
    throw new Error(INVALID_ICAL_URL_MESSAGE);
  }

  if (!["http:", "https:"].includes(calendarUrl.protocol)) {
    throw new Error(INVALID_ICAL_URL_MESSAGE);
  }

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
