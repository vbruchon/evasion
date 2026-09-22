import { getAboutPageContent } from "@/lib/about/queries/get-about-page-content";
import { getAboutPageStats } from "@/lib/about/queries/get-about-page-stats";

export const getAboutPageAdminData = async () => {
  const [content, stats] = await Promise.all([
    getAboutPageContent(),
    getAboutPageStats(),
  ]);

  return {
    content,
    stats,
  };
};

export type AboutPageAdminData = Awaited<
  ReturnType<typeof getAboutPageAdminData>
>;
