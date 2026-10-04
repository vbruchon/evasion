"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";

import { ContactPageInteractive } from "@/components/features/contact/contact-page-interactive";
import { ContactPagePanel } from "@/components/features/contact/contact-page-panel";
import { ContactPageVisual } from "@/components/features/contact/contact-page-visual";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import type { ContactPageContentValues } from "@/lib/contact/contact-page.schema";
import type { ContactPageAccommodation } from "@/lib/contact/queries/get-contact-page-accommodations";

type ContactModalProps = {
  content: ContactPageContentValues;
  accommodations: ContactPageAccommodation[];
};

export const ContactModal = ({
  content,
  accommodations,
}: ContactModalProps) => {
  const router = useRouter();

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) {
          router.back();
        }
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="
          h-[min(92svh,900px)]
          w-[calc(100vw-1.5rem)]
          max-w-none
          gap-0
          overflow-hidden
          border-border/60
          bg-background
          p-0
          shadow-2xl
          duration-300
          ease-[cubic-bezier(0.22,1,0.36,1)]
          sm:w-[min(94vw,1440px)]
          sm:max-w-none
          data-open:zoom-in-[0.985]
          data-closed:zoom-out-[0.985]
        "
      >
        <DialogTitle className="sr-only">Nous contacter</DialogTitle>

        <DialogDescription className="sr-only">
          Envoyez-nous votre demande concernant un logement ou toute autre
          question.
        </DialogDescription>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Fermer"
          onClick={() => router.back()}
          className="absolute right-4 top-4 z-40 border border-border/60 bg-background/75 backdrop-blur-md transition-colors duration-300 hover:bg-background"
        >
          <X className="size-4" />
        </Button>

        <div className="grid h-full min-h-0 lg:grid-cols-[minmax(340px,0.9fr)_minmax(0,1.1fr)]">
          <ContactPageVisual
            eyebrow={content.eyebrow}
            handwritten={content.handwritten}
            title={content.title}
            description={content.description}
            reassuranceFirstLabel={content.reassuranceFirstLabel}
            reassuranceSecondLabel={content.reassuranceSecondLabel}
            reassuranceThirdLabel={content.reassuranceThirdLabel}
            variant="modal"
            animated
          />

          <ContactPagePanel variant="modal" animated>
            <ContactPageInteractive
              content={content}
              accommodations={accommodations}
              animated
            />
          </ContactPagePanel>
        </div>
      </DialogContent>
    </Dialog>
  );
};
