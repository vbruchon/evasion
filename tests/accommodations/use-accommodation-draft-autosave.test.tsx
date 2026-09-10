// @vitest-environment jsdom

import { act, cleanup, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useForm } from "react-hook-form";

import {
  saveAccommodationDraft,
  updateAccommodation,
} from "~/app/admin/logements/action";
import type {
  AccommodationDraftContent,
  AccommodationUpdateFormValues,
  AccommodationUpdateImageInput,
} from "~/app/admin/logements/schema";

import { useAccommodationDraftAutosave } from "@/hooks/use-accommodation-draft-autosave";
import type {
  AccommodationInitialImage,
  AccommodationPreviewImage,
} from "@/hooks/use-accommodation-images";
import { prepareAccommodationUpdateImages } from "@/lib/admin/accommodation/prepare-accommodation-update-images";

import { createAccommodationUpdateValues } from "../helpers/accommodation-values";

vi.mock("~/app/admin/logements/action", () => ({
  saveAccommodationDraft: vi.fn(),
  updateAccommodation: vi.fn(),
}));

vi.mock(
  "@/lib/admin/accommodation/prepare-accommodation-update-images",
  () => ({
    prepareAccommodationUpdateImages: vi.fn(),
  }),
);

const mockedSaveAccommodationDraft = vi.mocked(saveAccommodationDraft);
const mockedUpdateAccommodation = vi.mocked(updateAccommodation);

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

const initialDraftValues: AccommodationDraftContent["values"] = {
  name: initialValues.name,
  type: initialValues.type,
  subtitle: initialValues.subtitle,
  shortDescription: initialValues.shortDescription,
  description: initialValues.description,

  guestCapacity: initialValues.guestCapacity,
  bedrooms: initialValues.bedrooms,
  beds: initialValues.beds,
  bathrooms: initialValues.bathrooms,
  surface: initialValues.surface,

  locationTitle: initialValues.locationTitle,
  locationDescription: initialValues.locationDescription,
  locationLatitude: initialValues.locationLatitude,
  locationLongitude: initialValues.locationLongitude,
  locationRadiusMeters: initialValues.locationRadiusMeters,
  availabilityCalendarUrl: initialValues.availabilityCalendarUrl,
  bookingUrl: initialValues.bookingUrl,
};

type RenderAutosaveHookOptions = {
  images?: AccommodationPreviewImage[];
  coverImageId?: string | null;
  presentationImageId?: string | null;
  saveAsDraft?: boolean;
  persistedStatus?: AccommodationUpdateFormValues["status"];
  initialHasDraft?: boolean;
};

type RenderAutosaveHookProps = {
  currentImages: AccommodationPreviewImage[];
  currentCoverImageId: string | null;
  currentPresentationImageId: string | null;
};

const renderAutosaveHook = ({
  images = [],
  coverImageId = null,
  presentationImageId = null,
  saveAsDraft = true,
  persistedStatus = "PUBLISHED",
  initialHasDraft = false,
}: RenderAutosaveHookOptions = {}) => {
  const syncPreparedImages = vi.fn();

  const syncPersistedImages = vi.fn(
    (persistedImages: AccommodationInitialImage[]) => {
      const syncedImages: AccommodationPreviewImage[] = persistedImages.map(
        (image) => ({
          id: image.id,
          url: image.url,
          fileKey: image.fileKey,
          alt: image.alt,
          isExisting: true,
        }),
      );

      return {
        images: syncedImages,

        coverImageId:
          persistedImages.find((image) => image.isCover)?.id ??
          persistedImages[0]?.id ??
          null,

        presentationImageId:
          persistedImages.find((image) => image.isPresentation)?.id ?? null,
      };
    },
  );

  const hook = renderHook(
    ({
      currentImages,
      currentCoverImageId,
      currentPresentationImageId,
    }: RenderAutosaveHookProps) => {
      const form = useForm<AccommodationUpdateFormValues>({
        defaultValues: initialValues,
      });

      const autosave = useAccommodationDraftAutosave({
        accommodationId: "accommodation-1",
        form,
        images: currentImages,
        coverImageId: currentCoverImageId,
        presentationImageId: currentPresentationImageId,
        enabled: true,
        saveAsDraft,
        persistedStatus,
        initialHasDraft,
        syncPreparedImages,
        syncPersistedImages,
      });

      return {
        form,
        ...autosave,
      };
    },
    {
      initialProps: {
        currentImages: images,
        currentCoverImageId: coverImageId,
        currentPresentationImageId: presentationImageId,
      },
    },
  );

  return {
    ...hook,
    syncPreparedImages,
    syncPersistedImages,
  };
};

describe("useAccommodationDraftAutosave", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();

    mockedPrepareAccommodationUpdateImages.mockResolvedValue([]);

    mockedSaveAccommodationDraft.mockResolvedValue({
      success: true,
    });

    mockedUpdateAccommodation.mockResolvedValue({
      success: true,
      images: [],
    });
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it("saves a publication draft after the debounce delay", async () => {
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
    expect(mockedUpdateAccommodation).not.toHaveBeenCalled();

    expect(mockedSaveAccommodationDraft).toHaveBeenCalledWith(
      "accommodation-1",
      {
        ...initialDraftValues,
        name: "Le Chalet modifié",
      },
      [],
      initialValues.highlights,
      initialValues.amenities,
      initialValues.accesses,
    );

    expect(result.current.hasDraft).toBe(true);
    expect(result.current.autosaveStatus).toBe("saved");
  });

  it("persists draft accommodations directly after the debounce delay", async () => {
    const { result } = renderAutosaveHook({
      saveAsDraft: false,
      persistedStatus: "DRAFT",
    });

    act(() => {
      result.current.form.setValue("name", "Le Chalet modifié", {
        shouldDirty: true,
      });
    });

    expect(result.current.autosaveStatus).toBe("pending");

    await act(async () => {
      await vi.advanceTimersByTimeAsync(2500);
    });

    expect(mockedSaveAccommodationDraft).not.toHaveBeenCalled();
    expect(mockedUpdateAccommodation).toHaveBeenCalledTimes(1);

    expect(mockedUpdateAccommodation).toHaveBeenCalledWith(
      "accommodation-1",
      {
        ...initialDraftValues,
        name: "Le Chalet modifié",

        highlights: initialValues.highlights,
        amenities: initialValues.amenities,
        accesses: initialValues.accesses,

        status: "DRAFT",
      },
      [],
    );

    expect(result.current.hasDraft).toBe(false);
    expect(result.current.autosaveStatus).toBe("saved");
  });

  it("persists archived accommodations directly without changing their status", async () => {
    const { result } = renderAutosaveHook({
      saveAsDraft: false,
      persistedStatus: "ARCHIVED",
    });

    act(() => {
      result.current.form.setValue("subtitle", "Nouveau sous-titre", {
        shouldDirty: true,
      });
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(2500);
    });

    expect(mockedUpdateAccommodation).toHaveBeenCalledTimes(1);

    expect(mockedUpdateAccommodation).toHaveBeenCalledWith(
      "accommodation-1",
      expect.objectContaining({
        subtitle: "Nouveau sous-titre",
        status: "ARCHIVED",
      }),
      [],
    );

    expect(mockedSaveAccommodationDraft).not.toHaveBeenCalled();
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
        ...initialDraftValues,
        name: "Deuxième modification",
      },
      [],
      initialValues.highlights,
      initialValues.amenities,
      initialValues.accesses,
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
      initialValues.amenities,
      initialValues.accesses,
    );

    expect(result.current.hasDraft).toBe(true);
  });

  it("autosaves when a location changes", async () => {
    const { result } = renderAutosaveHook();

    act(() => {
      result.current.form.setValue("locationTitle", "Aux portes du Vercors", {
        shouldDirty: true,
      });

      result.current.form.setValue("locationLatitude", 45.03, {
        shouldDirty: true,
      });

      result.current.form.setValue("locationLongitude", 5.09, {
        shouldDirty: true,
      });

      result.current.form.setValue("locationRadiusMeters", 6000, {
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
        locationTitle: "Aux portes du Vercors",
        locationLatitude: 45.03,
        locationLongitude: 5.09,
        locationRadiusMeters: 6000,
      }),
      [],
      initialValues.highlights,
      initialValues.amenities,
      initialValues.accesses,
    );

    expect(result.current.hasDraft).toBe(true);
    expect(result.current.autosaveStatus).toBe("saved");
  });

  it("autosaves when the availability calendar URL changes", async () => {
    const { result } = renderAutosaveHook();

    act(() => {
      result.current.form.setValue(
        "availabilityCalendarUrl",
        "https://www.airbnb.com/calendar/ical/123456789.ics?s=test-secret",
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
        availabilityCalendarUrl:
          "https://www.airbnb.com/calendar/ical/123456789.ics?s=test-secret",
      }),
      [],
      initialValues.highlights,
      initialValues.amenities,
      initialValues.accesses,
    );

    expect(result.current.hasDraft).toBe(true);
    expect(result.current.autosaveStatus).toBe("saved");
  });

  it("autosaves when the booking URL changes", async () => {
    const { result } = renderAutosaveHook();

    act(() => {
      result.current.form.setValue(
        "bookingUrl",
        "https://www.airbnb.fr/rooms/123456789",
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
        bookingUrl: "https://www.airbnb.fr/rooms/123456789",
      }),
      [],
      initialValues.highlights,
      initialValues.amenities,
      initialValues.accesses,
    );

    expect(result.current.hasDraft).toBe(true);
    expect(result.current.autosaveStatus).toBe("saved");
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
      initialValues.amenities,
      initialValues.accesses,
    );

    expect(result.current.hasDraft).toBe(true);
    expect(result.current.autosaveStatus).toBe("saved");
  });

  it("autosaves when an amenity changes", async () => {
    const { result } = renderAutosaveHook();

    const amenities: AccommodationUpdateFormValues["amenities"] = [
      {
        key: "wifi",
        details: "",
      },
      {
        key: "coffee-maker",
        details: "Nespresso",
      },
    ];

    act(() => {
      result.current.form.setValue("amenities", amenities, {
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
        name: "Le Chalet",
      }),
      [],
      initialValues.highlights,
      amenities,
      initialValues.accesses,
    );

    expect(result.current.hasDraft).toBe(true);
    expect(result.current.autosaveStatus).toBe("saved");
  });

  it("autosaves when an access changes", async () => {
    const { result } = renderAutosaveHook();

    const accesses: AccommodationUpdateFormValues["accesses"] = [
      {
        key: "car-access",
        details: "Accès direct en voiture jusqu’au logement",
      },
      {
        key: "secure-parking",
        details: "Stationnement sécurisé devant le logement",
      },
    ];

    act(() => {
      result.current.form.setValue("accesses", accesses, {
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
        name: "Le Chalet",
      }),
      [],
      initialValues.highlights,
      initialValues.amenities,
      accesses,
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
      currentImages: images,
      currentCoverImageId: "image-1",
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
      initialValues.amenities,
      initialValues.accesses,
    );

    expect(result.current.hasDraft).toBe(true);
    expect(result.current.autosaveStatus).toBe("saved");
  });

  it("autosaves when the image order changes", async () => {
    const initialImages: AccommodationPreviewImage[] = [
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
      {
        id: "image-3",
        url: "https://example.com/image-3.webp",
        fileKey: "image-3",
        isExisting: true,
      },
    ];

    const reorderedImages = [
      initialImages[1],
      initialImages[2],
      initialImages[0],
    ];

    const preparedImages: AccommodationUpdateImageInput[] = [
      {
        id: "image-2",
        isCover: false,
        isPresentation: true,
      },
      {
        id: "image-3",
        isCover: false,
        isPresentation: false,
      },
      {
        id: "image-1",
        isCover: true,
        isPresentation: false,
      },
    ];

    mockedPrepareAccommodationUpdateImages.mockResolvedValue(preparedImages);

    const { result, rerender } = renderAutosaveHook({
      images: initialImages,
      coverImageId: "image-1",
      presentationImageId: "image-2",
    });

    rerender({
      currentImages: reorderedImages,
      currentCoverImageId: "image-1",
      currentPresentationImageId: "image-2",
    });

    expect(result.current.autosaveStatus).toBe("pending");

    await act(async () => {
      await vi.advanceTimersByTimeAsync(2500);
    });

    expect(mockedPrepareAccommodationUpdateImages).toHaveBeenCalledWith(
      reorderedImages,
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
      initialValues.amenities,
      initialValues.accesses,
    );

    expect(result.current.hasDraft).toBe(true);
    expect(result.current.autosaveStatus).toBe("saved");
  });

  it("resynchronizes persisted image ids after a direct autosave", async () => {
    const newImage: AccommodationPreviewImage = {
      id: "temporary-image",
      url: "data:image/webp;base64,image",
      file: new File(["image"], "image.webp", {
        type: "image/webp",
      }),
      isExisting: false,
    };

    const preparedImages: AccommodationUpdateImageInput[] = [
      {
        url: "https://example.com/uploaded-image.webp",
        fileKey: "uploaded-image",
        isCover: true,
        isPresentation: false,
      },
    ];

    const persistedImages = [
      {
        id: "database-image",
        url: "https://example.com/uploaded-image.webp",
        fileKey: "uploaded-image",
        alt: null,
        isCover: true,
        isPresentation: false,
      },
    ] satisfies AccommodationInitialImage[];

    mockedPrepareAccommodationUpdateImages.mockResolvedValue(preparedImages);

    mockedUpdateAccommodation.mockResolvedValue({
      success: true,
      images: persistedImages,
    });

    const { result, rerender, syncPersistedImages } = renderAutosaveHook({
      saveAsDraft: false,
      persistedStatus: "DRAFT",
    });

    rerender({
      currentImages: [newImage],
      currentCoverImageId: "temporary-image",
      currentPresentationImageId: null,
    });

    expect(result.current.autosaveStatus).toBe("pending");

    await act(async () => {
      await vi.advanceTimersByTimeAsync(2500);
    });

    expect(mockedPrepareAccommodationUpdateImages).toHaveBeenCalledWith(
      [newImage],
      "temporary-image",
      null,
    );

    expect(mockedUpdateAccommodation).toHaveBeenCalledWith(
      "accommodation-1",
      expect.objectContaining({
        status: "DRAFT",
      }),
      preparedImages,
    );

    expect(syncPersistedImages).toHaveBeenCalledTimes(1);
    expect(syncPersistedImages).toHaveBeenCalledWith(persistedImages);

    expect(result.current.autosaveStatus).toBe("saved");
    expect(result.current.hasDraft).toBe(false);
  });

  it("does not autosave when only the status field changes", async () => {
    const { result } = renderAutosaveHook({
      saveAsDraft: false,
      persistedStatus: "DRAFT",
    });

    act(() => {
      result.current.form.setValue("status", "PUBLISHED", {
        shouldDirty: true,
      });
    });

    expect(result.current.autosaveStatus).toBe("idle");

    await act(async () => {
      await vi.advanceTimersByTimeAsync(5000);
    });

    expect(mockedPrepareAccommodationUpdateImages).not.toHaveBeenCalled();
    expect(mockedSaveAccommodationDraft).not.toHaveBeenCalled();
    expect(mockedUpdateAccommodation).not.toHaveBeenCalled();
  });

  it("cancels a pending autosave", async () => {
    const { result } = renderAutosaveHook();

    act(() => {
      result.current.form.setValue("name", "Le Chalet modifié", {
        shouldDirty: true,
      });
    });

    expect(result.current.autosaveStatus).toBe("pending");

    act(() => {
      result.current.cancelPendingAutosave();
    });

    expect(result.current.autosaveStatus).toBe("idle");

    await act(async () => {
      await vi.advanceTimersByTimeAsync(2500);
    });

    expect(mockedPrepareAccommodationUpdateImages).not.toHaveBeenCalled();
    expect(mockedSaveAccommodationDraft).not.toHaveBeenCalled();
    expect(mockedUpdateAccommodation).not.toHaveBeenCalled();
  });
});
