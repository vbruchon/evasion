import type { ComponentProps } from "react";
import type { LucideIcon } from "lucide-react";
import { LoaderCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

type AccommodationEditorHeaderActionButtonProps = {
  icon: LucideIcon;
  label: string;
  pendingLabel: string;
  ariaLabel?: string;
  pending?: boolean;
  disabled?: boolean;
  variant?: ComponentProps<typeof Button>["variant"];
  onClick: () => void;
};

export const AccommodationEditorHeaderActionButton = ({
  icon: Icon,
  label,
  pendingLabel,
  ariaLabel,
  pending = false,
  disabled = false,
  variant,
  onClick,
}: AccommodationEditorHeaderActionButtonProps) => {
  const CurrentIcon = pending ? LoaderCircle : Icon;
  const currentLabel = pending ? pendingLabel : label;

  return (
    <>
      <Button
        type="button"
        variant={variant}
        size="icon"
        className="sm:hidden"
        disabled={disabled}
        aria-label={pending ? pendingLabel : (ariaLabel ?? label)}
        onClick={onClick}
      >
        <CurrentIcon className={pending ? "animate-spin" : undefined} />
      </Button>

      <Button
        type="button"
        variant={variant}
        className="hidden sm:inline-flex"
        disabled={disabled}
        onClick={onClick}
      >
        <CurrentIcon className={pending ? "animate-spin" : undefined} />
        {currentLabel}
      </Button>
    </>
  );
};
