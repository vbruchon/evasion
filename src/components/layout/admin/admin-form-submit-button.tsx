"use client";

import { LoaderCircle } from "lucide-react";
import { useFormContext } from "react-hook-form";

import { Button } from "@/components/ui/button";

type AdminFormSubmitButtonProps = {
  label: string;
  pendingLabel: string;
  className?: string;
  disabled?: boolean;
};

export const AdminFormSubmitButton = ({
  label,
  pendingLabel,
  className,
  disabled = false,
}: AdminFormSubmitButtonProps) => {
  const {
    formState: { isSubmitting },
  } = useFormContext();

  return (
    <Button
      type="submit"
      disabled={disabled || isSubmitting}
      className={className ?? ""}
    >
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
