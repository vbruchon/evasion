"use client";

import { ExternalLink, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";

export const AdminSidebarFooter = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut();

    router.push("/connexion");
    router.refresh();
  };

  return (
    <SidebarFooter className="border-t border-border/60 p-4">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            tooltip="Voir le site"
            className="h-11 rounded-sm border border-border/70 px-3 text-muted-foreground hover:border-primary/40 hover:bg-primary/5 hover:text-foreground"
            render={<Link href="/" target="_blank" rel="noopener noreferrer" />}
          >
            <span className="flex-1 text-left">Voir le site</span>
            <ExternalLink className="size-4 text-primary" />
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>

      <SidebarSeparator className="my-2" />

      <Button
        type="button"
        variant="ghost"
        onClick={handleSignOut}
        className="h-11 w-full justify-start gap-3 px-3 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
      >
        <LogOut className="size-4" />
        Se déconnecter
      </Button>
    </SidebarFooter>
  );
};
