// @vitest-environment jsdom

import { act, cleanup, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useForm } from "react-hook-form";

import { saveAccommodationDraft } from "~/app/admin/logements/action";
import type {
  AccommodationUpdateFormValues,
  AccommodationUpdateImageInput,
} from "~/app/admin/logements/schema";

import { useAccommodationDraftAutosave } from "@/hooks/use-accommodation-draft-autosave";
import type { AccommodationPreviewImage } from "@/hooks/use-accommodation-images";
import { prepareAccommodationUpdateImages } from "@/lib/admin/accommodation/prepare-accommodation-update-images";

import { createAccommodationUpdateValues } from "../helpers/accommodation-values";

vi.mock("~/app/admin/logements/action", () => ({
  saveAccommodationDraft: vi.fn(),
}));

vi.mock(
  "@/lib/admin/accommodation/prepare-accommodation-update-images",
  () => ({
    prepareAccommodationUpdateImages: vi.fn(),
  }),
);

const mockedSaveAccommodationDraft = vi.mocked(saveAccommodationDraft);

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

  highlights: [
    {
      id: "highlight-1",
      title: "Spa privatif",
      description: "Jacuzzi rien que pour vous",
      icon: "Waves",
    },
  ],

  status: "PUBLISHED",
});

type RenderAutosaveHookOptions = {
  images?: AccommodationPreviewImage[];
  coverImageId?: string | null;
  presentationImageId?: string | null;
};

const renderAutosaveHook = ({
  images = [],
  coverImageId = null,
  presentationImageId = null,
}: RenderAutosaveHookOptions = {}) => {
  const syncPreparedImages = vi.fn();

  const hook = renderHook(
    ({
      currentPresentationImageId,
    }: {
      currentPresentationImageId: string | null;
    }) => {
      const form = useForm<AccommodationUpdateFormValues>({
        defaultValues: initialValues,
      });

      const autosave = useAccommodationDraftAutosave({
        accommodationId: "accommodation-1",
        form,
        images,
        coverImageId,
        presentationImageId: currentPresentationImageId,
        enabled: true,
        initialHasDraft: false,
        syncPreparedImages,
      });

      return {
        form,
        ...autosave,
      };
    },
    {
      initialProps: {
        currentPresentationImageId: presentationImageId,
      },
    },
  );

  return {
    ...hook,
    syncPreparedImages,
  };
};

describe("useAccommodationDraftAutosave", () => {
  beforeEach(() => {
    vi.useFakeTimers();

    mockedPrepareAccommodationUpdateImages.mockResolvedValue([]);

    mockedSaveAccommodationDraft.mockResolvedValue({
      success: true,
    });
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it("saves the draft after the debounce delay", async () => {
    const { result } = renderAutosaveHook();

    act(() => {
      result.current.form.setValue("name", "Le Chalet modifié", {
        shouldDirty: true,
      });
    });

    expect(result.current.autosaveStatus).toBe("pending");

    await act(async () => {
      await vi.advanceTimersByTimeAsync(2499);
    });

    expect(mockedSaveAccommodationDraft).not.toHaveBeenCalled();

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1);
    });

    expect(mockedSaveAccommodationDraft).toHaveBeenCalledTimes(1);

    expect(mockedSaveAccommodationDraft).toHaveBeenCalledWith(
      "accommodation-1",
      {
        name: "Le Chalet modifié",
        type: "Chalet",
        subtitle: "Sous-titre",
        shortDescription: "Description courte",
        description: "Description complète",

        guestCapacity: 4,
        bedrooms: 2,
        beds: 3,
        bathrooms: 1,
        surface: 65,
      },
      [],
      initialValues.highlights,
    );

    expect(result.current.hasDraft).toBe(true);
    expect(result.current.autosaveStatus).toBe("saved");
  });

  it("does not autosave again without new changes", async () => {
    const { result } = renderAutosaveHook();

    act(() => {
      result.current.form.setValue("name", "Le Chalet modifié", {
        shouldDirty: true,
      });
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(2500);
    });

    expect(mockedSaveAccommodationDraft).toHaveBeenCalledTimes(1);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(10000);
    });

    expect(mockedSaveAccommodationDraft).toHaveBeenCalledTimes(1);
  });

  it("retries after a new change following a failed autosave", async () => {
    mockedSaveAccommodationDraft
      .mockResolvedValueOnce({
        success: false,
        message: "Erreur de sauvegarde.",
      })
      .mockResolvedValueOnce({
        success: true,
      });

    const { result } = renderAutosaveHook();

    act(() => {
      result.current.form.setValue("name", "Première modification", {
        shouldDirty: true,
      });
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(2500);
    });

    expect(mockedSaveAccommodationDraft).toHaveBeenCalledTimes(1);
    expect(result.current.autosaveStatus).toBe("error");

    await act(async () => {
      await vi.advanceTimersByTimeAsync(10000);
    });

    expect(mockedSaveAccommodationDraft).toHaveBeenCalledTimes(1);

    act(() => {
      result.current.form.setValue("name", "Deuxième modification", {
        shouldDirty: true,
      });
    });

    expect(result.current.autosaveStatus).toBe("pending");

    await act(async () => {
      await vi.advanceTimersByTimeAsync(2500);
    });

    expect(mockedSaveAccommodationDraft).toHaveBeenCalledTimes(2);

    expect(mockedSaveAccommodationDraft).toHaveBeenLastCalledWith(
      "accommodation-1",
      {
        name: "Deuxième modification",
        type: "Chalet",
        subtitle: "Sous-titre",
        shortDescription: "Description courte",
        description: "Description complète",

        guestCapacity: 4,
        bedrooms: 2,
        beds: 3,
        bathrooms: 1,
        surface: 65,
      },
      [],
      initialValues.highlights,
    );

    expect(result.current.hasDraft).toBe(true);
    expect(result.current.autosaveStatus).toBe("saved");
  });

  it("autosaves when a key detail changes", async () => {
    const { result } = renderAutosaveHook();

    act(() => {
      result.current.form.setValue("guestCapacity", 6, {
        shouldDirty: true,
      });
    });

    expect(result.current.autosaveStatus).toBe("pending");

    await act(async () => {
      await vi.advanceTimersByTimeAsync(2500);
    });

    expect(mockedSaveAccommodationDraft).toHaveBeenCalledTimes(1);

    expect(mockedSaveAccommodationDraft).toHaveBeenCalledWith(
      "accommodation-1",
      expect.objectContaining({
        guestCapacity: 6,
        bedrooms: 2,
        beds: 3,
        bathrooms: 1,
        surface: 65,
      }),
      [],
      initialValues.highlights,
    );

    expect(result.current.hasDraft).toBe(true);
  });

  it("autosaves when a highlight changes", async () => {
    const { result } = renderAutosaveHook();

    act(() => {
      result.current.form.setValue(
        "highlights.0.title",
        "Spa privatif modifié",
        {
          shouldDirty: true,
        },
      );
    });

    expect(result.current.autosaveStatus).toBe("pending");

    await act(async () => {
      await vi.advanceTimersByTimeAsync(2500);
    });

    expect(mockedSaveAccommodationDraft).toHaveBeenCalledTimes(1);

    expect(mockedSaveAccommodationDraft).toHaveBeenCalledWith(
      "accommodation-1",
      expect.objectContaining({
        name: "Le Chalet",
      }),
      [],
      [
        {
          id: "highlight-1",
          title: "Spa privatif modifié",
          description: "Jacuzzi rien que pour vous",
          icon: "Waves",
        },
      ],
    );

    expect(result.current.hasDraft).toBe(true);
    expect(result.current.autosaveStatus).toBe("saved");
  });

  it("autosaves when the presentation image changes", async () => {
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

    const { result, rerender } = renderAutosaveHook({
      images,
      coverImageId: "image-1",
      presentationImageId: "image-1",
    });

    rerender({
      currentPresentationImageId: "image-2",
    });

    expect(result.current.autosaveStatus).toBe("pending");

    await act(async () => {
      await vi.advanceTimersByTimeAsync(2500);
    });

    expect(mockedPrepareAccommodationUpdateImages).toHaveBeenCalledWith(
      images,
      "image-1",
      "image-2",
    );

    expect(mockedSaveAccommodationDraft).toHaveBeenCalledTimes(1);

    expect(mockedSaveAccommodationDraft).toHaveBeenCalledWith(
      "accommodation-1",
      expect.objectContaining({
        name: "Le Chalet",
      }),
      preparedImages,
      initialValues.highlights,
    );

    expect(result.current.hasDraft).toBe(true);
    expect(result.current.autosaveStatus).toBe("saved");
  });
});
