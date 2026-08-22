import type {
  Accommodation,
  AccommodationImage,
} from "@/generated/prisma/client";

import { AccommodationAdminMobileCard } from "./accommodation-admin-mobile-card";

type AccommodationWithImages = Accommodation & {
  images: AccommodationImage[];
};

type AccommodationsAdminMobileListProps = {
  accommodations: AccommodationWithImages[];
};

export const AccommodationsAdminMobileList = ({
  accommodations,
}: AccommodationsAdminMobileListProps) => {
  return (
    <div className="space-y-3 md:hidden">
      {accommodations.map((accommodation) => (
        <AccommodationAdminMobileCard
          key={accommodation.id}
          accommodation={accommodation}
        />
      ))}
    </div>
  );
};
