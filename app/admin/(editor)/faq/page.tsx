import { FaqPageEditor } from "@/components/features/faq/admin/editor/faq-page-editor";
import { getFaqPageAdminData } from "@/lib/admin/faq/queries/get-faq-page-admin-data";

export default async function FaqPageAdminPage() {
  const data = await getFaqPageAdminData();

  return <FaqPageEditor data={data} />;
}
