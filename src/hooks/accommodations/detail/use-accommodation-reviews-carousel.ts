"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const getCarouselMetrics = (viewport: HTMLDivElement) => {
  const firstCard = viewport.firstElementChild as HTMLElement | null;

  if (!firstCard) {
    return null;
  }

  const styles = window.getComputedStyle(viewport);

  const gap = Number.parseFloat(styles.columnGap || styles.gap) || 0;

  const cardWidth = firstCard.offsetWidth;
  const cardStep = cardWidth + gap;

  const visibleCount = Math.max(
    1,
    Math.round((viewport.clientWidth + gap) / cardStep),
  );

  return {
    cardStep,
    visibleCount,
  };
};

export const useAccommodationReviewsCarousel = (itemCount: number) => {
  const viewportRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);
  const [canScrollPrevious, setCanScrollPrevious] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateScrollState = useCallback(() => {
    const viewport = viewportRef.current;

    if (!viewport) return;

    const metrics = getCarouselMetrics(viewport);

    if (!metrics) {
      setActiveIndex(0);
      setVisibleCount(1);
      setCanScrollPrevious(false);
      setCanScrollNext(false);
      return;
    }

    const maxScrollLeft = viewport.scrollWidth - viewport.clientWidth;

    const nextIndex = Math.round(viewport.scrollLeft / metrics.cardStep);

    setActiveIndex(
      Math.max(0, Math.min(nextIndex, Math.max(0, itemCount - 1))),
    );

    setVisibleCount(metrics.visibleCount);
    setCanScrollPrevious(viewport.scrollLeft > 4);
    setCanScrollNext(viewport.scrollLeft < maxScrollLeft - 4);
  }, [itemCount]);

  useEffect(() => {
    const viewport = viewportRef.current;

    if (!viewport) return;

    updateScrollState();

    const resizeObserver = new ResizeObserver(updateScrollState);

    resizeObserver.observe(viewport);

    return () => {
      resizeObserver.disconnect();
    };
  }, [updateScrollState]);

  const scroll = (direction: "previous" | "next") => {
    const viewport = viewportRef.current;

    if (!viewport) return;

    const metrics = getCarouselMetrics(viewport);

    if (!metrics) return;

    viewport.scrollBy({
      left: direction === "next" ? metrics.cardStep : -metrics.cardStep,
      behavior: "smooth",
    });
  };

  const pageCount = Math.max(1, Math.ceil(itemCount / visibleCount));

  const activePageIndex = Math.min(
    pageCount - 1,
    Math.floor(activeIndex / visibleCount),
  );

  return {
    viewportRef,
    canScrollPrevious,
    canScrollNext,
    pageCount,
    activePageIndex,
    updateScrollState,
    scroll,
  };
};
