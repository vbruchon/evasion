"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

type DesktopNavigationProps = {
  isScrolled?: boolean;
};

export const DesktopNavigation = ({
  isScrolled = false,
}: DesktopNavigationProps) => {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navigation principale"
      className={cn(
        "hidden items-center transition-[gap] duration-300 lg:flex",
        isScrolled ? "gap-6 xl:gap-8" : "gap-8 xl:gap-10",
      )}
    >
      {siteConfig.navigation.map((item) => {
        const isActive =
          pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "relative py-2 transition-[font-size,color] duration-300",
              "after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-center after:bg-primary after:transition-transform",
              isScrolled ? "text-sm" : "text-base",
              isActive
                ? "text-primary after:scale-x-100"
                : "text-foreground/85 after:scale-x-0 hover:text-primary hover:after:scale-x-100",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
};
