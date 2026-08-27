import { AdminFormSection } from "@/components/layout/admin/admin-form-section";
import { AccommodationStatusField } from "./accommodation-status-field";

type AccommodationPublicationSectionProps = {
  mode: "create" | "update";
};

export const AccommodationPublicationSection = ({
  mode,
}: AccommodationPublicationSectionProps) => {
  const isUpdate = mode === "update";

  return (
    <AdminFormSection
      title="Publication"
      description={
        isUpdate
          ? "Gérez la visibilité du logement sur le site."
          : "Définissez la visibilité initiale du logement."
      }
      compact
    >
      <AccommodationStatusField />
    </AdminFormSection>
  );
};
