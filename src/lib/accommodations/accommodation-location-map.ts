import type L from "leaflet";

export const ACCOMMODATION_LOCATION_DEFAULT_ZOOM = 11;
export const ACCOMMODATION_LOCATION_MAX_ZOOM = 12;
export const ACCOMMODATION_LOCATION_FIT_PADDING: [number, number] = [45, 45];

export const ACCOMMODATION_LOCATION_TILE_URL =
  "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png";

export const ACCOMMODATION_LOCATION_TILE_ATTRIBUTION =
  "&copy; Stadia Maps &copy; OpenMapTiles &copy; OpenStreetMap contributors";

export const ACCOMMODATION_LOCATION_CIRCLE_OPTIONS = {
  color: "rgb(200 151 68)",
  weight: 1.2,
  opacity: 0.78,
  dashArray: "3 5",
  fillColor: "rgb(200 151 68)",
  fillOpacity: 0.086,
} as const;

const MARKER_SIZE = 54;

const MARKER_HTML = `
  <div
    style="
      width: 54px;
      height: 54px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 9999px;
      border: 1px solid rgba(200, 151, 68, 0.42);
      background: rgba(200, 151, 68, 0.07);
      box-shadow:
        0 0 0 4px rgba(200, 151, 68, 0.035),
        0 0 26px rgba(200, 151, 68, 0.14),
        0 8px 24px rgba(0, 0, 0, 0.5);
    "
  >
    <div
      style="
        width: 42px;
        height: 42px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 9999px;
        border: 1px solid rgba(218, 168, 82, 0.9);
        background: rgba(8, 8, 6, 0.96);
        color: rgb(218, 168, 82);
        box-shadow:
          inset 0 0 14px rgba(200, 151, 68, 0.05),
          0 4px 12px rgba(0, 0, 0, 0.45);
      "
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="21"
        height="21"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          d="M12 3.15 2.75 10.9a1 1 0 0 0 .64 1.77h1.36v7.08c0 .69.56 1.25 1.25 1.25h4.25v-5.75c0-.55.45-1 1-1h1.5c.55 0 1 .45 1 1V21H18c.69 0 1.25-.56 1.25-1.25v-7.08h1.36a1 1 0 0 0 .64-1.77L12 3.15Z"
        />
      </svg>
    </div>
  </div>
`;

export const createAccommodationLocationMarkerIcon = (leaflet: typeof L) =>
  leaflet.divIcon({
    className: "",
    html: MARKER_HTML,
    iconSize: [MARKER_SIZE, MARKER_SIZE],
    iconAnchor: [MARKER_SIZE / 2, MARKER_SIZE / 2],
  });

export const fitAccommodationLocationCircle = (
  map: L.Map,
  circle: L.Circle,
) => {
  map.fitBounds(circle.getBounds(), {
    padding: ACCOMMODATION_LOCATION_FIT_PADDING,
    maxZoom: ACCOMMODATION_LOCATION_MAX_ZOOM,
    animate: false,
  });
};
