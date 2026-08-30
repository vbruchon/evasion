import {
  Armchair,
  BedDouble,
  Coffee,
  Film,
  Flame,
  Heart,
  Leaf,
  Moon,
  Mountain,
  Plane,
  Sparkles,
  Sprout,
  Star,
  Sun,
  Trees,
  Waves,
  type LucideIcon,
} from "lucide-react";

export const MAX_ACCOMMODATION_HIGHLIGHTS = 6;

export const DEFAULT_ACCOMMODATION_HIGHLIGHT_ICON = "Sparkles";

export const ACCOMMODATION_HIGHLIGHT_ICONS: {
  value: string;
  label: string;
  icon: LucideIcon;
}[] = [
  {
    value: "Sparkles",
    label: "Insolite",
    icon: Sparkles,
  },
  {
    value: "Waves",
    label: "Spa / eau",
    icon: Waves,
  },
  {
    value: "Mountain",
    label: "Montagne",
    icon: Mountain,
  },
  {
    value: "Trees",
    label: "Nature",
    icon: Trees,
  },
  {
    value: "Flame",
    label: "Chaleur",
    icon: Flame,
  },
  {
    value: "Heart",
    label: "Romantique",
    icon: Heart,
  },
  {
    value: "Sun",
    label: "Terrasse / soleil",
    icon: Sun,
  },
  {
    value: "Moon",
    label: "Nuit",
    icon: Moon,
  },
  {
    value: "Leaf",
    label: "Feuillage",
    icon: Leaf,
  },
  {
    value: "Sprout",
    label: "Végétation",
    icon: Sprout,
  },
  {
    value: "Film",
    label: "Cinéma",
    icon: Film,
  },
  {
    value: "Plane",
    label: "Aviation",
    icon: Plane,
  },
  {
    value: "BedDouble",
    label: "Chambre",
    icon: BedDouble,
  },
  {
    value: "Armchair",
    label: "Salon",
    icon: Armchair,
  },
  {
    value: "Coffee",
    label: "Détente",
    icon: Coffee,
  },
  {
    value: "Star",
    label: "Exceptionnel",
    icon: Star,
  },
];

export const ACCOMMODATION_HIGHLIGHT_ICON_MAP: Record<string, LucideIcon> =
  Object.fromEntries(
    ACCOMMODATION_HIGHLIGHT_ICONS.map(({ value, icon }) => [value, icon]),
  );

export const ACCOMMODATION_HIGHLIGHT_PRESETS = [
  {
    id: "private-spa",
    icon: "Waves",
    title: "Spa privatif",
    description: "Un espace bien-être rien que pour vous",
  },
  {
    id: "mountain-view",
    icon: "Mountain",
    title: "Vue montagne",
    description: "Panorama sur les reliefs environnants",
  },
  {
    id: "private-terrace",
    icon: "Sun",
    title: "Terrasse privative",
    description: "Un espace extérieur rien que pour vous",
  },
  {
    id: "unusual-experience",
    icon: "Sparkles",
    title: "Expérience insolite",
    description: "Une nuit hors du commun à deux",
  },
  {
    id: "private-cinema",
    icon: "Film",
    title: "Cinéma privé",
    description: "Grand écran depuis votre cocon",
  },
  {
    id: "cocooning",
    icon: "Heart",
    title: "Ambiance cocooning",
    description: "Un espace chaleureux et intimiste",
  },
  {
    id: "nature",
    icon: "Trees",
    title: "Pleine nature",
    description: "Calme et déconnexion au rendez-vous",
  },
  {
    id: "outdoor-hot-bath",
    icon: "Waves",
    title: "Bain chaud extérieur",
    description: "Un moment de détente en plein air",
  },
  {
    id: "architecture",
    icon: "Leaf",
    title: "Architecture atypique",
    description: "Un lieu pensé pour sortir de l’ordinaire",
  },
  {
    id: "private-suite",
    icon: "BedDouble",
    title: "Suite privative",
    description: "Un espace nuit rien que pour vous",
  },
  {
    id: "lounge",
    icon: "Armchair",
    title: "Espace salon",
    description: "Un coin confortable pour se détendre",
  },
  {
    id: "absolute-calm",
    icon: "Moon",
    title: "Calme absolu",
    description: "Loin du rythme du quotidien",
  },
] as const;
