"use client";

import { useFormContext } from "react-hook-form";

import type { AccommodationFormValues } from "~/app/admin/logements/schema";

import { AdminFormSection } from "@/components/layout/admin/admin-form-section";
import { FieldGroup } from "@/components/ui/field";
import { createAccommodationSlug } from "@/lib/admin/accommodation/create-accommodation-slug";

import { AccommodationTextField } from "./accommodation-text-field";

type AccommodationInformationSectionProps = {
  mode: "create" | "update";
};

export const AccommodationInformationSection = ({
  mode,
}: AccommodationInformationSectionProps) => {
  const form = useFormContext<AccommodationFormValues>();

  const isCreate = mode === "create";

  const handleNameChange = (value: string) => {
    if (!isCreate) {
      return;
    }

    const slugState = form.getFieldState("slug");

    if (slugState.isDirty) {
      return;
    }

    form.setValue("slug", createAccommodationSlug(value), {
      shouldValidate: false,
      shouldDirty: false,
    });
  };

  return (
    <AdminFormSection
      title="Informations principales"
      description="Renseignez les informations essentielles du logement."
    >
      <FieldGroup>
        <div className="grid gap-6 lg:grid-cols-2">
          <AccommodationTextField
            name="name"
            label="Nom du logement"
            placeholder="Ex : Le Dôme"
            onValueChange={isCreate ? handleNameChange : undefined}
          />

          <AccommodationTextField
            name="type"
            label="Type de logement"
            placeholder="Ex : Dôme panoramique"
          />

          <AccommodationTextField
            name="subtitle"
            label="Sous-titre"
            placeholder="Ex : Spa privatif, cinéma et vue sur le Vercors"
          />

          <AccommodationTextField
            name="slug"
            label="Slug"
            placeholder="le-dome"
            description={
              isCreate
                ? "Généré automatiquement à partir du nom, mais modifiable."
                : "Utilisé dans l’adresse publique du logement."
            }
            transform={isCreate ? createAccommodationSlug : undefined}
          />
        </div>

        <AccommodationTextField
          name="shortDescription"
          label="Description courte"
          placeholder="Une courte présentation du logement utilisée dans les aperçus."
          description="Utilisée notamment sur les cartes et les aperçus du logement."
          multiline
        />

        <AccommodationTextField
          name="description"
          label="Description"
          placeholder="Présentez le logement, son ambiance et l’expérience proposée..."
          multiline
          className="min-h-40 resize-y"
        />
      </FieldGroup>
    </AdminFormSection>
  );
};
