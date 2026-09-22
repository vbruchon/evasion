type AboutPageSectionHeadingProps = {
  index: string;
  eyebrow: string;
};

export const AboutPageSectionHeading = ({
  index,
  eyebrow,
}: AboutPageSectionHeadingProps) => {
  return (
    <div className="flex items-center gap-4 sm:gap-5">
      <span className="font-serif text-xs text-primary/70 sm:text-sm">
        {index}
      </span>

      <span className="h-px w-10 bg-primary/60 lg:w-8 xl:w-6" />

      <p className="text-[0.6rem] uppercase tracking-[0.28em] text-primary sm:text-xs sm:tracking-[0.32em]">
        {eyebrow}
      </p>
    </div>
  );
};
