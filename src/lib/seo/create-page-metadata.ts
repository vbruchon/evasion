import type { Metadata } from "next";

import { siteUrl } from "@/lib/seo/site-url";

const DEFAULT_SOCIAL_IMAGE = "/images/pages/shared/evasion-page-hero.png";

type CreatePageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
  image?: string;
};

export const createPageMetadata = ({
  title,
  description,
  path,
  absoluteTitle = false,
  image = DEFAULT_SOCIAL_IMAGE,
}: CreatePageMetadataOptions): Metadata => {
  const canonicalUrl = new URL(path, siteUrl);
  const imageUrl = new URL(image, siteUrl);

  const socialTitle = absoluteTitle ? title : `${title} | Évasion`;

  return {
    title: absoluteTitle
      ? {
          absolute: title,
        }
      : title,

    description,

    alternates: {
      canonical: path,
    },

    openGraph: {
      type: "website",
      locale: "fr_FR",
      siteName: "Évasion",
      url: canonicalUrl,
      title: socialTitle,
      description,
      images: [imageUrl],
    },

    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [imageUrl],
    },
  };
};
