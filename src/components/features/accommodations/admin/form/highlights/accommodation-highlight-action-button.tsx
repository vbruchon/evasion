import type { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AccommodationHighlightActionButtonProps = {
  icon: LucideIcon;
  label: string;
  disabled?: boolean;
  compact?: boolean;
  destructive?: boolean;
  onClick: () => void;
};

export const AccommodationHighlightActionButton = ({
  icon: Icon,
  label,
  disabled = false,
  compact = false,
  destructive = false,
  onClick,
}: AccommodationHighlightActionButtonProps) => (
  <Button
    type="button"
    variant="ghost"
    size="icon"
    className={cn(
      "text-muted-foreground/70",
      destructive ? "hover:text-destructive" : "hover:text-foreground",
      compact ? "size-7" : "size-8",
    )}
    disabled={disabled}
    aria-label={label}
    onClick={onClick}
  >
    <Icon className="size-3.5" />
  </Button>
);
