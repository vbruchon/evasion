"use client";

import {
  AdminTextField,
  type AdminTextFieldProps,
} from "@/components/layout/admin/form/admin-text-field";
import type { ReviewsPageContentValues } from "@/lib/reviews/reviews-page.schema";

type ReviewsPageTextFieldProps = Omit<
  AdminTextFieldProps<ReviewsPageContentValues>,
  "variant"
>;

export const ReviewsPageTextField = ({
  multiline,
  className,
  ...props
}: ReviewsPageTextFieldProps) => (
  <AdminTextField<ReviewsPageContentValues>
    {...props}
    multiline={multiline}
    variant="editor"
    className={multiline ? `min-h-28 ${className ?? ""}` : className}
  />
);
