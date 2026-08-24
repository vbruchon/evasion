"use client";

import { AdminFormSection } from "@/components/layout/admin/admin-form-section";
import { AccommodationStatusField } from "../form/accommodation-status-field";

export const AccommodationUpdatePublication = () => (
  <AdminFormSection
    title="Publication"
    description="Gérez la visibilité du logement sur le site."
    compact
  >
    <AccommodationStatusField includeArchived />
  </AdminFormSection>
);
