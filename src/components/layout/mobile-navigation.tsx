"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { siteConfig } from "@/config/site";

import { SiteLogo } from "./site-logo";

export const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger
        aria-label="Ouvrir le menu"
        className="inline-flex size-11 items-center justify-center rounded-sm border border-primary/50 bg-black/20 text-foreground backdrop-blur-sm transition-colors hover:bg-primary/10 lg:hidden"
      >
        <Menu className="size-5" />
      </SheetTrigger>

      <SheetContent
        side="right"
        className="flex w-full flex-col border-l border-border bg-background/98 px-6 sm:max-w-sm"
      >
        <SheetHeader className="border-b border-border/60 px-0 pb-6 pt-4">
          <SheetTitle className="sr-only">Navigation principale</SheetTitle>

          <SiteLogo onClick={() => setIsOpen(false)} />
        </SheetHeader>

        <nav
          aria-label="Navigation mobile"
          className="flex flex-1 flex-col py-6"
        >
          <div className="w-full">
            {siteConfig.navigation.map((item) => (
              <SheetClose
                key={item.href}
                nativeButton={false}
                render={
                  <Link
                    href={item.href}
                    className="block w-full border-b border-border/50 py-5 text-left font-heading text-2xl transition-colors hover:text-primary"
                  />
                }
              >
                {item.label}
              </SheetClose>
            ))}
          </div>

          <div className="mt-auto flex justify-center pt-10">
            <SheetClose
              nativeButton={false}
              render={
                <Link
                  href="/contact"
                  className="inline-flex h-12 items-center justify-center border border-primary bg-primary px-10 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                />
              }
            >
              Nous contacter
            </SheetClose>
          </div>
        </nav>

        <div className="border-t border-border/60 py-6">
          <p className="text-center text-xs leading-5 text-muted-foreground">
            Des lieux d’exception, pensés pour vous évader à deux.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
};
