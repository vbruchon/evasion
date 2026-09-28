import { HomePageEditor } from "@/components/features/home/admin/editor/home-page-editor";
import { getHomePageAdminData } from "@/lib/admin/home/queries/get-home-page-admin-data";

export default async function HomePageAdminPage() {
  const data = await getHomePageAdminData();

  return <HomePageEditor data={data} />;
}
