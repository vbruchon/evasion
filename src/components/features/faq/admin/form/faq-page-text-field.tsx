"use client";

import {
  AdminTextField,
  type AdminTextFieldProps,
} from "@/components/layout/admin/form/admin-text-field";
import type { FaqPageContentValues } from "@/lib/faq/faq-page.schema";

type FaqPageTextFieldProps = Omit<
  AdminTextFieldProps<FaqPageContentValues>,
  "variant"
>;

export const FaqPageTextField = ({
  multiline,
  className,
  ...props
}: FaqPageTextFieldProps) => (
  <AdminTextField<FaqPageContentValues>
    {...props}
    multiline={multiline}
    variant="editor"
    className={multiline ? `min-h-28 ${className ?? ""}` : className}
  />
);
