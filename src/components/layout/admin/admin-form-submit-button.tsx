"use client";

import { LoaderCircle } from "lucide-react";
import { useFormContext } from "react-hook-form";

import { Button } from "@/components/ui/button";

type AdminFormSubmitButtonProps = {
  label: string;
  pendingLabel: string;
  className?: string;
};

export const AdminFormSubmitButton = ({
  label,
  pendingLabel,
  className,
}: AdminFormSubmitButtonProps) => {
  const {
    formState: { isSubmitting },
  } = useFormContext();

  return (
    <Button type="submit" disabled={isSubmitting} className={className ?? ""}>
      {isSubmitting ? (
        <>
          <LoaderCircle className="animate-spin" />
          {pendingLabel}
        </>
      ) : (
        label
      )}
    </Button>
  );
};
