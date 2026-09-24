"use client";

import {
  AdminTextField,
  type AdminTextFieldProps,
} from "@/components/layout/admin/form/admin-text-field";
import type { AccommodationTextFormValues } from "@/lib/admin/accommodation/schema";

type AccommodationTextFieldProps =
  AdminTextFieldProps<AccommodationTextFormValues>;

export const AccommodationTextField = (props: AccommodationTextFieldProps) => (
  <AdminTextField<AccommodationTextFormValues> {...props} />
);
