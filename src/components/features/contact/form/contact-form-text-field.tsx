"use client";

import {
  FormTextField,
  type FormTextFieldProps,
} from "@/components/layout/form/form-text-field";
import type { ContactRequestValues } from "@/lib/contact/contact-request.schema";
import { cn } from "@/lib/utils";

type ContactFormTextFieldProps = FormTextFieldProps<ContactRequestValues>;

export const ContactFormTextField = (props: ContactFormTextFieldProps) => (
  <FormTextField<ContactRequestValues>
    {...props}
    inputClassName={cn(
      "border border-border/65 border-b-border/65 bg-white/[0.015] px-4 focus-visible:border-primary/70",
      props.inputClassName,
    )}
  />
);
