"use client";

import { useState } from "react";

import { House } from "lucide-react";
import Image from "next/image";

type AdminDashboardAccommodationThumbnailProps = {
  src: string | null;
  alt: string;
};

export const AdminDashboardAccommodationThumbnail = ({
  src,
  alt,
}: AdminDashboardAccommodationThumbnailProps) => {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div className="flex size-11 shrink-0 items-center justify-center border border-border/50 bg-background/20 text-muted-foreground">
        <House className="size-3.5" />
      </div>
    );
  }

  return (
    <div className="relative size-11 shrink-0 overflow-hidden border border-border/50 bg-background/20">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="44px"
        className="object-cover"
        onError={() => setHasError(true)}
      />
    </div>
  );
};
