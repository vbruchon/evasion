"use client";

import type {
  Accommodation,
  AccommodationImage,
} from "@/generated/prisma/client";
import { useMemo, useState } from "react";

import { AccommodationsAdminDesktopTable } from "./accommodations-admin-desktop-table";
import { AccommodationsAdminMobileList } from "./accommodations-admin-mobile-list";
import { AdminEmptyState } from "@/components/layout/admin/admin-empty-state";
import { AdminPagination } from "@/components/layout/admin/admin-pagination";

type AccommodationWithImages = Accommodation & {
  images: AccommodationImage[];
};

type AccommodationsAdminTableProps = {
  accommodations: AccommodationWithImages[];
};

const ITEMS_PER_PAGE = 5;

export const AccommodationsAdminTable = ({
  accommodations,
}: AccommodationsAdminTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);

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

  return (
    <div>
      <AccommodationsAdminDesktopTable
        accommodations={paginatedAccommodations}
      />

      <AccommodationsAdminMobileList accommodations={paginatedAccommodations} />

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
    </div>
  );
};
