"use client";

import {
  CheckCircle2,
  CircleAlert,
  Info,
  LoaderCircle,
  XCircle,
} from "lucide-react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

export const Toaster = ({ ...props }: ToasterProps) => (
  <Sonner
    theme="dark"
    position="bottom-right"
    icons={{
      success: <CheckCircle2 className="size-4" />,
      info: <Info className="size-4" />,
      warning: <CircleAlert className="size-4" />,
      error: <XCircle className="size-4" />,
      loading: <LoaderCircle className="size-4 animate-spin" />,
    }}
    toastOptions={{
      classNames: {
        toast:
          "group !w-auto !rounded-none !border-primary/60 !bg-card !px-5 !py-4 !text-foreground !shadow-2xl",
        title: "!font-heading !text-base !font-normal !whitespace-nowrap",
        icon: "!text-primary",
        closeButton:
          "!border-border/60 !bg-card !text-muted-foreground hover:!text-foreground",
      },
    }}
    {...props}
  />
);
