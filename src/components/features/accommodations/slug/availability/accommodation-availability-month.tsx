import type { AccommodationUnavailablePeriodData } from "@/lib/accommodations/availability/accommodation-availability.types";
import {
  formatCalendarDateKey,
  getCalendarMonthCells,
  isCalendarDateUnavailable,
} from "@/lib/accommodations/availability/accommodation-calendar";
import { cn } from "@/lib/utils";

type AccommodationAvailabilityMonthProps = {
  month: Date;
  unavailablePeriods: AccommodationUnavailablePeriodData[];
};

const weekDays = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

export const AccommodationAvailabilityMonth = ({
  month,
  unavailablePeriods,
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

          const unavailable = isCalendarDateUnavailable(
            dateKey,
            unavailablePeriods,
          );

          const isToday = dateKey === todayKey;
          const isPast = dateKey < todayKey;

          return (
            <div
              key={dateKey}
              className="flex h-10 items-center justify-center sm:h-11"
            >
              <span
                className={cn(
                  "flex size-8 items-center justify-center rounded-full text-sm",

                  !unavailable && !isPast && "text-foreground/90",

                  unavailable &&
                    "text-muted-foreground/60 line-through decoration-muted-foreground/70",

                  isPast && !unavailable && "text-muted-foreground/30",

                  isToday &&
                    !unavailable &&
                    "ring-1 ring-primary/80 text-foreground",
                )}
              >
                {day}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
