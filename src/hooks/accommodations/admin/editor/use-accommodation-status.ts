"use client";

import { useCallback, useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useWatch } from "react-hook-form";
import { useRouter } from "next/navigation";

import { updateAccommodationStatus } from "~/app/admin/logements/action";
import type { AccommodationUpdateFormValues } from "@/lib/admin/accommodation/schema";
import { toast } from "sonner";

type UseAccommodationStatusOptions = {
  accommodationId: string;
  initialStatus: AccommodationUpdateFormValues["status"];
  form: UseFormReturn<AccommodationUpdateFormValues>;
};

export const useAccommodationStatus = ({
  accommodationId,
  initialStatus,
  form,
}: UseAccommodationStatusOptions) => {
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const router = useRouter();

  const status = useWatch({
    control: form.control,
    name: "status",
  });

  const statusChanged = status !== initialStatus;

  const handleStatusChange = useCallback(
    (nextStatus: AccommodationUpdateFormValues["status"]) => {
      form.setValue("status", nextStatus, {
        shouldDirty: true,
        shouldValidate: true,
      });
    },
    [form],
  );

  const handleSaveStatus = useCallback(async () => {
    if (!statusChanged) {
      return;
    }

    form.clearErrors("root");
    setIsUpdatingStatus(true);

    try {
      await updateAccommodationStatus(accommodationId, status);

      toast.success("Statut du logement mis à jour.");
      router.refresh();
    } catch {
      form.setError("root", {
        message: "Une erreur est survenue pendant la modification du statut.",
      });
    } finally {
      setIsUpdatingStatus(false);
    }
  }, [accommodationId, form, router, status, statusChanged]);

  return {
    status,
    statusChanged,
    isUpdatingStatus,
    handleStatusChange,
    handleSaveStatus,
  };
};
