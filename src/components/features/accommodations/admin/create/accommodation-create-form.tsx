"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

import { createAccommodation } from "~/app/admin/logements/action";
import {
  accommodationCreateSchema,
  type AccommodationCreateFormValues,
} from "@/lib/admin/accommodation/schema";

import { AccommodationTextField } from "@/components/features/accommodations/admin/form/accommodation-text-field";
import { AdminFormSection } from "@/components/layout/admin/admin-form-section";
import { AdminFormSubmitButton } from "@/components/layout/admin/admin-form-submit-button";
import { FieldGroup } from "@/components/ui/field";
import { cn } from "@/lib/utils";

const defaultValues: AccommodationCreateFormValues = {
  name: "",
  type: "",
};

type AccommodationCreateFormProps = {
  variant?: "page" | "dialog";
};

export const AccommodationCreateForm = ({
  variant = "page",
}: AccommodationCreateFormProps) => {
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

      toast.success("Logement créé.");

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

  const fields = (
    <FieldGroup>
      <div className="grid gap-6 sm:grid-cols-2">
        <AccommodationTextField
          name="name"
          label="Nom du logement"
          placeholder="Ex : La Cabane"
        />

        <AccommodationTextField
          name="type"
          label="Type de logement"
          placeholder="Ex : Dôme panoramique"
        />
      </div>
    </FieldGroup>
  );

  return (
    <FormProvider {...form}>
      <form
        className={cn(variant === "page" ? "mt-8 space-y-6" : "mt-1 space-y-5")}
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

        {variant === "page" ? (
          <AdminFormSection
            title="Informations principales"
            description="Donnez une identité au logement. Vous pourrez ensuite compléter son contenu dans l’éditeur."
          >
            {fields}
          </AdminFormSection>
        ) : (
          fields
        )}

        <div
          className={cn(
            "flex border-t border-border/60 pt-5",
            variant === "page"
              ? "justify-end"
              : "justify-stretch sm:justify-end",
          )}
        >
          <AdminFormSubmitButton
            label="Créer et personnaliser"
            pendingLabel="Création..."
            className={variant === "dialog" ? "w-full sm:w-auto" : undefined}
          />
        </div>
      </form>
    </FormProvider>
  );
};
