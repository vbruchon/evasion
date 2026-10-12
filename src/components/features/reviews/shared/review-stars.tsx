import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

type ReviewStarsProps = {
  rating: number;
  className?: string;
  starClassName?: string;
  decorative?: boolean;
};

export const ReviewStars = ({
  rating,
  className,
  starClassName,
  decorative = false,
}: ReviewStarsProps) => {
  const filledStars = Math.round(rating);

  const formattedRating = Number.isInteger(rating)
    ? String(rating)
    : rating.toFixed(1).replace(".", ",");

  return (
    <div
      className={cn("flex items-center gap-1 text-primary", className)}
      role={decorative ? undefined : "img"}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : `${formattedRating} étoiles sur 5`}
    >
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          className={cn("size-3.5", starClassName)}
          fill={index < filledStars ? "currentColor" : "none"}
          strokeWidth={1.4}
        />
      ))}
    </div>
  );
};
