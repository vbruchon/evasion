import {
  Copy,
  ExternalLink,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type AccommodationAdminActionsProps = {
  name: string;
  slug: string;
  mobile?: boolean;
};

export const AccommodationAdminActions = ({
  name,
  slug,
  mobile = false,
}: AccommodationAdminActionsProps) => {
  return (
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
        className={
          mobile
            ? "flex-1 hover:border-primary/50 hover:bg-primary/5 hover:text-primary"
            : "hover:border-primary/50 hover:bg-primary/5 hover:text-primary"
        }
        render={<Link href={`/admin/logements/${slug}`} />}
      >
        <Pencil />
        Modifier
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="outline"
              size="icon"
              aria-label={`Actions pour ${name}`}
              className="shrink-0 hover:border-primary/50 hover:bg-primary/5 hover:text-primary"
            />
          }
        >
          <MoreHorizontal />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-52">
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

          <DropdownMenuItem disabled>
            <Copy />
            Dupliquer
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem disabled variant="destructive">
            <Trash2 />
            Supprimer définitivement
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
