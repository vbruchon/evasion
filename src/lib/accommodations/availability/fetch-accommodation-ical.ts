import type { LookupAddress } from "node:dns";
import { lookup } from "node:dns/promises";
import { BlockList, isIP } from "node:net";
import { getDemoAccommodationIcal } from "./get-demo-accommodation-ical";

const INVALID_ICAL_URL_MESSAGE = "Le lien du calendrier iCal est invalide.";

const ICAL_FETCH_ERROR_MESSAGE =
  "Impossible de récupérer le calendrier iCal du logement.";

const DEMO_CALENDAR_PATH_PREFIX = "/api/demo-calendars/";

const ICAL_FETCH_TIMEOUT_MS = 8_000;
const ICAL_MAX_RESPONSE_SIZE = 1024 * 1024;
const ICAL_MAX_REDIRECTS = 3;

const REDIRECT_STATUSES = new Set([301, 302, 303, 307, 308]);

const blockedNetworkAddresses = new BlockList();

const blockedIpv4Subnets = [
  ["0.0.0.0", 8],
  ["10.0.0.0", 8],
  ["100.64.0.0", 10],
  ["127.0.0.0", 8],
  ["169.254.0.0", 16],
  ["172.16.0.0", 12],
  ["192.0.0.0", 24],
  ["192.0.2.0", 24],
  ["192.88.99.0", 24],
  ["192.168.0.0", 16],
  ["198.18.0.0", 15],
  ["198.51.100.0", 24],
  ["203.0.113.0", 24],
  ["224.0.0.0", 4],
  ["240.0.0.0", 4],
] as const;

const blockedIpv6Subnets = [
  ["::", 128],
  ["::1", 128],
  ["64:ff9b::", 96],
  ["64:ff9b:1::", 48],
  ["100::", 64],
  ["2001:db8::", 32],
  ["fc00::", 7],
  ["fe80::", 10],
  ["ff00::", 8],
] as const;

for (const [address, prefix] of blockedIpv4Subnets) {
  blockedNetworkAddresses.addSubnet(address, prefix, "ipv4");
}

for (const [address, prefix] of blockedIpv6Subnets) {
  blockedNetworkAddresses.addSubnet(address, prefix, "ipv6");
}

type ResolvedCalendarUrl =
  | {
      type: "demo";
      filename: string;
    }
  | {
      type: "external";
      url: URL;
    };

const normalizeHostname = (hostname: string) =>
  hostname
    .replace(/^\[/, "")
    .replace(/\]$/, "")
    .replace(/\.$/, "")
    .toLowerCase();

const isBlockedNetworkAddress = (address: string, family?: number) => {
  const normalizedAddress = normalizeHostname(address);
  const detectedFamily = family ?? isIP(normalizedAddress);

  if (detectedFamily === 4) {
    return blockedNetworkAddresses.check(normalizedAddress, "ipv4");
  }

  if (detectedFamily === 6) {
    if (normalizedAddress.startsWith("::ffff:")) {
      return true;
    }

    return blockedNetworkAddresses.check(normalizedAddress, "ipv6");
  }

  return true;
};

const assertSafeExternalCalendarUrl = async (calendarUrl: URL) => {
  if (calendarUrl.protocol !== "https:") {
    throw new Error(INVALID_ICAL_URL_MESSAGE);
  }

  if (calendarUrl.username || calendarUrl.password) {
    throw new Error(INVALID_ICAL_URL_MESSAGE);
  }

  const hostname = normalizeHostname(calendarUrl.hostname);

  if (
    !hostname ||
    hostname === "localhost" ||
    hostname.endsWith(".localhost")
  ) {
    throw new Error(INVALID_ICAL_URL_MESSAGE);
  }

  const addressFamily = isIP(hostname);

  if (addressFamily) {
    if (isBlockedNetworkAddress(hostname, addressFamily)) {
      throw new Error(INVALID_ICAL_URL_MESSAGE);
    }

    return;
  }

  let addresses: LookupAddress[];

  try {
    addresses = await lookup(hostname, {
      all: true,
      verbatim: true,
    });
  } catch {
    throw new Error(ICAL_FETCH_ERROR_MESSAGE);
  }

  if (addresses.length === 0) {
    throw new Error(ICAL_FETCH_ERROR_MESSAGE);
  }

  if (
    addresses.some(({ address, family }) =>
      isBlockedNetworkAddress(address, family),
    )
  ) {
    throw new Error(INVALID_ICAL_URL_MESSAGE);
  }
};

const resolveCalendarUrl = (value: string): ResolvedCalendarUrl => {
  const normalizedValue = value.trim();

  if (!normalizedValue) {
    throw new Error(INVALID_ICAL_URL_MESSAGE);
  }

  if (normalizedValue.startsWith("/") && !normalizedValue.startsWith("//")) {
    const calendarUrl = new URL(normalizedValue, "https://evasion.local");

    if (!calendarUrl.pathname.startsWith(DEMO_CALENDAR_PATH_PREFIX)) {
      throw new Error(INVALID_ICAL_URL_MESSAGE);
    }

    const filename = calendarUrl.pathname.slice(
      DEMO_CALENDAR_PATH_PREFIX.length,
    );

    if (!filename || filename.includes("/")) {
      throw new Error(INVALID_ICAL_URL_MESSAGE);
    }

    return {
      type: "demo",
      filename,
    };
  }

  let calendarUrl: URL;

  try {
    calendarUrl = new URL(normalizedValue);
  } catch {
    throw new Error(INVALID_ICAL_URL_MESSAGE);
  }

  return {
    type: "external",
    url: calendarUrl,
  };
};

const fetchCalendarResponse = async (calendarUrl: URL) => {
  try {
    return await fetch(calendarUrl, {
      redirect: "manual",

      signal: AbortSignal.timeout(ICAL_FETCH_TIMEOUT_MS),

      next: {
        revalidate: 300,
      },
    });
  } catch {
    throw new Error(ICAL_FETCH_ERROR_MESSAGE);
  }
};

const fetchExternalCalendarResponse = async (initialUrl: URL) => {
  let calendarUrl = initialUrl;

  for (let redirectCount = 0; ; redirectCount += 1) {
    await assertSafeExternalCalendarUrl(calendarUrl);

    const response = await fetchCalendarResponse(calendarUrl);

    if (!REDIRECT_STATUSES.has(response.status)) {
      return response;
    }

    if (redirectCount >= ICAL_MAX_REDIRECTS) {
      throw new Error(ICAL_FETCH_ERROR_MESSAGE);
    }

    const location = response.headers.get("location");

    if (!location) {
      throw new Error(ICAL_FETCH_ERROR_MESSAGE);
    }

    try {
      calendarUrl = new URL(location, calendarUrl);
    } catch {
      throw new Error(ICAL_FETCH_ERROR_MESSAGE);
    }
  }
};

const readCalendarResponse = async (response: Response) => {
  const contentLength = response.headers.get("content-length");

  if (contentLength) {
    const declaredSize = Number(contentLength);

    if (
      Number.isFinite(declaredSize) &&
      declaredSize > ICAL_MAX_RESPONSE_SIZE
    ) {
      throw new Error(ICAL_FETCH_ERROR_MESSAGE);
    }
  }

  if (!response.body) {
    throw new Error(ICAL_FETCH_ERROR_MESSAGE);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  let totalSize = 0;
  let content = "";

  while (true) {
    const { done, value } = await reader.read();

    if (done) {
      break;
    }

    totalSize += value.byteLength;

    if (totalSize > ICAL_MAX_RESPONSE_SIZE) {
      await reader.cancel().catch(() => undefined);

      throw new Error(ICAL_FETCH_ERROR_MESSAGE);
    }

    content += decoder.decode(value, {
      stream: true,
    });
  }

  content += decoder.decode();

  if (!content.trim()) {
    throw new Error(ICAL_FETCH_ERROR_MESSAGE);
  }

  return content;
};

export const fetchAccommodationIcal = async (url: string): Promise<string> => {
  const calendar = resolveCalendarUrl(url);

  if (calendar.type === "demo") {
    const content = getDemoAccommodationIcal(calendar.filename);

    if (!content) {
      throw new Error(ICAL_FETCH_ERROR_MESSAGE);
    }

    return content;
  }

  const response = await fetchExternalCalendarResponse(calendar.url);

  if (REDIRECT_STATUSES.has(response.status)) {
    throw new Error(ICAL_FETCH_ERROR_MESSAGE);
  }

  if (!response.ok) {
    throw new Error(ICAL_FETCH_ERROR_MESSAGE);
  }

  return readCalendarResponse(response);
};
