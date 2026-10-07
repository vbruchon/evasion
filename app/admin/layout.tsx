import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

import { AdminFlashToast } from "@/components/layout/admin/admin-flash-toast";
import { isAdminEmail } from "@/lib/admin/is-admin-email";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Administration",

  robots: {
    index: false,
    follow: false,
    nocache: true,

    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

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

  return (
    <>
      <AdminFlashToast />

      {children}
    </>
  );
}
