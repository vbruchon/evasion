import { AlertCircle, Loader2 } from "lucide-react";

import { AccommodationEditorRegion } from "@/components/features/accommodations/admin/editor/accommodation-editor-region";
import type { AccommodationAvailabilityEditorSection } from "@/lib/admin/accommodation/editor-sections";
import type { AccommodationUnavailablePeriodData } from "@/lib/accommodations/availability/accommodation-availability.types";

import { AccommodationAvailabilityCalendar } from "./accommodation-availability-calendar";

type AccommodationAvailabilityProps = {
  unavailablePeriods: AccommodationUnavailablePeriodData[];
  hasCalendar: boolean;
  availabilityTitle: string;
  availabilityDescription: string;
  bookingButtonLabel: string;
  bookingUrl?: string | null;
  activeEditorRegion?: AccommodationAvailabilityEditorSection;
  editorPreview?: boolean;
  loading?: boolean;
  error?: string | null;
};

export const AccommodationAvailability = ({
  unavailablePeriods,
  hasCalendar,
  availabilityTitle,
  availabilityDescription,
  bookingButtonLabel,
  bookingUrl = null,
  activeEditorRegion,
  editorPreview = false,
  loading = false,
  error = null,
}: AccommodationAvailabilityProps) => {
  if (!hasCalendar && !editorPreview) {
    return null;
  }

  return (
    <section
      id="disponibilites"
      className="scroll-mt-20 border-b border-border/60 px-6 py-16 md:px-12 lg:px-20 lg:py-20 xl:px-24"
    >
      <div className="mx-auto grid max-w-420 gap-12 xl:grid-cols-[0.7fr_1.8fr] xl:gap-20">
        <div className="xl:pt-4">
          <p className="section-eyebrow text-primary/85">Disponibilités</p>

          <AccommodationEditorRegion
            region="content"
            activeRegion={activeEditorRegion}
            className="-m-3 mt-1 p-3"
          >
            <h2 className="mt-4 max-w-lg font-heading text-4xl leading-[1.03] tracking-[-0.035em] md:text-5xl xl:text-[3.4rem]">
              {availabilityTitle}
            </h2>

            <p className="mt-5 max-w-md text-sm leading-7 text-muted-foreground">
              {availabilityDescription}
            </p>
          </AccommodationEditorRegion>

          <div className="mt-8 h-px w-12 bg-primary/60" />

          {hasCalendar && !loading && !error ? (
            <p className="mt-7 max-w-xs text-xs leading-6 text-muted-foreground/70">
              Les dates barrées ne sont plus disponibles à la réservation.
            </p>
          ) : null}
        </div>

        <AccommodationEditorRegion
          region="calendar"
          activeRegion={activeEditorRegion}
          className="min-w-0"
        >
          {!hasCalendar ? (
            <div className="flex min-h-64 items-center justify-center border-y border-dashed border-border/50 px-6 text-center">
              <p className="max-w-sm text-sm leading-6 text-muted-foreground/60">
                Renseignez un calendrier iCal pour afficher les disponibilités
                du logement.
              </p>
            </div>
          ) : null}

          {hasCalendar && loading ? (
            <div className="flex min-h-64 items-center justify-center border-y border-border/50">
              <div className="flex flex-col items-center gap-3 text-muted-foreground">
                <Loader2 className="size-5 animate-spin text-primary" />

                <p className="text-sm">Chargement des disponibilités...</p>
              </div>
            </div>
          ) : null}

          {hasCalendar && !loading && error ? (
            <div className="flex min-h-64 items-center justify-center border-y border-border/50 px-6">
              <div className="flex max-w-md gap-3">
                <AlertCircle className="mt-0.5 size-4 shrink-0 text-destructive" />

                <div>
                  <p className="text-sm font-medium">
                    Disponibilités indisponibles
                  </p>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {editorPreview
                      ? error
                      : "Le calendrier est momentanément indisponible. Réessayez un peu plus tard."}
                  </p>
                </div>
              </div>
            </div>
          ) : null}

          {hasCalendar && !loading && !error ? (
            <AccommodationAvailabilityCalendar
              unavailablePeriods={unavailablePeriods}
              bookingUrl={bookingUrl}
              bookingButtonLabel={bookingButtonLabel}
              editorPreview={editorPreview}
            />
          ) : null}
        </AccommodationEditorRegion>
      </div>
    </section>
  );
};
