"use client";

import {
  AdminTextField,
  type AdminTextFieldProps,
} from "@/components/layout/admin/form/admin-text-field";
import type { HomePageContentValues } from "@/lib/home/home-page.schema";

type HomePageTextFieldProps = Omit<
  AdminTextFieldProps<HomePageContentValues>,
  "variant"
>;

export const HomePageTextField = ({
  multiline,
  className,
  ...props
}: HomePageTextFieldProps) => (
  <AdminTextField<HomePageContentValues>
    {...props}
    multiline={multiline}
    variant="editor"
    className={multiline ? `min-h-28 ${className ?? ""}` : className}
  />
);
