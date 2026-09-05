import type { ReactNode } from "react";

type AccommodationEditorSectionContentProps = {
  children: ReactNode;
};

export const AccommodationEditorSectionContent = ({
  children,
}: AccommodationEditorSectionContentProps) => (
  <div className="space-y-7 px-6 py-7">{children}</div>
);
