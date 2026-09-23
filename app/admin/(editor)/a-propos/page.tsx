import { AboutPageEditor } from "@/components/features/about/admin/editor/about-page-editor";
import { getAboutPageAdminData } from "@/lib/admin/about/queries/get-about-page-admin-data";

export default async function AboutPageAdminPage() {
  const data = await getAboutPageAdminData();

  return <AboutPageEditor data={data} />;
}
