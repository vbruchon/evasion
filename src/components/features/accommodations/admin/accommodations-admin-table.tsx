"use client";

import { ListRestart } from "lucide-react";
import { useMemo, useState } from "react";

import { AccommodationsAdminDesktopTable } from "./accommodations-admin-desktop-table";
import { AccommodationsAdminMobileList } from "./accommodations-admin-mobile-list";

import { AdminEmptyState } from "@/components/layout/admin/admin-empty-state";
import { AdminPagination } from "@/components/layout/admin/admin-pagination";
import { Button } from "@/components/ui/button";
import { AccommodationWithImages } from "@/lib/accommodations/accommodation-types";
import { useAccommodationReordering } from "@/hooks/use-accommodation-reordering";

type AccommodationsAdminTableProps = {
  accommodations: AccommodationWithImages[];
};

const ITEMS_PER_PAGE = 5;

export const AccommodationsAdminTable = ({
  accommodations,
}: AccommodationsAdminTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    isReordering,
    orderedAccommodations,
    isPending,
    sensors,
    startReordering,
    stopReordering,
    handleDragEnd,
  } = useAccommodationReordering(accommodations);

  const totalPages = Math.ceil(accommodations.length / ITEMS_PER_PAGE);

  const paginatedAccommodations = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

    return accommodations.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [accommodations, currentPage]);

  if (accommodations.length === 0) {
    return (
      <AdminEmptyState
        title="Aucun logement"
        description="Ajoutez votre premier logement pour commencer."
      />
    );
  }

  const displayedAccommodations = isReordering
    ? orderedAccommodations
    : paginatedAccommodations;

  return (
    <div>
      <div className="mb-4 flex items-center justify-end">
        {isReordering ? (
          <Button
            type="button"
            variant="outline"
            onClick={stopReordering}
            disabled={isPending}
          >
            {isPending ? "Enregistrement..." : "Terminer"}
          </Button>
        ) : (
          <Button type="button" variant="outline" onClick={startReordering}>
            <ListRestart />
            Réorganiser
          </Button>
        )}
      </div>

      <AccommodationsAdminDesktopTable
        accommodations={displayedAccommodations}
        isReordering={isReordering}
        sensors={sensors}
        onDragEnd={handleDragEnd}
      />

      <AccommodationsAdminMobileList
        accommodations={displayedAccommodations}
        isReordering={isReordering}
        sensors={sensors}
        onDragEnd={handleDragEnd}
      />

      {!isReordering ? (
        <AdminPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={accommodations.length}
          itemLabel={{
            singular: "logement",
            plural: "logements",
          }}
          onPageChange={setCurrentPage}
        />
      ) : null}
    </div>
  );
};
