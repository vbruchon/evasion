import { ArrowUpRight, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  buildAccommodationBookingUrl,
  getAccommodationBookingNights,
} from "@/lib/accommodations/booking/accommodation-booking";

type AccommodationAvailabilityBookingProps = {
  bookingUrl: string;
  bookingButtonLabel: string;
  checkIn: string | null;
  checkOut: string | null;
  editorPreview?: boolean;
  onReset: () => void;
};

const formatBookingDate = (date: string) => {
  const [year, month, day] = date.split("-").map(Number);

  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "short",
  }).format(new Date(Date.UTC(year, month - 1, day)));
};

export const AccommodationAvailabilityBooking = ({
  bookingUrl,
  bookingButtonLabel,
  checkIn,
  checkOut,
  editorPreview = false,
  onReset,
}: AccommodationAvailabilityBookingProps) => {
  const nights =
    checkIn && checkOut
      ? getAccommodationBookingNights(checkIn, checkOut)
      : null;

  const bookingHref =
    checkIn && checkOut
      ? buildAccommodationBookingUrl(bookingUrl, checkIn, checkOut)
      : null;

  return (
    <div className="border-t border-border/40 px-5 py-5 sm:px-7">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 items-center gap-6 sm:gap-10">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground/50">
              Arrivée
            </p>

            <p className="mt-1 text-sm font-medium text-foreground">
              {checkIn ? formatBookingDate(checkIn) : "À choisir"}
            </p>
          </div>

          <div className="h-8 w-px bg-border/50" />

          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground/50">
              Départ
            </p>

            <p className="mt-1 text-sm font-medium text-foreground">
              {checkOut ? formatBookingDate(checkOut) : "À choisir"}
            </p>
          </div>

          {nights ? (
            <>
              <div className="hidden h-8 w-px bg-border/50 sm:block" />

              <p className="hidden text-xs text-muted-foreground sm:block">
                {nights} nuit{nights > 1 ? "s" : ""}
              </p>
            </>
          ) : null}
        </div>

        <div className="flex items-center gap-2">
          {checkIn && !editorPreview ? (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Effacer les dates sélectionnées"
              onClick={onReset}
              className="border border-border/50 text-muted-foreground transition-colors hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
            >
              <RotateCcw className="size-4" />
            </Button>
          ) : null}

          {editorPreview ? (
            <div className="inline-flex h-10 items-center justify-center gap-2 border border-input bg-background px-5 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
              {bookingButtonLabel}
              <ArrowUpRight className="size-3.5" />
            </div>
          ) : bookingHref ? (
            <a
              href={bookingHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center justify-center gap-2 border border-primary bg-primary px-6 text-xs font-medium uppercase tracking-[0.12em] text-primary-foreground shadow-[0_6px_24px_-10px_rgba(184,134,55,0.55)] transition-[background-color,transform] duration-200 hover:bg-primary/90 active:translate-y-px"
            >
              {bookingButtonLabel}
              <ArrowUpRight className="size-3.5" />
            </a>
          ) : (
            <Button
              type="button"
              variant="outline"
              disabled
              className="h-10 px-5 text-xs font-medium uppercase tracking-[0.12em]"
            >
              {bookingButtonLabel}
              <ArrowUpRight className="size-3.5" />
            </Button>
          )}
        </div>
      </div>

      {!checkIn ? (
        <p className="mt-4 text-xs leading-5 text-muted-foreground/60">
          Sélectionnez votre date d’arrivée dans le calendrier.
        </p>
      ) : null}

      {checkIn && !checkOut ? (
        <p className="mt-4 text-xs leading-5 text-muted-foreground/60">
          Sélectionnez maintenant votre date de départ.
        </p>
      ) : null}
    </div>
  );
};
