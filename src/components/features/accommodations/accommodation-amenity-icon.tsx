import {
  Armchair,
  Bath,
  BedDouble,
  Bug,
  Car,
  ChefHat,
  Circle,
  Coffee,
  Droplets,
  Film,
  Flame,
  House,
  KeyRound,
  Laptop,
  Layers,
  Mountain,
  Moon,
  Package,
  ShieldCheck,
  Shirt,
  Snowflake,
  Sparkles,
  Speaker,
  Sun,
  Tv,
  Utensils,
  WashingMachine,
  Waves,
  Wifi,
  Wind,
  Wine,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

const accommodationAmenityIcons: Record<string, LucideIcon> = {
  Mountain,
  Wind,
  SprayCan: Sparkles,
  Droplets,
  Bath,
  ThermometerSun: Sun,

  Package,
  BedDouble,
  Layers,
  Moon,
  Bug,
  Shirt,

  Tv,
  Speaker,
  Film,

  Snowflake,
  Flame,

  Siren: ShieldCheck,
  ShieldCheck,

  Wifi,
  Laptop,
  Router: Wifi,

  CookingPot: ChefHat,
  Refrigerator: Snowflake,
  Microwave: ChefHat,
  Utensils,
  Coffee,
  Wine,
  Table: Utensils,

  WashingMachine,

  Armchair,
  UtensilsCrossed: Utensils,
  FlameKindling: Flame,
  Sun,

  CircleParking: Car,
  Car,
  Waves,
  House,

  KeyRound,
  LockKeyhole: KeyRound,
};

type AccommodationAmenityIconProps = {
  icon: string;
  className?: string;
};

export const AccommodationAmenityIcon = ({
  icon,
  className,
}: AccommodationAmenityIconProps) => {
  const Icon = accommodationAmenityIcons[icon] ?? Circle;

  return <Icon className={cn("size-5", className)} strokeWidth={1.5} />;
};
