import type {
  Accommodation,
  AccommodationImage,
} from "@/generated/prisma/client";
import Image from "next/image";

type AccommodationAdminIdentityProps = {
  accommodation: Accommodation & {
    images: AccommodationImage[];
  };
};

export const AccommodationAdminIdentity = ({
  accommodation,
}: AccommodationAdminIdentityProps) => {
  const coverImage =
    accommodation.images.find((image) => image.isCover) ??
    accommodation.images[0];

  return (
    <div className="flex min-w-72 items-center gap-4">
      <div className="relative size-22 shrink-0 overflow-hidden rounded-sm bg-muted">
        {coverImage ? (
          <Image
            src={coverImage.url}
            alt={coverImage.alt ?? accommodation.name}
            fill
            sizes="200px"
            className="object-cover"
          />
        ) : (
          <div className="flex size-full items-center justify-center px-2 text-center text-xs text-muted-foreground">
            Photo à venir
          </div>
        )}
      </div>

      <div className="min-w-0">
        <p className="truncate text-lg font-medium text-foreground">
          {accommodation.name}
        </p>

        {accommodation.type ? (
          <p className="mt-1 truncate text-sm text-muted-foreground">
            {accommodation.type}
          </p>
        ) : null}
      </div>
    </div>
  );
};
