// @vitest-environment jsdom

import { act, cleanup, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { useAccommodationImages } from "@/hooks/use-accommodation-images";

describe("useAccommodationImages", () => {
  afterEach(() => {
    cleanup();
  });

  it("reorders images without changing their roles", () => {
    const { result } = renderHook(() =>
      useAccommodationImages({
        initialImages: [
          {
            id: "image-1",
            url: "https://example.com/image-1.webp",
            fileKey: "image-1",
            isCover: true,
            isPresentation: false,
          },
          {
            id: "image-2",
            url: "https://example.com/image-2.webp",
            fileKey: "image-2",
            isCover: false,
            isPresentation: true,
          },
          {
            id: "image-3",
            url: "https://example.com/image-3.webp",
            fileKey: "image-3",
            isCover: false,
            isPresentation: false,
          },
        ],
      }),
    );

    expect(result.current.images.map((image) => image.id)).toEqual([
      "image-1",
      "image-2",
      "image-3",
    ]);

    expect(result.current.coverImageId).toBe("image-1");
    expect(result.current.presentationImageId).toBe("image-2");

    act(() => {
      result.current.reorderImages(0, 2);
    });

    expect(result.current.images.map((image) => image.id)).toEqual([
      "image-2",
      "image-3",
      "image-1",
    ]);

    expect(result.current.coverImageId).toBe("image-1");
    expect(result.current.presentationImageId).toBe("image-2");
  });

  it("ignores an invalid reorder", () => {
    const { result } = renderHook(() =>
      useAccommodationImages({
        initialImages: [
          {
            id: "image-1",
            url: "https://example.com/image-1.webp",
            fileKey: "image-1",
            isCover: true,
            isPresentation: false,
          },
          {
            id: "image-2",
            url: "https://example.com/image-2.webp",
            fileKey: "image-2",
            isCover: false,
            isPresentation: true,
          },
        ],
      }),
    );

    act(() => {
      result.current.reorderImages(0, 10);
    });

    expect(result.current.images.map((image) => image.id)).toEqual([
      "image-1",
      "image-2",
    ]);

    expect(result.current.coverImageId).toBe("image-1");
    expect(result.current.presentationImageId).toBe("image-2");
  });
});
