import {
  Accessibility,
  Car,
  CircleParking,
  Footprints,
  House,
  KeyRound,
  ListChevronsUpDown,
  MapPin,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

type AccommodationAccessIconProps = {
  icon: string;
  className?: string;
};

const accessIcons: Record<string, LucideIcon> = {
  Car,
  CircleParking,
  ShieldCheck,
  Footprints,
  House,
  ListChevronsUpDown,
  Accessibility,
  KeyRound,
};

export const AccommodationAccessIcon = ({
  icon,
  className,
}: AccommodationAccessIconProps) => {
  const Icon = accessIcons[icon] ?? MapPin;

  return <Icon className={className} />;
};
