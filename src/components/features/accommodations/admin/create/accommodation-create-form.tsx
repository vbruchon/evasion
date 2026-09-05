"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";

import { createAccommodation } from "~/app/admin/logements/action";
import {
  accommodationCreateSchema,
  type AccommodationCreateFormValues,
} from "~/app/admin/logements/schema";

import { AccommodationTextField } from "@/components/features/accommodations/admin/form/accommodation-text-field";
import { AdminFormSection } from "@/components/layout/admin/admin-form-section";
import { AdminFormSubmitButton } from "@/components/layout/admin/admin-form-submit-button";
import { FieldGroup } from "@/components/ui/field";

const defaultValues: AccommodationCreateFormValues = {
  name: "",
  type: "",
};

export const AccommodationCreateForm = () => {
  const router = useRouter();

  const form = useForm<AccommodationCreateFormValues>({
    resolver: zodResolver(accommodationCreateSchema),
    defaultValues,
    mode: "onSubmit",
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    form.clearErrors("root");

    try {
      const result = await createAccommodation(values);

      if (!result.success) {
        if (result.field) {
          form.setError(result.field, {
            type: "server",
            message: result.message,
          });

          return;
        }

        form.setError("root", {
          type: "server",
          message: result.message,
        });

        return;
      }

      router.push(`/admin/logements/${result.id}/modifier`);
      router.refresh();
    } catch (error) {
      form.setError("root", {
        type: "server",
        message:
          error instanceof Error
            ? error.message
            : "Une erreur est survenue. Veuillez réessayer.",
      });
    }
  });

  return (
    <FormProvider {...form}>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
        {form.formState.errors.root ? (
          <div className="border border-destructive/40 bg-destructive/5 px-4 py-3">
            <p className="text-sm text-destructive">
              {form.formState.errors.root.message}
            </p>
          </div>
        ) : null}

        <AdminFormSection
          title="Informations principales"
          description="Donnez une identité au logement. Vous pourrez ensuite compléter son contenu dans l’éditeur."
        >
          <FieldGroup>
            <div className="grid gap-6 lg:grid-cols-2">
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
          </FieldGroup>
        </AdminFormSection>

        <div className="flex justify-end border-t border-border/60 pt-6">
          <AdminFormSubmitButton
            label="Créer et personnaliser"
            pendingLabel="Création..."
          />
        </div>
      </form>
    </FormProvider>
  );
};
