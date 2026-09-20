import type { ReactNode } from "react";

type AdminEditorSectionContentProps = {
  children: ReactNode;
};

export const AdminEditorSectionContent = ({
  children,
}: AdminEditorSectionContentProps) => (
  <div className="space-y-7 px-6 py-7">{children}</div>
);
