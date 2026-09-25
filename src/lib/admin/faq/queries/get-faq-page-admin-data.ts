import { getFaqPageContent } from "@/lib/faq/queries/get-faq-page-content";

export const getFaqPageAdminData = async () => {
  const content = await getFaqPageContent();

  return {
    content,
  };
};

export type FaqPageAdminData = Awaited<ReturnType<typeof getFaqPageAdminData>>;
