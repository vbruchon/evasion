import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <section className="mx-auto max-w-2xl text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.25em] text-muted-foreground">
          Locations d’exception
        </p>

        <h1 className="text-5xl font-medium tracking-tight md:text-7xl">
          Bienvenue sur Évasion
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
          Une sélection de logements pensés pour ralentir, se retrouver et
          profiter pleinement de chaque instant.
        </p>

        <Button className="mt-8">Découvrir prochainement</Button>
      </section>
    </main>
  );
}
