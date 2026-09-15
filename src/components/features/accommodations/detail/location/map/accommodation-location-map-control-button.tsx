import type { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AccommodationLocationMapControlButtonProps = {
  icon: LucideIcon;
  label: string;
  separated?: boolean;
  onClick: () => void;
};

export const AccommodationLocationMapControlButton = ({
  icon: Icon,
  label,
  separated = false,
  onClick,
}: AccommodationLocationMapControlButtonProps) => (
  <Button
    type="button"
    variant="ghost"
    size="icon"
    className={cn(
      "size-10 rounded-none text-foreground/80 transition-colors hover:bg-primary/10 hover:text-primary",
      separated && "border-b border-primary/15",
    )}
    aria-label={label}
    onClick={onClick}
  >
    <Icon className="size-4" />
  </Button>
);
