// @vitest-environment jsdom

import { act, cleanup, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useForm } from "react-hook-form";

import {
  discardAccommodationDraft,
  saveAccommodationDraft,
  updateAccommodation,
} from "~/app/admin/logements/action";
import type {
  AccommodationUpdateFormValues,
  AccommodationUpdateImageInput,
} from "~/app/admin/logements/schema";

import { useAccommodationEditorSubmit } from "@/hooks/use-accommodation-editor-submit";
import type { AccommodationPreviewImage } from "@/hooks/use-accommodation-images";
import { prepareAccommodationUpdateImages } from "@/lib/admin/accommodation/prepare-accommodation-update-images";

import { createAccommodationUpdateValues } from "../helpers/accommodation-values";

vi.mock("~/app/admin/logements/action", () => ({
  updateAccommodation: vi.fn(),
  saveAccommodationDraft: vi.fn(),
  discardAccommodationDraft: vi.fn(),
}));

vi.mock(
  "@/lib/admin/accommodation/prepare-accommodation-update-images",
  () => ({
    prepareAccommodationUpdateImages: vi.fn(),
  }),
);

const mockedUpdateAccommodation = vi.mocked(updateAccommodation);

const mockedSaveAccommodationDraft = vi.mocked(saveAccommodationDraft);

const mockedDiscardAccommodationDraft = vi.mocked(discardAccommodationDraft);

const mockedPrepareAccommodationUpdateImages = vi.mocked(
  prepareAccommodationUpdateImages,
);

const initialValues = createAccommodationUpdateValues({
  name: "Le Chalet",
  type: "Chalet",
  subtitle: "Sous-titre",
  shortDescription: "Description courte",
  description: "Description complète",

  guestCapacity: 4,
  bedrooms: 2,
  beds: 3,
  bathrooms: 1,
  surface: 65,

  highlights: [],

  status: "PUBLISHED",
});

describe("useAccommodationEditorSubmit", () => {
  beforeEach(() => {
    mockedUpdateAccommodation.mockResolvedValue({
      success: false,
      message: "Erreur de test.",
    });
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("publishes the current editor state directly", async () => {
    const images: AccommodationPreviewImage[] = [
      {
        id: "image-1",
        url: "https://example.com/image-1.webp",
        fileKey: "image-1",
        isExisting: true,
      },
      {
        id: "image-2",
        url: "https://example.com/image-2.webp",
        fileKey: "image-2",
        isExisting: true,
      },
    ];

    const preparedImages: AccommodationUpdateImageInput[] = [
      {
        id: "image-1",
        isCover: true,
        isPresentation: false,
      },
      {
        id: "image-2",
        isCover: false,
        isPresentation: true,
      },
    ];

    mockedPrepareAccommodationUpdateImages.mockResolvedValue(preparedImages);

    const { result } = renderHook(() => {
      const form = useForm<AccommodationUpdateFormValues>({
        defaultValues: initialValues,
      });

      const submit = useAccommodationEditorSubmit({
        accommodationId: "accommodation-1",
        form,
        images,
        coverImageId: "image-1",
        presentationImageId: "image-2",
      });

      return {
        form,
        ...submit,
      };
    });

    act(() => {
      result.current.form.setValue("name", "Le Chalet modifié", {
        shouldDirty: true,
      });
    });

    await act(async () => {
      await result.current.handlePublishChanges();
    });

    expect(mockedPrepareAccommodationUpdateImages).toHaveBeenCalledWith(
      images,
      "image-1",
      "image-2",
    );

    expect(mockedUpdateAccommodation).toHaveBeenCalledWith(
      "accommodation-1",
      expect.objectContaining({
        name: "Le Chalet modifié",
        status: "PUBLISHED",
      }),
      preparedImages,
    );

    expect(mockedSaveAccommodationDraft).not.toHaveBeenCalled();
    expect(mockedDiscardAccommodationDraft).not.toHaveBeenCalled();
  });
});
