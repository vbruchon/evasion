import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

import {
  accommodationAccesses,
  getAccommodationAccess,
} from "@/lib/accommodations/accommodation-accesses";

import { AccommodationAccessIcon } from "./accommodation-access-icon";
import type { AccommodationAccessData } from "../accommodation-location.types";

type AccommodationLocationAccessPanelProps = {
  accesses: AccommodationAccessData[];
  editorPreview: boolean;
  active: boolean;
};

export const AccommodationLocationAccessPanel = ({
  accesses,
  editorPreview,
  active,
}: AccommodationLocationAccessPanelProps) => {
  const accessOrder = new Map<string, number>(
    accommodationAccesses.map((access, index) => [access.key, index]),
  );

  const visibleAccesses = accesses
    .flatMap((access) => {
      const definition = getAccommodationAccess(access.key);

      return definition
        ? [
            {
              ...access,
              definition,
            },
          ]
        : [];
    })
    .sort(
      (a, b) =>
        (accessOrder.get(a.key) ?? Number.MAX_SAFE_INTEGER) -
        (accessOrder.get(b.key) ?? Number.MAX_SAFE_INTEGER),
    );

  const hasAccesses = visibleAccesses.length > 0;

  return (
    <div
      data-editor-region={editorPreview ? "access" : undefined}
      className={cn(
        "flex flex-col border-b border-border/60 bg-card/25 px-6 py-6 xl:border-r xl:border-b-0",
        editorPreview &&
          "cursor-pointer transition-shadow hover:ring-1 hover:ring-inset hover:ring-primary/60",
        editorPreview && active && "ring-1 ring-inset ring-primary",
      )}
    >
      {" "}
      <div>
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-primary">
          Accès
        </p>

        <div className="mt-3 h-px w-full bg-border/60">
          <div className="h-px w-5 bg-primary" />
        </div>
      </div>
      {hasAccesses ? (
        <div className="mt-6 space-y-6">
          {visibleAccesses.map((access) => (
            <div key={access.key} className="flex gap-4">
              <AccommodationAccessIcon
                icon={access.definition.icon}
                className="mt-0.5 size-6 shrink-0 text-primary"
              />

              <div className="min-w-0">
                <p className="text-sm font-medium leading-5">
                  {access.definition.label}
                </p>

                {access.details ? (
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    {access.details}
                  </p>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      ) : editorPreview ? (
        <div className="mt-6 border border-dashed border-border/50 px-4 py-8 text-center">
          <p className="text-xs leading-5 text-muted-foreground/50">
            Sélectionnez les informations d’accès.
          </p>
        </div>
      ) : null}
      <div className="mt-auto border-t border-border/60 pt-4">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Info className="size-4 shrink-0 text-primary" />

          <p className="text-[11px]">Localisation approximative</p>
        </div>
      </div>
    </div>
  );
};
