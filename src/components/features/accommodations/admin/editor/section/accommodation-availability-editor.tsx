"use client";

import { useState } from "react";
import { useWatch, useFormContext } from "react-hook-form";
import {
  AlertCircle,
  CalendarCheck,
  CheckCircle2,
  Loader2,
} from "lucide-react";

import { checkAccommodationAvailabilityCalendar } from "~/app/admin/logements/action";
import type { AccommodationUpdateFormValues } from "~/app/admin/logements/schema";

import { Button } from "@/components/ui/button";

import { AccommodationTextField } from "../../form/accommodation-text-field";
import { AccommodationEditorSectionContent } from "./accommodation-editor-section-content";

type AccommodationAvailabilityEditorProps = {
  disabled?: boolean;
};

type CalendarCheckResult =
  | {
      url: string;
      success: true;
      unavailablePeriodsCount: number;
    }
  | {
      url: string;
      success: false;
      message: string;
    };

export const AccommodationAvailabilityEditor = ({
  disabled = false,
}: AccommodationAvailabilityEditorProps) => {
  const { control } = useFormContext<AccommodationUpdateFormValues>();

  const calendarUrl = useWatch({
    control,
    name: "availabilityCalendarUrl",
    defaultValue: "",
  });

  const [isChecking, setIsChecking] = useState(false);
  const [checkResult, setCheckResult] = useState<CalendarCheckResult | null>(
    null,
  );

  const normalizedUrl = calendarUrl.trim();

  const currentResult = checkResult?.url === normalizedUrl ? checkResult : null;

  const handleCheck = async () => {
    if (!normalizedUrl || isChecking) {
      return;
    }

    setIsChecking(true);

    try {
      const result =
        await checkAccommodationAvailabilityCalendar(normalizedUrl);

      setCheckResult({
        url: normalizedUrl,
        ...result,
      });
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <AccommodationEditorSectionContent>
      <AccommodationTextField
        name="availabilityCalendarUrl"
        label="Lien du calendrier iCal"
        placeholder="https://www.airbnb.com/calendar/ical/..."
        variant="editor"
      />

      <p className="text-sm leading-6 text-muted-foreground">
        Collez le lien d’export iCal du logement. Il permettra de synchroniser
        automatiquement les périodes indisponibles.
      </p>

      <Button
        type="button"
        variant="outline"
        disabled={disabled || isChecking || !normalizedUrl}
        onClick={handleCheck}
        className="w-full"
      >
        {isChecking ? (
          <>
            <Loader2 className="animate-spin" />
            Vérification...
          </>
        ) : (
          <>
            <CalendarCheck />
            Vérifier le calendrier
          </>
        )}
      </Button>

      {currentResult?.success ? (
        <div className="flex gap-3 rounded-md border border-primary/20 bg-primary/5 p-4">
          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />

          <div>
            <p className="text-sm font-medium">Calendrier valide</p>

            <p className="mt-1 text-sm leading-5 text-muted-foreground">
              {currentResult.unavailablePeriodsCount === 0
                ? "Aucune période indisponible n’est actuellement renseignée."
                : `${currentResult.unavailablePeriodsCount} période${
                    currentResult.unavailablePeriodsCount > 1 ? "s" : ""
                  } indisponible${
                    currentResult.unavailablePeriodsCount > 1 ? "s" : ""
                  } détectée${
                    currentResult.unavailablePeriodsCount > 1 ? "s" : ""
                  }.`}
            </p>
          </div>
        </div>
      ) : null}

      {currentResult && !currentResult.success ? (
        <div className="flex gap-3 rounded-md border border-destructive/30 bg-destructive/5 p-4">
          <AlertCircle className="mt-0.5 size-4 shrink-0 text-destructive" />

          <div>
            <p className="text-sm font-medium text-destructive">
              Calendrier inaccessible
            </p>

            <p className="mt-1 text-sm leading-5 text-muted-foreground">
              {currentResult.message}
            </p>
          </div>
        </div>
      ) : null}
    </AccommodationEditorSectionContent>
  );
};
