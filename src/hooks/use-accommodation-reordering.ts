"use client";

import { AccommodationWithImages } from "@/lib/accommodation-types";
import type { DragEndEvent } from "@dnd-kit/core";
import { PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useState, useTransition } from "react";
import { reorderAccommodations } from "~/app/admin/logements/action";

export const useAccommodationReordering = (
  accommodations: AccommodationWithImages[],
) => {
  const [isReordering, setIsReordering] = useState(false);
  const [orderedAccommodations, setOrderedAccommodations] =
    useState(accommodations);

  const [isPending, startTransition] = useTransition();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  const startReordering = () => {
    setOrderedAccommodations(accommodations);
    setIsReordering(true);
  };

  const stopReordering = () => {
    setIsReordering(false);
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id || isPending) {
      return;
    }

    const oldIndex = orderedAccommodations.findIndex(
      (accommodation) => accommodation.id === active.id,
    );

    const newIndex = orderedAccommodations.findIndex(
      (accommodation) => accommodation.id === over.id,
    );

    if (oldIndex === -1 || newIndex === -1) {
      return;
    }

    const reorderedAccommodations = arrayMove(
      orderedAccommodations,
      oldIndex,
      newIndex,
    ).map((accommodation, index) => ({
      ...accommodation,
      position: index + 1,
    }));

    setOrderedAccommodations(reorderedAccommodations);

    startTransition(async () => {
      await reorderAccommodations(
        reorderedAccommodations.map(({ id, position }) => ({
          id,
          position,
        })),
      );
    });
  };

  return {
    isReordering,
    orderedAccommodations,
    isPending,
    sensors,
    startReordering,
    stopReordering,
    handleDragEnd,
  };
};
