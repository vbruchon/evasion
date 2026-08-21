import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { AdminSidebar } from "@/components/layout/admin/sidebar/admin-navigation";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
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

  return (
    <SidebarProvider>
      <AdminSidebar />

      <SidebarInset>
        <div className="sticky top-0 z-40 flex h-16 items-center border-b border-border/60 bg-background/85 px-4 backdrop-blur md:hidden">
          <SidebarTrigger />
        </div>

        <main className="min-w-0 flex-1">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
