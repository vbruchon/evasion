"use client";

import {
  AdminTextField,
  type AdminTextFieldProps,
} from "@/components/layout/admin/form/admin-text-field";
import type { AboutPageContentValues } from "@/lib/about/about-page.schema";

type AboutPageTextFieldProps = Omit<
  AdminTextFieldProps<AboutPageContentValues>,
  "variant"
>;

export const AboutPageTextField = ({
  multiline,
  className,
  ...props
}: AboutPageTextFieldProps) => (
  <AdminTextField<AboutPageContentValues>
    {...props}
    multiline={multiline}
    variant="editor"
    className={multiline ? `min-h-28 ${className ?? ""}` : className}
  />
);
