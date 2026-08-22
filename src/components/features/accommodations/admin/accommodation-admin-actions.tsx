"use client";

import { ExternalLink, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { AccommodationDeleteDialog } from "./accommodation-delete-dialog";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type AccommodationAdminActionsProps = {
  id: string;
  name: string;
  slug: string;
  mobile?: boolean;
};

export const AccommodationAdminActions = ({
  id,
  name,
  slug,
  mobile = false,
}: AccommodationAdminActionsProps) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  return (
    <>
      <div
        className={
          mobile
            ? "flex w-full items-center gap-2"
            : "flex items-center justify-end gap-2"
        }
      >
        <Button
          nativeButton={false}
          variant="outline"
          size="sm"
          className={mobile ? "flex-1" : undefined}
          render={<Link href={`/admin/logements/${slug}`} />}
        >
          <Pencil />
          Modifier
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                type="button"
                variant="outline"
                size="icon-sm"
                aria-label={`Actions pour ${name}`}
              />
            }
          >
            <MoreHorizontal />
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem
              render={
                <Link
                  href={`/logements/${slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              <ExternalLink />
              Voir la page
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              variant="destructive"
              onClick={() => setDeleteDialogOpen(true)}
            >
              <Trash2 />
              Supprimer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <AccommodationDeleteDialog
        id={id}
        name={name}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
      />
    </>
  );
};
