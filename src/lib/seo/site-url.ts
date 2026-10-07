const LOCAL_SITE_URL = "http://localhost:3000";

const normalizeSiteUrl = (value: string) => {
  const normalizedValue = value.trim().replace(/\/+$/, "");

  if (/^https?:\/\//i.test(normalizedValue)) {
    return normalizedValue;
  }

  return `https://${normalizedValue}`;
};

const configuredSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  LOCAL_SITE_URL;

export const siteUrl = new URL(normalizeSiteUrl(configuredSiteUrl));
