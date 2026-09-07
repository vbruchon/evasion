"use client";

import { useCallback, useEffect, useRef } from "react";

import {
  ACCOMMODATION_LOCATION_CIRCLE_OPTIONS,
  ACCOMMODATION_LOCATION_DEFAULT_ZOOM,
  ACCOMMODATION_LOCATION_TILE_ATTRIBUTION,
  ACCOMMODATION_LOCATION_TILE_URL,
  createAccommodationLocationMarkerIcon,
  fitAccommodationLocationCircle,
} from "@/lib/accommodations/accommodation-location-map";

type UseAccommodationLocationMapOptions = {
  latitude: number | null;
  longitude: number | null;
  radiusMeters: number | null;
  editorPreview: boolean;
};

export const useAccommodationLocationMap = ({
  latitude,
  longitude,
  radiusMeters,
  editorPreview,
}: UseAccommodationLocationMapOptions) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const leafletRef = useRef<typeof import("leaflet") | null>(null);
  const mapRef = useRef<import("leaflet").Map | null>(null);
  const circleRef = useRef<import("leaflet").Circle | null>(null);
  const markerRef = useRef<import("leaflet").Marker | null>(null);

  const fitBoundsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const hasLocation = latitude !== null && longitude !== null;

  const clearFitBoundsTimeout = useCallback(() => {
    if (!fitBoundsTimeoutRef.current) {
      return;
    }

    clearTimeout(fitBoundsTimeoutRef.current);
    fitBoundsTimeoutRef.current = null;
  }, []);

  const destroyMap = useCallback(() => {
    clearFitBoundsTimeout();

    markerRef.current?.remove();
    markerRef.current = null;

    circleRef.current?.remove();
    circleRef.current = null;

    mapRef.current?.remove();
    mapRef.current = null;

    leafletRef.current = null;
  }, [clearFitBoundsTimeout]);

  const resetView = useCallback(() => {
    const L = leafletRef.current;
    const map = mapRef.current;

    if (!L || !map || latitude === null || longitude === null) {
      return;
    }

    clearFitBoundsTimeout();

    if (circleRef.current) {
      fitAccommodationLocationCircle(map, circleRef.current);
      return;
    }

    map.setView(
      L.latLng(latitude, longitude),
      ACCOMMODATION_LOCATION_DEFAULT_ZOOM,
      {
        animate: false,
      },
    );
  }, [clearFitBoundsTimeout, latitude, longitude]);

  const zoomIn = useCallback(() => {
    mapRef.current?.zoomIn();
  }, []);

  const zoomOut = useCallback(() => {
    mapRef.current?.zoomOut();
  }, []);

  useEffect(() => {
    if (!hasLocation || !containerRef.current || mapRef.current) {
      return;
    }

    let cancelled = false;

    const initializeMap = async () => {
      const L = await import("leaflet");

      if (
        cancelled ||
        !containerRef.current ||
        mapRef.current ||
        latitude === null ||
        longitude === null
      ) {
        return;
      }

      const center = L.latLng(latitude, longitude);

      const map = L.map(containerRef.current, {
        center,
        zoom: ACCOMMODATION_LOCATION_DEFAULT_ZOOM,

        zoomControl: false,
        attributionControl: true,

        dragging: !editorPreview,
        doubleClickZoom: !editorPreview,
        scrollWheelZoom: false,
        boxZoom: !editorPreview,
        keyboard: !editorPreview,
        touchZoom: !editorPreview,

        zoomAnimation: false,
        fadeAnimation: false,
        markerZoomAnimation: false,
      });

      map.attributionControl.setPrefix(false);

      L.tileLayer(ACCOMMODATION_LOCATION_TILE_URL, {
        maxZoom: 20,
        attribution: ACCOMMODATION_LOCATION_TILE_ATTRIBUTION,
      }).addTo(map);

      const marker = L.marker(center, {
        icon: createAccommodationLocationMarkerIcon(L),
        interactive: false,
        keyboard: false,
      }).addTo(map);

      leafletRef.current = L;
      mapRef.current = map;
      markerRef.current = marker;

      if (radiusMeters !== null) {
        const circle = L.circle(center, {
          radius: radiusMeters,
          ...ACCOMMODATION_LOCATION_CIRCLE_OPTIONS,
        }).addTo(map);

        circleRef.current = circle;

        fitAccommodationLocationCircle(map, circle);
      }

      requestAnimationFrame(() => {
        if (!cancelled) {
          map.invalidateSize({
            animate: false,
          });
        }
      });
    };

    void initializeMap();

    return () => {
      cancelled = true;
    };
  }, [editorPreview, hasLocation, latitude, longitude, radiusMeters]);

  useEffect(() => {
    const L = leafletRef.current;
    const map = mapRef.current;

    if (!hasLocation || !L || !map || latitude === null || longitude === null) {
      return;
    }

    const center = L.latLng(latitude, longitude);

    markerRef.current?.setLatLng(center);

    if (radiusMeters === null) {
      circleRef.current?.remove();
      circleRef.current = null;

      clearFitBoundsTimeout();

      map.setView(center, ACCOMMODATION_LOCATION_DEFAULT_ZOOM, {
        animate: false,
      });

      return;
    }

    if (circleRef.current) {
      circleRef.current.setLatLng(center);
      circleRef.current.setRadius(radiusMeters);
    } else {
      circleRef.current = L.circle(center, {
        radius: radiusMeters,
        ...ACCOMMODATION_LOCATION_CIRCLE_OPTIONS,
      }).addTo(map);
    }

    clearFitBoundsTimeout();

    fitBoundsTimeoutRef.current = setTimeout(() => {
      const circle = circleRef.current;
      const currentMap = mapRef.current;

      if (!circle || !currentMap) {
        return;
      }

      fitAccommodationLocationCircle(currentMap, circle);

      fitBoundsTimeoutRef.current = null;
    }, 250);
  }, [clearFitBoundsTimeout, hasLocation, latitude, longitude, radiusMeters]);

  useEffect(() => {
    if (!hasLocation) {
      destroyMap();
    }
  }, [destroyMap, hasLocation]);

  useEffect(() => {
    return destroyMap;
  }, [destroyMap]);

  return {
    containerRef,
    hasLocation,
    zoomIn,
    zoomOut,
    resetView,
  };
};
