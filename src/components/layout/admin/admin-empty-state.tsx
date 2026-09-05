type AdminEmptyStateProps = {
  title: string;
  description?: string;
};

export const AdminEmptyState = ({
  title,
  description,
}: AdminEmptyStateProps) => {
  return (
    <div className="flex min-h-60 items-center justify-center rounded-sm border border-border/60">
      <div className="text-center">
        <p className="font-heading text-xl">{title}</p>

        {description ? (
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
    </div>
  );
};
