import { FileClock } from "lucide-react";

import { Badge } from "@/components/ui/badge";

export const AccommodationDraftBadge = () => (
  <Badge variant="outline" className="gap-1.5 border-primary/40 text-primary">
    <FileClock className="size-3" />
    Brouillon
  </Badge>
);
