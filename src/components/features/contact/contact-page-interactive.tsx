"use client";

import { useState } from "react";

import { ContactPageForm } from "@/components/features/contact/contact-page-form";
import { ContactRequestSuccess } from "@/components/features/contact/contact-request-success";
import type { ContactPageContentValues } from "@/lib/contact/contact-page.schema";
import type { ContactPageAccommodation } from "@/lib/contact/queries/get-contact-page-accommodations";

type ContactPageInteractiveProps = {
  content: ContactPageContentValues;
  accommodations: ContactPageAccommodation[];
};

export const ContactPageInteractive = ({
  content,
  accommodations,
}: ContactPageInteractiveProps) => {
  const [submitted, setSubmitted] = useState(false);

  return submitted ? (
    <ContactRequestSuccess
      eyebrow={content.successEyebrow}
      title={content.successTitle}
      description={content.successDescription}
      onReset={() => setSubmitted(false)}
    />
  ) : (
    <ContactPageForm
      accommodations={accommodations}
      formTitle={content.formTitle}
      submitLabel={content.submitLabel}
      onSuccess={() => setSubmitted(true)}
    />
  );
};
