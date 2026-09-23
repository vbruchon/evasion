import { getAboutPageContent } from "@/lib/about/queries/get-about-page-content";
import { getAboutPageHeroImages } from "@/lib/about/queries/get-about-page-hero-images";
import { getAboutPageStats } from "@/lib/about/queries/get-about-page-stats";

export const getAboutPageAdminData = async () => {
  const [content, stats, heroImages] = await Promise.all([
    getAboutPageContent(),
    getAboutPageStats(),
    getAboutPageHeroImages(),
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
