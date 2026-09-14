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

import type { AccommodationAdminListItem } from "@/lib/accommodations/accommodation-types";

import { AccommodationAdminMobileCard } from "./accommodation-admin-mobile-card";

type AccommodationsAdminMobileListProps = {
  accommodations: AccommodationAdminListItem[];
  isReordering: boolean;
  sensors: SensorDescriptor<SensorOptions>[];
  onDragEnd: (event: DragEndEvent) => void;
};

export const AccommodationsAdminMobileList = ({
  accommodations,
  isReordering,
  sensors,
  onDragEnd,
}: AccommodationsAdminMobileListProps) => {
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={onDragEnd}
    >
      <SortableContext
        items={accommodations.map((accommodation) => accommodation.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-3 md:hidden">
          {accommodations.map((accommodation) => (
            <AccommodationAdminMobileCard
              key={accommodation.id}
              accommodation={accommodation}
              isReordering={isReordering}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};
