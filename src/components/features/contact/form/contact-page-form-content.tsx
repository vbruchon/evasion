"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useFormContext, useWatch } from "react-hook-form";

import { ContactAccommodationPicker } from "@/components/features/contact/form/contact-accommodation-picker";
import { ContactFormTextField } from "@/components/features/contact/form/contact-form-text-field";
import { ContactSubjectSelector } from "@/components/features/contact/form/contact-subject-selector";
import { AdminEditorRegion } from "@/components/layout/admin/editor/admin-editor-region";
import { Button } from "@/components/ui/button";
import type { ContactPageFormEditorRegion } from "@/lib/admin/contact/editor/editor-sections";
import type { ContactPageContentValues } from "@/lib/contact/contact-page.schema";
import type { ContactPageAccommodation } from "@/lib/contact/queries/get-contact-page-accommodations";
import type { ContactRequestValues } from "@/lib/contact/contact-request.schema";
import { cn } from "@/lib/utils";

type ContactPageFormContentProps = {
  accommodations: ContactPageAccommodation[];
  content: ContactPageContentValues;
  preview?: boolean;
  activeEditorRegion?: ContactPageFormEditorRegion;
  securityReady?: boolean;
};

export const ContactPageFormContent = ({
  accommodations,
  content,
  preview = false,
  activeEditorRegion,
  securityReady = true,
}: ContactPageFormContentProps) => {
  const form = useFormContext<ContactRequestValues>();

  const hasAccommodations = accommodations.length > 0;

  const subject = useWatch({
    control: form.control,
    name: "subject",
  });

  return (
    <>
      <AdminEditorRegion
        region="presentation"
        activeRegion={preview ? activeEditorRegion : undefined}
      >
        <h2 className="max-w-xl font-heading text-2xl leading-tight tracking-[-0.03em] lg:text-[1.75rem]">
          {content.formTitle}
        </h2>

        <div className={cn(preview && "pointer-events-none")}>
          <ContactSubjectSelector
            hasAccommodations={hasAccommodations}
            accommodationTitle={content.accommodationSubjectTitle}
            accommodationDescription={content.accommodationSubjectDescription}
            otherTitle={content.otherSubjectTitle}
            otherDescription={content.otherSubjectDescription}
            preview={preview}
          />

          {preview ? (
            subject === "ACCOMMODATION" ? (
              <ContactAccommodationPicker
                accommodations={accommodations}
                label={content.accommodationLabel}
                preview
              />
            ) : null
          ) : (
            <AnimatePresence initial={false}>
              {subject === "ACCOMMODATION" ? (
                <motion.div
                  key="accommodation-picker"
                  initial={{
                    opacity: 0,
                    height: 0,
                    y: -8,
                  }}
                  animate={{
                    opacity: 1,
                    height: "auto",
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    height: 0,
                    y: -6,
                  }}
                  transition={{
                    height: {
                      duration: 0.45,
                      ease: [0.22, 1, 0.36, 1],
                    },
                    opacity: {
                      duration: 0.3,
                    },
                    y: {
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  }}
                  className="overflow-hidden"
                >
                  <ContactAccommodationPicker
                    accommodations={accommodations}
                    label={content.accommodationLabel}
                  />
                </motion.div>
              ) : null}
            </AnimatePresence>
          )}
        </div>
      </AdminEditorRegion>

      <AdminEditorRegion
        region="fields"
        activeRegion={preview ? activeEditorRegion : undefined}
        className="mt-10"
      >
        <div className={cn(preview && "pointer-events-none")}>
          <div className="grid gap-6 sm:grid-cols-2">
            <ContactFormTextField
              name="firstName"
              label={content.firstNameLabel}
              optional
              autoComplete="given-name"
              placeholder={content.firstNamePlaceholder}
              inputClassName="h-12"
            />

            <ContactFormTextField
              name="email"
              label={content.emailLabel}
              type="email"
              autoComplete="email"
              placeholder={content.emailPlaceholder}
              inputClassName="h-12"
            />
          </div>

          <ContactFormTextField
            name="message"
            label={content.messageLabel}
            multiline
            placeholder={content.messagePlaceholder}
            className="mt-7"
            inputClassName="min-h-32"
          />
        </div>
      </AdminEditorRegion>

      {form.formState.errors.root ? (
        <div className="mt-6 border border-destructive/40 bg-destructive/5 px-4 py-3">
          <p className="text-sm text-destructive">
            {form.formState.errors.root.message}
          </p>
        </div>
      ) : null}

      <AdminEditorRegion
        region="submit"
        activeRegion={preview ? activeEditorRegion : undefined}
        className="mt-7"
      >
        <div className={cn(preview && "pointer-events-none")}>
          <Button
            type="submit"
            size="lg"
            aria-busy={form.formState.isSubmitting}
            disabled={
              form.formState.isSubmitting || (!preview && !securityReady)
            }
            className="h-13 w-full"
          >
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Envoi en cours...
              </>
            ) : (
              <>
                {content.submitLabel}
                <ArrowRight data-icon="inline-end" />
              </>
            )}
          </Button>
        </div>
      </AdminEditorRegion>

      {!preview ? (
        <p className="mt-3 text-xs leading-5 text-muted-foreground">
          Les informations transmises sont utilisées uniquement pour répondre à
          votre demande.{" "}
          <Link
            href="/politique-de-confidentialite"
            className="text-foreground underline underline-offset-4 transition-colors hover:text-primary"
          >
            En savoir plus
          </Link>
          .
        </p>
      ) : null}
    </>
  );
};
