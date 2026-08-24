import { AdminFormSection } from "@/components/layout/admin/admin-form-section";
import { AccommodationStatusField } from "../form/accommodation-status-field";

export const AccommodationCreatePublication = () => {
  return (
    <AdminFormSection
      title="Publication"
      description="Définissez la visibilité initiale du logement."
      compact
    >
      <AccommodationStatusField />
    </AdminFormSection>
  );
};
