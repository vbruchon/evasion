import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

type SiteLogoProps = {
  onClick?: () => void;
  isScrolled?: boolean;
};

export const SiteLogo = ({ onClick, isScrolled = false }: SiteLogoProps) => {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="Retour à l’accueil Évasion"
      className={cn(
        "relative block shrink-0 origin-left transition-[width,height] duration-300 ease-out",
        isScrolled ? "h-11 w-36 md:h-14 md:w-44" : "h-20 w-48 md:h-20 md:w-56",
      )}
    >
      <Image
        src="/logo-horizontal.svg"
        alt="Évasion — Séjours à deux"
        fill
        priority
        sizes="(max-width: 768px) 176px, 224px"
        className="object-contain object-left"
      />
    </Link>
  );
};
