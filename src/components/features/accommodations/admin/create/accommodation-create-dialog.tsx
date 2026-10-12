"use client";

import { useRouter } from "next/navigation";

import { AccommodationCreateForm } from "@/components/features/accommodations/admin/create/accommodation-create-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const AccommodationCreateDialog = () => {
  const router = useRouter();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      router.back();
    }
  };

  return (
    <Dialog open onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Créer un logement</DialogTitle>

          <DialogDescription>
            Créez votre logement puis personnalisez son contenu dans l’éditeur.
          </DialogDescription>
        </DialogHeader>

        <AccommodationCreateForm variant="dialog" />
      </DialogContent>
    </Dialog>
  );
};
