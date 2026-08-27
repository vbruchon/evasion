import type { ReactNode } from "react";

type EditorLayoutProps = {
  children: ReactNode;
};

export default function EditorLayout({ children }: EditorLayoutProps) {
  return (
    <main className="flex h-dvh min-h-0 flex-col overflow-hidden bg-background">
      {children}
    </main>
  );
}
