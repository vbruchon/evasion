import { cn } from "@/lib/utils";

type AccommodationStartingPriceProps = {
  startingPrice: number | null | undefined;
  variant?: "card" | "featured" | "hero";
  className?: string;
};

const priceFormatter = new Intl.NumberFormat("fr-FR");

export const AccommodationStartingPrice = ({
  startingPrice,
  variant = "card",
  className,
}: AccommodationStartingPriceProps) => {
  if (startingPrice == null) {
    return null;
  }

  return (
    <p
      className={cn(
        "flex flex-wrap items-baseline gap-x-1.5 gap-y-1",
        variant === "card" && "text-xs",
        variant === "featured" && "text-sm",
        variant === "hero" && "text-sm md:text-base",
        className,
      )}
    >
      <span
        className={cn(
          variant === "hero" ? "text-white/65" : "text-muted-foreground",
        )}
      >
        À partir de
      </span>

      <span
        className={cn(
          "font-medium",
          variant === "card" && "text-sm text-foreground",
          variant === "featured" && "text-base text-foreground",
          variant === "hero" && "text-lg text-white md:text-xl",
        )}
      >
        {priceFormatter.format(startingPrice)} €
      </span>

      <span
        className={cn(
          variant === "hero" ? "text-white/65" : "text-muted-foreground",
        )}
      >
        / nuit
      </span>
    </p>
  );
};
