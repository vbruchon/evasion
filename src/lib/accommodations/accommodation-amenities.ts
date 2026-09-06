export const accommodationAmenityCategories = [
  {
    id: "views",
    label: "Vues panoramiques",
  },
  {
    id: "bathroom",
    label: "Salle de bain",
  },
  {
    id: "bedroom-linen",
    label: "Chambre et linge",
  },
  {
    id: "entertainment",
    label: "Divertissement",
  },
  {
    id: "climate",
    label: "Chauffage et climatisation",
  },
  {
    id: "safety",
    label: "Sécurité à la maison",
  },
  {
    id: "internet-workspace",
    label: "Internet et bureau",
  },
  {
    id: "kitchen-dining",
    label: "Cuisine et salle à manger",
  },
  {
    id: "location-features",
    label: "Caractéristiques de l’emplacement",
  },
  {
    id: "outdoor",
    label: "Extérieur",
  },
  {
    id: "parking-facilities",
    label: "Parking et installations",
  },
  {
    id: "services",
    label: "Services",
  },
] as const;

export type AccommodationAmenityCategory =
  (typeof accommodationAmenityCategories)[number]["id"];

export const accommodationAmenities = [
  // Vues panoramiques
  {
    key: "mountain-view",
    label: "Vue sur la montagne",
    category: "views",
    icon: "Mountain",
  },

  // Salle de bain
  {
    key: "hair-dryer",
    label: "Sèche-cheveux",
    category: "bathroom",
    icon: "Wind",
  },
  {
    key: "cleaning-products",
    label: "Produits de nettoyage",
    category: "bathroom",
    icon: "SprayCan",
  },
  {
    key: "shampoo",
    label: "Shampoing",
    category: "bathroom",
    icon: "Droplets",
  },
  {
    key: "body-soap",
    label: "Savon pour le corps",
    category: "bathroom",
    icon: "Bath",
  },
  {
    key: "hot-water",
    label: "Eau chaude",
    category: "bathroom",
    icon: "ThermometerSun",
  },
  {
    key: "shower-gel",
    label: "Gel douche",
    category: "bathroom",
    icon: "Droplets",
  },

  // Chambre et linge
  {
    key: "essentials",
    label: "Produits de base",
    category: "bedroom-linen",
    icon: "Package",
  },
  {
    key: "bed-linen",
    label: "Linge de lit",
    category: "bedroom-linen",
    icon: "BedDouble",
  },
  {
    key: "extra-pillows-blankets",
    label: "Oreillers et couvertures supplémentaires",
    category: "bedroom-linen",
    icon: "Layers",
  },
  {
    key: "blackout-shades",
    label: "Stores ou rideaux occultants",
    category: "bedroom-linen",
    icon: "Moon",
  },
  {
    key: "mosquito-net",
    label: "Moustiquaire",
    category: "bedroom-linen",
    icon: "Bug",
  },
  {
    key: "clothing-storage",
    label: "Espace de rangement pour les vêtements",
    category: "bedroom-linen",
    icon: "Shirt",
  },

  // Divertissement
  {
    key: "television",
    label: "Télévision",
    category: "entertainment",
    icon: "Tv",
  },
  {
    key: "audio-system",
    label: "Système audio",
    category: "entertainment",
    icon: "Speaker",
  },
  {
    key: "cinema",
    label: "Cinéma",
    category: "entertainment",
    icon: "Film",
  },

  // Chauffage et climatisation
  {
    key: "air-conditioning",
    label: "Climatisation",
    category: "climate",
    icon: "Snowflake",
  },
  {
    key: "heating",
    label: "Chauffage",
    category: "climate",
    icon: "Flame",
  },

  // Sécurité
  {
    key: "smoke-alarm",
    label: "Détecteur de fumée",
    category: "safety",
    icon: "Siren",
  },
  {
    key: "fire-extinguisher",
    label: "Extincteur",
    category: "safety",
    icon: "ShieldCheck",
  },

  // Internet et bureau
  {
    key: "wifi",
    label: "Wi-Fi",
    category: "internet-workspace",
    icon: "Wifi",
  },
  {
    key: "dedicated-workspace",
    label: "Espace de travail dédié",
    category: "internet-workspace",
    icon: "Laptop",
  },
  {
    key: "portable-wifi-router",
    label: "Routeur Wi-Fi portable",
    category: "internet-workspace",
    icon: "Router",
  },

  // Cuisine et salle à manger
  {
    key: "kitchen",
    label: "Cuisine",
    category: "kitchen-dining",
    icon: "CookingPot",
  },
  {
    key: "refrigerator",
    label: "Réfrigérateur",
    category: "kitchen-dining",
    icon: "Refrigerator",
  },
  {
    key: "microwave",
    label: "Four à micro-ondes",
    category: "kitchen-dining",
    icon: "Microwave",
  },
  {
    key: "cooking-basics",
    label: "Tout le nécessaire pour cuisiner",
    category: "kitchen-dining",
    icon: "CookingPot",
  },
  {
    key: "dishes-cutlery",
    label: "Vaisselle et couverts",
    category: "kitchen-dining",
    icon: "Utensils",
  },
  {
    key: "mini-fridge",
    label: "Mini réfrigérateur",
    category: "kitchen-dining",
    icon: "Refrigerator",
  },
  {
    key: "freezer",
    label: "Congélateur",
    category: "kitchen-dining",
    icon: "Snowflake",
  },
  {
    key: "coffee-maker",
    label: "Cafetière",
    category: "kitchen-dining",
    icon: "Coffee",
  },
  {
    key: "wine-glasses",
    label: "Verres à vin",
    category: "kitchen-dining",
    icon: "Wine",
  },
  {
    key: "stovetop",
    label: "Plaques de cuisson",
    category: "kitchen-dining",
    icon: "CookingPot",
  },
  {
    key: "barbecue-utensils",
    label: "Ustensiles de barbecue",
    category: "kitchen-dining",
    icon: "Utensils",
  },
  {
    key: "dining-table",
    label: "Table à manger",
    category: "kitchen-dining",
    icon: "Table",
  },
  {
    key: "coffee",
    label: "Café",
    category: "kitchen-dining",
    icon: "Coffee",
  },

  // Caractéristiques de l’emplacement
  {
    key: "laundromat-nearby",
    label: "Laverie automatique à proximité",
    category: "location-features",
    icon: "WashingMachine",
  },

  // Extérieur
  {
    key: "outdoor-furniture",
    label: "Mobilier d’extérieur",
    category: "outdoor",
    icon: "Armchair",
  },
  {
    key: "outdoor-dining",
    label: "Espace repas en plein air",
    category: "outdoor",
    icon: "UtensilsCrossed",
  },
  {
    key: "barbecue",
    label: "Barbecue",
    category: "outdoor",
    icon: "FlameKindling",
  },
  {
    key: "sun-loungers",
    label: "Chaises longues",
    category: "outdoor",
    icon: "Sun",
  },

  // Parking et installations
  {
    key: "free-parking-on-premises",
    category: "parking-facilities",
    label: "Stationnement gratuit",
    icon: "CircleParking",
  },
  {
    key: "free-street-parking",
    category: "parking-facilities",
    label: "Stationnement gratuit",
    icon: "Car",
  },
  {
    key: "jacuzzi",
    label: "Jacuzzi",
    category: "parking-facilities",
    icon: "Waves",
  },
  {
    key: "single-level-home",
    label: "Logement de plain-pied",
    category: "parking-facilities",
    icon: "House",
  },

  // Services
  {
    key: "lockbox",
    label: "Boîte à clé sécurisée",
    category: "services",
    icon: "LockKeyhole",
  },
] as const satisfies readonly {
  key: string;
  label: string;
  category: AccommodationAmenityCategory;
  icon: string;
}[];

export type AccommodationAmenityKey =
  (typeof accommodationAmenities)[number]["key"];

export type AccommodationAmenityDefinition =
  (typeof accommodationAmenities)[number];

export const getAccommodationAmenity = (key: string) =>
  accommodationAmenities.find((amenity) => amenity.key === key);

export const getAccommodationAmenitiesByCategory = (
  category: AccommodationAmenityCategory,
) => accommodationAmenities.filter((amenity) => amenity.category === category);
