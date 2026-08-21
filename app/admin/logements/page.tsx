import { House } from "lucide-react";

export default async function AdminAccommodationsPage() {
  return (
    <main className="px-6 py-10 md:px-8 lg:px-10">
      <header className="flex items-center border-b border-border/60 pb-5">
        <div className="flex items-center gap-4">
          <House className="size-5 text-primary" />
          <h1 className="font-heading text-3xl">Logements</h1>
        </div>
      </header>
    </main>
  );
}
