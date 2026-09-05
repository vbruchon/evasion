"use client";

import { useCallback, useEffect, useRef } from "react";

export const useDebouncedCallback = (callback: () => void, delay: number) => {
  const callbackRef = useRef(callback);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const cancel = useCallback(() => {
    if (timeoutRef.current === null) {
      return;
    }

    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
  }, []);

  const schedule = useCallback(() => {
    cancel();

    timeoutRef.current = window.setTimeout(() => {
      timeoutRef.current = null;
      callbackRef.current();
    }, delay);
  }, [cancel, delay]);

  useEffect(() => {
    return cancel;
  }, [cancel]);

  return {
    schedule,
    cancel,
  };
};
