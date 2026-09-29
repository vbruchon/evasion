"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

import { updateLegalSiteSettings } from "~/app/admin/informations-legales/action";
import { AdminFormSubmitButton } from "@/components/layout/admin/admin-form-submit-button";
import { AdminTextField } from "@/components/layout/admin/form/admin-text-field";
import { FieldGroup } from "@/components/ui/field";
import type { LegalSiteSettings } from "@/lib/legal/queries/get-legal-site-settings";
import {
  legalSiteSettingsSchema,
  type LegalSiteSettingsValues,
} from "@/lib/legal/legal-site.schema";

type LegalSettingsFormProps = {
  settings: LegalSiteSettings;
};

type LegalSettingsSectionProps = {
  title: string;
  description: string;
  children: ReactNode;
};

const LegalSettingsSection = ({
  title,
  description,
  children,
}: LegalSettingsSectionProps) => (
  <section className="grid gap-8 border border-primary/10 bg-card p-6 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-12 lg:p-8">
    <div>
      <h2 className="font-heading text-2xl">{title}</h2>

      <p className="mt-2 max-w-xs text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </div>

    <FieldGroup>{children}</FieldGroup>
  </section>
);

export const LegalSettingsForm = ({ settings }: LegalSettingsFormProps) => {
  const form = useForm<LegalSiteSettingsValues>({
    resolver: zodResolver(legalSiteSettingsSchema),

    defaultValues: {
      businessName: settings.businessName ?? "",
      legalForm: settings.legalForm ?? "SARL",
      capital: settings.capital ?? "",

      registeredOfficeAddress: settings.registeredOfficeAddress ?? "",
      email: settings.email ?? "",
      phone: settings.phone ?? "",

      siren: settings.siren ?? "",
      siret: settings.siret ?? "",
      rcs: settings.rcs ?? "",
      rne: settings.rne ?? "",
      vatNumber: settings.vatNumber ?? "",

      publicationDirector: settings.publicationDirector ?? "",

      hostName: settings.hostName ?? "",
      hostCompany: settings.hostCompany ?? "",
      hostAddress: settings.hostAddress ?? "",
      hostPhone: settings.hostPhone ?? "",

      privacyEmail: settings.privacyEmail ?? "",
      contactDataRetentionPeriod: settings.contactDataRetentionPeriod ?? "",
    },

    mode: "onSubmit",
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    form.clearErrors("root");

    try {
      const result = await updateLegalSiteSettings(values);

      if (!result.success) {
        form.setError("root", {
          type: "server",
          message: result.message,
        });

        return;
      }

      form.reset(values);

      toast.success("Informations légales mises à jour.");
    } catch {
      form.setError("root", {
        type: "server",
        message:
          "Une erreur est survenue pendant l’enregistrement des informations légales.",
      });
    }
  });

  return (
    <FormProvider {...form}>
      <form
        className="mt-8 w-full space-y-6"
        onSubmit={handleSubmit}
        noValidate
      >
        {form.formState.errors.root ? (
          <div className="border border-destructive/40 bg-destructive/5 px-4 py-3">
            <p className="text-sm text-destructive">
              {form.formState.errors.root.message}
            </p>
          </div>
        ) : null}

        <LegalSettingsSection
          title="Société"
          description="Identité et coordonnées de la société éditrice du site."
        >
          <AdminTextField<LegalSiteSettingsValues>
            name="businessName"
            label="Dénomination sociale"
            placeholder="Ex : Évasion"
          />

          <div className="grid gap-6 sm:grid-cols-2">
            <AdminTextField<LegalSiteSettingsValues>
              name="legalForm"
              label="Forme juridique"
              placeholder="SARL"
            />

            <AdminTextField<LegalSiteSettingsValues>
              name="capital"
              label="Capital social"
              placeholder="Ex : 10 000 €"
            />
          </div>

          <AdminTextField<LegalSiteSettingsValues>
            name="registeredOfficeAddress"
            label="Adresse du siège social"
            placeholder="Adresse complète"
          />

          <div className="grid gap-6 sm:grid-cols-2">
            <AdminTextField<LegalSiteSettingsValues>
              name="email"
              label="Adresse e-mail"
              placeholder="contact@entreprise.fr"
            />

            <AdminTextField<LegalSiteSettingsValues>
              name="phone"
              label="Téléphone"
              placeholder="Ex : 04 00 00 00 00"
            />
          </div>
        </LegalSettingsSection>

        <LegalSettingsSection
          title="Immatriculation"
          description="Références administratives et commerciales de la société."
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AdminTextField<LegalSiteSettingsValues>
              name="siren"
              label="SIREN"
              placeholder="Ex : 123 456 789"
            />

            <AdminTextField<LegalSiteSettingsValues>
              name="siret"
              label="SIRET"
              placeholder="Ex : 123 456 789 00012"
            />

            <AdminTextField<LegalSiteSettingsValues>
              name="rne"
              label="RNE"
              placeholder="Numéro d’immatriculation"
            />

            <AdminTextField<LegalSiteSettingsValues>
              name="rcs"
              label="RCS"
              placeholder="Ex : Romans-sur-Isère 123 456 789"
            />

            <AdminTextField<LegalSiteSettingsValues>
              name="vatNumber"
              label="TVA intracommunautaire"
              placeholder="Ex : FR00 123456789"
            />

            <AdminTextField<LegalSiteSettingsValues>
              name="publicationDirector"
              label="Directeur de la publication"
              placeholder="Nom et prénom"
            />
          </div>
        </LegalSettingsSection>

        <LegalSettingsSection
          title="Protection des données"
          description="Informations utilisées dans la politique de confidentialité."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <AdminTextField<LegalSiteSettingsValues>
              name="privacyEmail"
              label="Contact pour les données personnelles"
              placeholder="Ex : contact@entreprise.fr"
              description="Laissez vide pour utiliser l’adresse e-mail principale."
            />

            <AdminTextField<LegalSiteSettingsValues>
              name="contactDataRetentionPeriod"
              label="Durée de conservation des demandes"
              placeholder="Ex : 12 mois après le dernier échange"
            />
          </div>
        </LegalSettingsSection>

        <LegalSettingsSection
          title="Hébergement"
          description="Coordonnées de l’hébergeur du site internet."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <AdminTextField<LegalSiteSettingsValues>
              name="hostName"
              label="Nom de l’hébergeur"
              placeholder="Ex : Vercel"
            />

            <AdminTextField<LegalSiteSettingsValues>
              name="hostCompany"
              label="Raison sociale"
              placeholder="Ex : Vercel Inc."
            />
          </div>

          <AdminTextField<LegalSiteSettingsValues>
            name="hostAddress"
            label="Adresse de l’hébergeur"
            placeholder="Adresse complète"
          />

          <AdminTextField<LegalSiteSettingsValues>
            name="hostPhone"
            label="Téléphone de l’hébergeur"
            placeholder="Numéro de téléphone"
          />
        </LegalSettingsSection>

        <div className="flex justify-end border-t border-border/60 pt-6">
          <AdminFormSubmitButton
            label="Enregistrer les informations"
            pendingLabel="Enregistrement..."
            disabled={!form.formState.isDirty}
          />
        </div>
      </form>
    </FormProvider>
  );
};
