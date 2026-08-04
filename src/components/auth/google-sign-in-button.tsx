"use client";

import { useState } from "react";

import { authClient } from "@/lib/auth-client";

export const GoogleSignInButton = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async () => {
    setError(null);

    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/admin",
      errorCallbackURL: "/connexion?error=unauthorized",
      fetchOptions: {
        onRequest: () => {
          setIsPending(true);
        },
        onResponse: () => {
          setIsPending(false);
        },
        onError: () => {
          setError("La connexion avec Google a échoué.");
        },
      },
    });
  };

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={handleSignIn}
        disabled={isPending}
        className="flex h-11 w-full items-center justify-center gap-3 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <GoogleIcon />

        {isPending ? "Redirection vers Google…" : "Continuer avec Google"}
      </button>

      {error ? (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
};

const GoogleIcon = () => {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5">
      <path
        fill="currentColor"
        d="M21.35 12.24c0-.72-.06-1.26-.2-1.82H12v3.31h5.37a4.72 4.72 0 0 1-1.99 3.02l-.02.11 2.9 2.25.2.02c1.84-1.7 2.89-4.2 2.89-6.89Z"
      />
      <path
        fill="currentColor"
        d="M12 21.75c2.63 0 4.84-.87 6.45-2.62l-3.08-2.38c-.82.55-1.93.94-3.37.94a5.85 5.85 0 0 1-5.53-4.04l-.1.01-3.02 2.34-.04.1A9.75 9.75 0 0 0 12 21.75Z"
      />
      <path
        fill="currentColor"
        d="M6.47 13.65A5.99 5.99 0 0 1 6.15 12c0-.57.11-1.12.3-1.65v-.12L3.4 7.86l-.1.05A9.74 9.74 0 0 0 2.25 12c0 1.47.33 2.86 1.06 4.09l3.16-2.44Z"
      />
      <path
        fill="currentColor"
        d="M12 6.31c1.83 0 3.06.79 3.77 1.44l2.75-2.68A9.3 9.3 0 0 0 12 2.25a9.75 9.75 0 0 0-8.69 5.66l3.14 2.44A5.86 5.86 0 0 1 12 6.31Z"
      />
    </svg>
  );
};
