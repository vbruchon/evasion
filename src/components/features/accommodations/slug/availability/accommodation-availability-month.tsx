import type { AccommodationUnavailablePeriodData } from "@/lib/accommodations/availability/accommodation-availability.types";
import {
  formatCalendarDateKey,
  getCalendarDayState,
  getCalendarMonthCells,
} from "@/lib/accommodations/availability/accommodation-calendar";
import { cn } from "@/lib/utils";

type AccommodationAvailabilityMonthProps = {
  month: Date;
  unavailablePeriods: AccommodationUnavailablePeriodData[];
  checkIn?: string | null;
  checkOut?: string | null;
  interactive?: boolean;
  onDateSelect?: (date: string) => void;
};

const weekDays = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

export const AccommodationAvailabilityMonth = ({
  month,
  unavailablePeriods,
  checkIn = null,
  checkOut = null,
  interactive = false,
  onDateSelect,
}: AccommodationAvailabilityMonthProps) => {
  const year = month.getFullYear();
  const monthIndex = month.getMonth();

  const cells = getCalendarMonthCells(month);

  const today = new Date();

  const todayKey = formatCalendarDateKey(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );

  const monthLabel = new Intl.DateTimeFormat("fr-FR", {
    month: "long",
  }).format(month);

  return (
    <div className="min-w-0 px-3 sm:px-6 lg:px-8">
      <div className="mb-7 flex items-baseline justify-center gap-2">
        <h3 className="font-heading text-xl capitalize tracking-[-0.01em] text-foreground">
          {monthLabel}
        </h3>

        <span className="text-xs text-primary/55">{year}</span>
      </div>

      <div className="grid grid-cols-7">
        {weekDays.map((day) => (
          <div
            key={day}
            className="pb-4 text-center text-[9px] font-medium uppercase tracking-[0.18em] text-muted-foreground/50"
          >
            {day}
          </div>
        ))}

        {cells.map((day, index) => {
          if (day === null) {
            return <div key={`empty-${index}`} className="h-10 sm:h-11" />;
          }

          const dateKey = formatCalendarDateKey(year, monthIndex, day);

          const {
            unavailable,
            isToday,
            isPast,
            isCheckIn,
            isCheckOut,
            isInSelectedRange,
            isSelectedRange,
            isFirstColumn,
            isLastColumn,
            selectable,
          } = getCalendarDayState({
            date: dateKey,
            index,
            today: todayKey,
            checkIn,
            checkOut,
            unavailablePeriods,
            interactive,
          });

          const dayClassName = cn(
            "relative z-10 flex size-8 items-center justify-center rounded-full text-sm transition-colors",

            !unavailable && !isPast && !isSelectedRange && "text-foreground/90",

            unavailable &&
              "text-muted-foreground/60 line-through decoration-muted-foreground/70",

            isPast &&
              !unavailable &&
              !isSelectedRange &&
              "text-muted-foreground/30",

            isToday &&
              !isSelectedRange &&
              "ring-1 ring-primary/80 text-foreground",

            isInSelectedRange && "text-foreground",

            (isCheckIn || isCheckOut) && "bg-primary text-primary-foreground",

            selectable &&
              !isSelectedRange &&
              "cursor-pointer hover:bg-primary/10 hover:text-primary",
          );

          return (
            <div
              key={dateKey}
              className="relative flex h-10 items-center justify-center sm:h-11"
            >
              {checkIn && checkOut && isCheckIn && !isLastColumn ? (
                <span className="pointer-events-none absolute left-1/2 right-0 h-8 bg-primary/8" />
              ) : null}

              {checkIn && checkOut && isInSelectedRange ? (
                <span
                  className={cn(
                    "pointer-events-none absolute inset-x-0 h-8 bg-primary/8",
                    isFirstColumn && "rounded-l-full",
                    isLastColumn && "rounded-r-full",
                  )}
                />
              ) : null}

              {checkIn && checkOut && isCheckOut && !isFirstColumn ? (
                <span className="pointer-events-none absolute left-0 right-1/2 h-8 bg-primary/8" />
              ) : null}

              {interactive ? (
                <button
                  type="button"
                  disabled={!selectable}
                  aria-label={`${day} ${monthLabel} ${year}`}
                  onClick={() => onDateSelect?.(dateKey)}
                  className={dayClassName}
                >
                  {day}
                </button>
              ) : (
                <span className={dayClassName}>{day}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
