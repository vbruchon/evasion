import { describe, expect, it } from "vitest";

import { buildAccommodationBookingUrl } from "@/lib/accommodations/booking/accommodation-booking";

describe("buildAccommodationBookingUrl", () => {
  it("adds Airbnb booking dates and two adults", () => {
    const bookingUrl = buildAccommodationBookingUrl(
      "https://www.airbnb.fr/rooms/123456",
      "2026-10-10",
      "2026-10-12",
    );

    expect(bookingUrl).not.toBeNull();

    const url = new URL(bookingUrl!);

    expect(url.searchParams.get("check_in")).toBe("2026-10-10");
    expect(url.searchParams.get("check_out")).toBe("2026-10-12");
    expect(url.searchParams.get("adults")).toBe("2");
  });

  it("preserves existing query parameters on Airbnb URLs", () => {
    const bookingUrl = buildAccommodationBookingUrl(
      "https://www.airbnb.fr/rooms/123456?source_impression_id=test",
      "2026-10-10",
      "2026-10-12",
    );

    expect(bookingUrl).not.toBeNull();

    const url = new URL(bookingUrl!);

    expect(url.searchParams.get("source_impression_id")).toBe("test");
    expect(url.searchParams.get("check_in")).toBe("2026-10-10");
    expect(url.searchParams.get("check_out")).toBe("2026-10-12");
    expect(url.searchParams.get("adults")).toBe("2");
  });

  it("does not add Airbnb parameters to another booking platform", () => {
    const bookingUrl = buildAccommodationBookingUrl(
      "https://example.com/reservation",
      "2026-10-10",
      "2026-10-12",
    );

    expect(bookingUrl).toBe("https://example.com/reservation");
  });

  it("returns null for an invalid booking URL", () => {
    expect(
      buildAccommodationBookingUrl("invalid-url", "2026-10-10", "2026-10-12"),
    ).toBeNull();
  });

  it("rejects an HTTP booking URL", () => {
    expect(
      buildAccommodationBookingUrl(
        "http://example.com/reservation",
        "2026-10-10",
        "2026-10-12",
      ),
    ).toBeNull();
  });

  it("does not treat a deceptive hostname as Airbnb", () => {
    const bookingUrl = buildAccommodationBookingUrl(
      "https://airbnb.evil.example/reservation",
      "2026-10-10",
      "2026-10-12",
    );

    expect(bookingUrl).toBe("https://airbnb.evil.example/reservation");
  });

  it("rejects booking URLs containing credentials", () => {
    expect(
      buildAccommodationBookingUrl(
        "https://user:password@example.com/reservation",
        "2026-10-10",
        "2026-10-12",
      ),
    ).toBeNull();
  });
});
