import { ReviewsPageEditor } from "@/components/features/reviews/admin/editor/reviews-page-editor";
import { getReviewsPageAdminData } from "@/lib/admin/reviews/queries/get-reviews-page-admin-data";

export default async function ReviewsPageAdminPage() {
  const data = await getReviewsPageAdminData();

  return <ReviewsPageEditor data={data} />;
}
