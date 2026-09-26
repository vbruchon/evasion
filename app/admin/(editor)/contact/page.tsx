import { ContactPageEditor } from "@/components/features/contact/admin/editor/contact-page-editor";
import { getContactPageAdminData } from "@/lib/admin/contact/queries/get-contact-page-admin-data";

export default async function ContactPageAdminPage() {
  const data = await getContactPageAdminData();

  return <ContactPageEditor data={data} />;
}
