import {
  DndContext,
  type DragEndEvent,
  type SensorDescriptor,
  type SensorOptions,
  closestCenter,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { AccommodationAdminRow } from "./accommodation-admin-row";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AccommodationWithImages } from "@/lib/accommodation-types";

type AccommodationsAdminDesktopTableProps = {
  accommodations: AccommodationWithImages[];
  isReordering: boolean;
  sensors: SensorDescriptor<SensorOptions>[];
  onDragEnd: (event: DragEndEvent) => void;
};

export const AccommodationsAdminDesktopTable = ({
  accommodations,
  isReordering,
  sensors,
  onDragEnd,
}: AccommodationsAdminDesktopTableProps) => {
  return (
    <div className="hidden overflow-hidden rounded-sm border border-border/60 md:block">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={onDragEnd}
      >
        <SortableContext
          items={accommodations.map((accommodation) => accommodation.id)}
          strategy={verticalListSortingStrategy}
        >
          <Table>
            <TableHeader>
              <TableRow className="border-border/60 hover:bg-transparent">
                <TableHead className="w-[45%] pl-6">Logement</TableHead>

                <TableHead className="w-40">Statut</TableHead>

                <TableHead className="w-32 text-center">Position</TableHead>

                <TableHead className="w-52">Modifié le</TableHead>

                <TableHead className="w-52 pr-6 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {accommodations.map((accommodation) => (
                <AccommodationAdminRow
                  key={accommodation.id}
                  accommodation={accommodation}
                  isReordering={isReordering}
                />
              ))}
            </TableBody>
          </Table>
        </SortableContext>
      </DndContext>
    </div>
  );
};
