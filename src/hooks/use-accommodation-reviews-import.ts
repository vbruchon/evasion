"use client";

import type { ChangeEvent } from "react";
import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { importAccommodationReviewsCsv } from "~/app/admin/logements/action";

import type { AccommodationReviewsImportResult } from "@/lib/admin/accommodation/reviews/import-accommodation-reviews";

export const useAccommodationReviewsImport = (accommodationId: string) => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<AccommodationReviewsImportResult | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);

  const openFilePicker = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setResult(null);
    setError(null);

    startTransition(async () => {
      try {
        const response = await importAccommodationReviewsCsv(
          accommodationId,
          file,
        );

        if (!response.success) {
          setError(response.message);
          return;
        }

        setResult({
          total: response.total,
          imported: response.imported,
          existing: response.existing,
          duplicates: response.duplicates,
        });

        router.refresh();
      } catch {
        setError("Impossible d’importer les avis.");
      } finally {
        if (inputRef.current) {
          inputRef.current.value = "";
        }
      }
    });
  };

  return {
    inputRef,
    isPending,
    result,
    error,
    openFilePicker,
    handleFileChange,
  };
};
