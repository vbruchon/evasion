"use client";

import { AdminFormSection } from "@/components/layout/admin/admin-form-section";
import { AccommodationTextField } from "../form/accommodation-text-field";

export const AccommodationUpdateInformation = () => (
  <AdminFormSection
    title="Informations principales"
    description="Renseignez les informations essentielles du logement."
  >
    <div className="grid gap-6">
      <div className="grid gap-6 md:grid-cols-2">
        <AccommodationTextField
          name="name"
          label="Nom du logement"
          placeholder="Ex : Le Dôme"
        />

        <AccommodationTextField
          name="type"
          label="Type de logement"
          placeholder="Ex : Dôme panoramique"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <AccommodationTextField
          name="subtitle"
          label="Sous-titre"
          placeholder="Ex : Spa privatif, cinéma et vue sur le Vercors"
        />

        <AccommodationTextField
          name="slug"
          label="Slug"
          placeholder="le-dome"
          description="Utilisé dans l’adresse publique du logement."
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
        className="min-h-36"
      />
    </div>
  </AdminFormSection>
);
