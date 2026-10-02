import { getPublishedAccommodations } from "@/lib/accommodations/accommodations";
import { getAccommodationsPageContent } from "@/lib/accommodations-page/queries/get-accommodations-page-content";

export const getAccommodationsPageAdminData = async () => {
  const [content, accommodations] = await Promise.all([
    getAccommodationsPageContent(),
    getPublishedAccommodations(),
  ]);

  return {
    content,
    accommodations,
  };
};

export type AccommodationsPageAdminData = Awaited<
  ReturnType<typeof getAccommodationsPageAdminData>
>;
