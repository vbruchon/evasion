"use client";

import { useFormContext } from "react-hook-form";

import { FieldGroup } from "@/components/ui/field";
import { createAccommodationSlug } from "@/lib/admin/accommodation/create-accommodation-slug";

import type { AccommodationFormValues } from "~/app/admin/logements/schema";
import { AccommodationTextField } from "../form/accommodation-text-field";
import { AdminFormSection } from "@/components/layout/admin/admin-form-section";

export const AccommodationCreateInformation = () => {
  const form = useFormContext<AccommodationFormValues>();

  const handleNameChange = (value: string) => {
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
            onValueChange={handleNameChange}
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
            description="Généré automatiquement à partir du nom, mais modifiable."
            transform={createAccommodationSlug}
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
