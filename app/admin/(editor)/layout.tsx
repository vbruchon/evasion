import type { ReactNode } from "react";

type AccommodationEditorLayoutProps = {
  children: ReactNode;
};

export default function AccommodationEditorLayout({
  children,
}: AccommodationEditorLayoutProps) {
  return (
    <main className="h-dvh overflow-hidden bg-background">{children}</main>
  );
}
