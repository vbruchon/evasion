import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { GoogleSignInButton } from "@/components/auth/google-sign-in-button";
import { isAdminEmail } from "@/lib/admin";
import { auth } from "@/lib/auth";

type LoginPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session && isAdminEmail(session.user.email)) {
    redirect("/admin");
  }

  const { error } = await searchParams;
  const isUnauthorized = error === "unauthorized";

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <section className="w-full max-w-md">
        <div className="rounded-xl border bg-card p-8 shadow-2xl">
          <div className="text-center">
            <h1 className="font-heading text-4xl text-foreground">
              Connexion à Évasion
            </h1>
          </div>

          {isUnauthorized ? (
            <div
              role="alert"
              className="mt-6 rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
            >
              Ce compte Google n’est pas autorisé.
            </div>
          ) : error ? (
            <div
              role="alert"
              className="mt-6 rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
            >
              La connexion avec Google a échoué. Veuillez réessayer.
            </div>
          ) : null}

          <div className="mt-8">
            <GoogleSignInButton />
          </div>

          <p className="mt-6 text-center text-xs leading-5 text-muted-foreground">
            L’accès est réservé au propriétaire du site et à son prestataire.
          </p>
        </div>
      </section>
    </main>
  );
}
