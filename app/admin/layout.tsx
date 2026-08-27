import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

import { isAdminEmail } from "@/lib/admin";
import { auth } from "@/lib/auth";

type AdminLayoutProps = {
  children: ReactNode;
};

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/connexion");
  }

  if (!isAdminEmail(session.user.email)) {
    redirect("/connexion?error=unauthorized");
  }

  return children;
}
