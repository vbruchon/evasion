"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { DesktopNavigation } from "@/components/layout/desktop-navigation";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { SiteLogo } from "@/components/layout/site-logo";
import { cn } from "@/lib/utils";

export const SiteHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        isScrolled
          ? "border-border/60 bg-background/90 shadow-lg shadow-black/10 backdrop-blur-xl"
          : "border-transparent bg-linear-to-b from-black/70 to-transparent",
      )}
    >
      <div
        className={cn(
          "grid w-full grid-cols-[1fr_auto] items-center px-6 transition-[height] duration-300 md:px-12 lg:grid-cols-[1fr_auto_1fr] lg:px-16 xl:px-20",
          isScrolled ? "h-16 md:h-18" : "h-20 md:h-24",
        )}
      >
        <div className="flex min-w-0 items-center justify-start">
          <SiteLogo isScrolled={isScrolled} />
        </div>

        <div className="hidden lg:block">
          <DesktopNavigation isScrolled={isScrolled} />
        </div>

        <div className="flex items-center justify-end gap-3">
          <Link
            href="/contact"
            className={cn(
              "hidden items-center justify-center rounded-sm border-solid border border-primary! text-primary bg-black/30 backdrop-blur-sm transition-all duration-300 hover:bg-primary hover:text-primary-foreground lg:inline-flex",
              isScrolled ? "h-9 px-5 text-sm" : "h-11 px-6 text-base",
            )}
          >
            Nous contacter
          </Link>

          <MobileNavigation />
        </div>
      </div>
    </header>
  );
};
