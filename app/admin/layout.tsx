import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { isAdminEmail } from "@/lib/admin";
import { auth } from "@/lib/auth";

type AdminLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

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

  return <>{children}</>;
}
