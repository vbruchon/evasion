"use client";

import {
  AdminTextField,
  type AdminTextFieldProps,
} from "@/components/layout/admin/form/admin-text-field";
import type { ContactPageContentValues } from "@/lib/contact/contact-page.schema";

type ContactPageTextFieldProps = Omit<
  AdminTextFieldProps<ContactPageContentValues>,
  "variant"
>;

export const ContactPageTextField = ({
  multiline,
  className,
  ...props
}: ContactPageTextFieldProps) => (
  <AdminTextField<ContactPageContentValues>
    {...props}
    multiline={multiline}
    variant="editor"
    className={multiline ? `min-h-28 ${className ?? ""}` : className}
  />
);
