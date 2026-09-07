"use client";

import type { ReactNode } from "react";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

type AccommodationLocationMapDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
};

export const AccommodationLocationMapDialog = ({
  open,
  onOpenChange,
  children,
}: AccommodationLocationMapDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="
          h-dvh! w-screen!
          max-w-none!
          gap-0
          overflow-hidden
          rounded-none!
          border-0!
          bg-[#080906]!
          p-0!

          md:h-[90dvh]!
          md:w-[94vw]!
          md:max-w-[1600px]!
          md:rounded-2xl!
          md:border!
          md:border-primary/20!
          md:shadow-2xl!
        "
      >
        <DialogTitle className="sr-only">Carte de localisation</DialogTitle>

        {children}

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="
            absolute right-4 top-4 z-1000
            size-10
            rounded-md
            border border-primary/25
            bg-[#080906]/90
            text-foreground/80
            shadow-lg
            backdrop-blur-md
            transition-colors
            hover:border-primary/55
            hover:bg-[#11100c]
            hover:text-primary
            md:right-5 md:top-5
          "
          aria-label="Fermer la carte"
          onClick={() => onOpenChange(false)}
        >
          <X className="size-4" />
        </Button>
      </DialogContent>
    </Dialog>
  );
};
