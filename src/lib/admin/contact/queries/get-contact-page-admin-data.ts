import { getContactPageAccommodations } from "@/lib/contact/queries/get-contact-page-accommodations";
import { getContactPageContent } from "@/lib/contact/queries/get-contact-page-content";

export const getContactPageAdminData = async () => {
  const [content, accommodations] = await Promise.all([
    getContactPageContent(),
    getContactPageAccommodations(),
  ]);

  return {
    content,
    accommodations,
  };
};

export type ContactPageAdminData = Awaited<
  ReturnType<typeof getContactPageAdminData>
>;
