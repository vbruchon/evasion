"use client";

import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { useRef, useState } from "react";
import { FormProvider } from "react-hook-form";

import { ContactPageFormContent } from "@/components/features/contact/form/contact-page-form-content";
import { useContactRequestForm } from "@/hooks/contact/use-contact-request-form";
import type { ContactPageContentValues } from "@/lib/contact/contact-page.schema";
import type { ContactPageAccommodation } from "@/lib/contact/queries/get-contact-page-accommodations";

type ContactPageFormProps = {
  content: ContactPageContentValues;
  accommodations: ContactPageAccommodation[];
  onSuccess: () => void;
};

export const ContactPageForm = ({
  content,
  accommodations,
  onSuccess,
}: ContactPageFormProps) => {
  const hasAccommodations = accommodations.length > 0;

  const turnstileRef = useRef<TurnstileInstance>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const resetTurnstile = () => {
    setTurnstileToken(null);
    turnstileRef.current?.reset();
  };

  const { form, handleSubmit } = useContactRequestForm({
    hasAccommodations,
    turnstileToken,
    onSuccess,
    onSecurityReset: resetTurnstile,
  });

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit} noValidate>
        <ContactPageFormContent
          content={content}
          accommodations={accommodations}
          securityReady={Boolean(turnstileToken)}
        />

        {siteKey ? (
          <div className="mt-4">
            <Turnstile
              ref={turnstileRef}
              siteKey={siteKey}
              options={{
                appearance: "interaction-only",
                theme: "dark",
                language: "fr",
              }}
              onSuccess={(token) => {
                setTurnstileToken(token);
              }}
              onExpire={() => {
                setTurnstileToken(null);
              }}
              onError={() => {
                setTurnstileToken(null);
              }}
            />
          </div>
        ) : null}
      </form>
    </FormProvider>
  );
};
