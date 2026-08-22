import type {
  Accommodation,
  AccommodationImage,
} from "@/generated/prisma/client";

import { AccommodationAdminRow } from "./accommodation-admin-row";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type AccommodationWithImages = Accommodation & {
  images: AccommodationImage[];
};

type AccommodationsAdminDesktopTableProps = {
  accommodations: AccommodationWithImages[];
};

export const AccommodationsAdminDesktopTable = ({
  accommodations,
}: AccommodationsAdminDesktopTableProps) => {
  return (
    <div className="hidden overflow-hidden rounded-sm border border-border/60 md:block">
      <Table>
        <TableHeader>
          <TableRow className="border-border/60 hover:bg-transparent">
            <TableHead className="w-[45%] pl-6">Logement</TableHead>
            <TableHead className="w-40">Statut</TableHead>
            <TableHead className="w-28 text-center">Position</TableHead>
            <TableHead className="w-52">Modifié le</TableHead>
            <TableHead className="w-52 pr-6 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {accommodations.map((accommodation) => (
            <AccommodationAdminRow
              key={accommodation.id}
              accommodation={accommodation}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
