import { AccommodationsPageEditor } from "@/components/features/accommodations/list/admin/editor/accommodations-page-editor";
import { getAccommodationsPageAdminData } from "@/lib/admin/accommodations-page/queries/get-accommodations-page-admin-data";

export default async function AccommodationsPageAdminPage() {
  const data = await getAccommodationsPageAdminData();

  return <AccommodationsPageEditor data={data} />;
}
