import Link from "next/link";

export const SkipLink = () => {
  return (
    <Link
      href="#main-content"
      className="
        fixed left-4 top-4 z-[9999]
        -translate-y-24
        bg-primary px-4 py-3
        text-sm font-semibold text-primary-foreground
        shadow-xl
        transition-transform
        focus-visible:translate-y-0
      "
    >
      Aller au contenu principal
    </Link>
  );
};
