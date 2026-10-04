"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { ContactPageForm } from "@/components/features/contact/contact-page-form";
import { ContactRequestSuccess } from "@/components/features/contact/contact-request-success";
import type { ContactPageContentValues } from "@/lib/contact/contact-page.schema";
import type { ContactPageAccommodation } from "@/lib/contact/queries/get-contact-page-accommodations";

type ContactPageInteractiveProps = {
  content: ContactPageContentValues;
  accommodations: ContactPageAccommodation[];
  animated?: boolean;
};

export const ContactPageInteractive = ({
  content,
  accommodations,
  animated = false,
}: ContactPageInteractiveProps) => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={submitted ? "success" : "form"}
        initial={animated ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        exit={animated ? { opacity: 0 } : undefined}
        transition={{
          duration: 0.3,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {submitted ? (
          <ContactRequestSuccess
            eyebrow={content.successEyebrow}
            title={content.successTitle}
            description={content.successDescription}
            resetLabel={content.successResetLabel}
            onReset={() => setSubmitted(false)}
          />
        ) : (
          <ContactPageForm
            content={content}
            accommodations={accommodations}
            onSuccess={() => setSubmitted(true)}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
};
