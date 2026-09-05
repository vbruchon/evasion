"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

type AdminPaginationProps = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemLabel: {
    singular: string;
    plural: string;
  };
  onPageChange: (page: number) => void;
};

export const AdminPagination = ({
  currentPage,
  totalPages,
  totalItems,
  itemLabel,
  onPageChange,
}: AdminPaginationProps) => {
  return (
    <div className="mt-3 flex items-center justify-between border border-border/60 px-4 py-4 md:mt-0 md:border-t-0 md:px-6">
      <p className="text-sm text-muted-foreground">
        {totalItems} {totalItems > 1 ? itemLabel.plural : itemLabel.singular}
      </p>

      {totalPages > 1 ? (
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Page précédente"
          >
            <ChevronLeft />
          </Button>

          {Array.from({ length: totalPages }, (_, index) => {
            const page = index + 1;
            const active = page === currentPage;

            return (
              <Button
                key={page}
                type="button"
                variant={active ? "default" : "outline"}
                size="icon-sm"
                onClick={() => onPageChange(page)}
                aria-current={active ? "page" : undefined}
                aria-label={`Page ${page}`}
              >
                {page}
              </Button>
            );
          })}

          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Page suivante"
          >
            <ChevronRight />
          </Button>
        </div>
      ) : null}
    </div>
  );
};
