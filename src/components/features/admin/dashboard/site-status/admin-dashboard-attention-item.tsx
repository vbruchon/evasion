import { ArrowUpRight, ChevronDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export type AdminDashboardAttentionDetail = {
  id: string;
  label: string;
  href?: string;
};

export type AdminDashboardAttentionItemProps = {
  icon: LucideIcon;
  title: string;
  value: number;
  description: string;
  details: AdminDashboardAttentionDetail[];
  action?: {
    label: string;
    href: string;
  };
  className?: string;
};

export const AdminDashboardAttentionItem = ({
  icon: Icon,
  title,
  value,
  description,
  details,
  action,
  className,
}: AdminDashboardAttentionItemProps) => (
  <AccordionItem
    value={title}
    className={cn(
      "relative min-w-0 bg-primary/2.5 transition-colors not-last:border-b-0 hover:bg-primary/4.5 data-open:bg-primary/5.5",
      "md:**:data-[slot=accordion-content]:absolute md:**:data-[slot=accordion-content]:inset-x-0 md:**:data-[slot=accordion-content]:top-full md:**:data-[slot=accordion-content]:z-40",
      className,
    )}
  >
    <AccordionTrigger
      className={cn(
        "group/attention-trigger min-h-24 w-full items-center gap-3 border-0 px-5 py-4 font-normal hover:no-underline sm:px-6 xl:px-5",
        "**:data-[slot=accordion-trigger-icon]:hidden",
      )}
    >
      <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/5.5 text-primary sm:size-10">
        <Icon className="size-4" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-[0.8rem] font-medium leading-5 text-foreground sm:text-[0.82rem]">
          {title}
        </p>

        <p className="mt-0.5 line-clamp-2 text-[0.68rem] leading-4 text-muted-foreground sm:text-[0.72rem]">
          {description}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/[0.07] text-xs font-medium tabular-nums text-primary">
          {value}
        </span>

        <ChevronDown className="size-3.5 shrink-0 text-muted-foreground transition-transform duration-200 group-aria-expanded/attention-trigger:rotate-180 group-aria-expanded/attention-trigger:text-primary" />
      </div>
    </AccordionTrigger>

    <AccordionContent
      className={cn(
        "border-t border-primary/15 bg-card px-5 py-2 sm:px-6 sm:py-3",
        "md:border md:border-primary/25 md:bg-card/95 md:shadow-2xl md:backdrop-blur-md",
        "[&_a]:no-underline [&_a]:hover:text-primary",
      )}
    >
      <div className="divide-y divide-border/50">
        {details.map((detail) =>
          detail.href ? (
            <Link
              key={detail.id}
              href={detail.href}
              className="group/detail flex items-center justify-between gap-4 py-2.5 text-[0.8rem] transition-colors hover:text-primary sm:py-3 sm:text-sm"
            >
              <span className="truncate">{detail.label}</span>

              <ArrowUpRight className="size-3.5 shrink-0 text-muted-foreground transition-colors group-hover/detail:text-primary" />
            </Link>
          ) : (
            <div
              key={detail.id}
              className="flex items-center gap-3 py-2.5 text-[0.8rem] sm:py-3 sm:text-sm"
            >
              <span className="size-1 shrink-0 rounded-full bg-primary" />
              <span>{detail.label}</span>
            </div>
          ),
        )}
      </div>

      {action ? (
        <div className="mt-1 border-t border-border/50 pt-2.5 sm:mt-2 sm:pt-3">
          <Link
            href={action.href}
            className="inline-flex items-center gap-2 text-[0.72rem] font-medium text-primary transition-colors hover:text-primary/80 sm:text-xs"
          >
            {action.label}
            <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
      ) : null}
    </AccordionContent>
  </AccordionItem>
);
