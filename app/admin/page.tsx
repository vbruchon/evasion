import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { SignOutButton } from "@/components/auth/sign-out-button";

export default async function AdminPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <header className="flex items-center justify-between gap-6 border-b pb-6">
          <div>
            <p className="section-eyebrow">Évasion</p>

            <h1 className="mt-2 font-heading text-3xl">Tableau de bord</h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Connecté en tant que {session?.user.email}
            </p>
          </div>

          <SignOutButton />
        </header>

        <section className="py-10">
          <div className="rounded-xl border bg-card p-8">
            <h2 className="font-heading text-2xl">
              Bienvenue dans l’administration
            </h2>

            <p className="mt-3 text-muted-foreground">
              Le socle de connexion est opérationnel. Les fonctionnalités de
              gestion des logements seront ajoutées ensuite.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
