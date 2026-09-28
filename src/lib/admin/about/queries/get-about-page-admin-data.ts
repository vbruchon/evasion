import { getAboutPageContent } from "@/lib/about/queries/get-about-page-content";
import { getAccommodationHeroImages } from "@/lib/accommodations/queries/get-accommodation-hero-images";
import { getAboutPageStats } from "@/lib/about/queries/get-about-page-stats";

export const getAboutPageAdminData = async () => {
  const [content, stats, heroImages] = await Promise.all([
    getAboutPageContent(),
    getAboutPageStats(),
    getAccommodationHeroImages(),
  ]);

  return {
    content,
    stats,
    heroImages,
  };
};

export type AboutPageAdminData = Awaited<
  ReturnType<typeof getAboutPageAdminData>
>;
