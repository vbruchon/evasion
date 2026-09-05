import { Bath, BedDouble, DoorOpen, Ruler, Users } from "lucide-react";

import type { AccommodationKeyDetailsData } from "@/lib/accommodations/accommodation-types";

type AccommodationKeyDetailsProps = {
  accommodationDetails: AccommodationKeyDetailsData;
  editorPreview?: boolean;
};

const DETAILS = [
  {
    id: "guestCapacity",
    icon: Users,
    singular: "voyageur",
    plural: "voyageurs",
  },
  {
    id: "bedrooms",
    icon: DoorOpen,
    singular: "chambre",
    plural: "chambres",
  },
  {
    id: "beds",
    icon: BedDouble,
    singular: "lit",
    plural: "lits",
  },
  {
    id: "bathrooms",
    icon: Bath,
    singular: "salle de bain",
    plural: "salles de bain",
  },
  {
    id: "surface",
    icon: Ruler,
    singular: "m²",
    plural: "m²",
  },
] as const;

export const AccommodationKeyDetails = ({
  accommodationDetails,
  editorPreview = false,
}: AccommodationKeyDetailsProps) => {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-4 md:flex md:flex-wrap md:items-center md:gap-x-8 lg:gap-x-10 xl:gap-x-12">
      {DETAILS.map(({ id, icon: Icon, singular, plural }) => {
        const value = accommodationDetails[id];

        if (value == null && !editorPreview) {
          return null;
        }

        const label = value === 1 ? singular : plural;

        return (
          <div key={id} className="flex items-center gap-2 lg:gap-2.5">
            <Icon className="size-6 shrink-0 text-primary" strokeWidth={1.5} />

            <span className="text-base lg:text-lg">
              <span
                className={
                  value == null
                    ? "font-medium text-foreground/45"
                    : "font-medium text-foreground"
                }
              >
                {value ?? "—"}
              </span>{" "}
              <span
                className={
                  value == null ? "text-foreground/45" : "text-foreground/75"
                }
              >
                {label}
              </span>
            </span>
          </div>
        );
      })}
    </div>
  );
};
