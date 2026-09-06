"use client";

import {
  accommodationAccesses,
  MAX_ACCOMMODATION_ACCESSES,
} from "@/lib/accommodations/accommodation-accesses";

import { AccommodationEditorSectionContent } from "../accommodation-editor-section-content";
import { AccommodationAccessItem } from "./accommodation-access-item";
import { useAccommodationAccessesEditor } from "@/hooks/use-accommodation-accesses-editor";

type AccommodationAccessesEditorProps = {
  disabled?: boolean;
};

export const AccommodationAccessesEditor = ({
  disabled = false,
}: AccommodationAccessesEditorProps) => {
  const {
    accesses,
    selectedAccesses,
    selectionLimitReached,
    handleToggle,
    handleDetailsChange,
  } = useAccommodationAccessesEditor({
    disabled,
  });

  return (
    <AccommodationEditorSectionContent>
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
          Arrivée & accès
        </p>

        <p className="mt-1 text-xs leading-5 text-muted-foreground">
          Sélectionnez les informations utiles pour rejoindre le logement et y
          accéder.
        </p>

        <p className="mt-2 text-xs text-muted-foreground">
          {accesses.length} / {MAX_ACCOMMODATION_ACCESSES} sélectionnés
        </p>
      </div>

      <div className="space-y-3">
        {accommodationAccesses.map((access) => (
          <AccommodationAccessItem
            key={access.key}
            access={access}
            selectedAccess={selectedAccesses.get(access.key)}
            disabled={disabled}
            selectionLimitReached={selectionLimitReached}
            onToggle={handleToggle}
            onDetailsChange={handleDetailsChange}
          />
        ))}
      </div>
    </AccommodationEditorSectionContent>
  );
};
