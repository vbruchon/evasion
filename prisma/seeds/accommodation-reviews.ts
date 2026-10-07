const DAY_IN_MS = 24 * 60 * 60 * 1000;

const daysAgo = (days: number) => new Date(Date.now() - days * DAY_IN_MS);

type SeedReview = {
  authorName: string;
  rating: number;
  comment: string;
  reviewedAt: Date;
};

type AccommodationReviewSeed = {
  slug: string;
  lastReviewsImportAt: Date;
  reviews: SeedReview[];
};

export const accommodationReviewSeeds: AccommodationReviewSeed[] = [
  {
    slug: "la-cabane",
    lastReviewsImportAt: daysAgo(4),
    reviews: [
      {
        authorName: "Camille",
        rating: 5,
        comment:
          "Une vraie parenthèse au milieu des arbres. La cabane est chaleureuse et le bain chaud sur la terrasse est parfait en fin de journée.",
        reviewedAt: daysAgo(18),
      },
      {
        authorName: "Julien",
        rating: 5,
        comment:
          "On cherchait surtout du calme et c’est exactement ce qu’on a trouvé. Très belle ambiance à l’intérieur et forêt magnifique autour.",
        reviewedAt: daysAgo(32),
      },
      {
        authorName: "Manon",
        rating: 5,
        comment:
          "Le logement est encore plus agréable que sur les photos. Réveil avec les arbres juste derrière les vitres, superbe.",
        reviewedAt: daysAgo(51),
      },
      {
        authorName: "Thomas",
        rating: 4,
        comment:
          "Très beau séjour et beaucoup d’intimité. Le petit chemin d’accès demande juste de bonnes chaussures lorsqu’il a plu.",
        reviewedAt: daysAgo(73),
      },
      {
        authorName: "Élodie",
        rating: 5,
        comment:
          "Deux nuits hors du temps. Tout est pensé pour profiter du lieu sans avoir envie de repartir.",
        reviewedAt: daysAgo(96),
      },
      {
        authorName: "Nicolas",
        rating: 5,
        comment:
          "Cabane très confortable, environnement superbe et bain chaud vraiment appréciable le soir.",
        reviewedAt: daysAgo(128),
      },
    ],
  },

  {
    slug: "le-chalet",
    lastReviewsImportAt: daysAgo(45),
    reviews: [
      {
        authorName: "Sarah",
        rating: 5,
        comment:
          "La vue depuis le salon est incroyable. On a passé une bonne partie du séjour simplement à profiter du paysage.",
        reviewedAt: daysAgo(22),
      },
      {
        authorName: "Maxime",
        rating: 5,
        comment:
          "Très beau chalet, confortable et lumineux. Le bain chaud face aux montagnes est clairement le gros plus.",
        reviewedAt: daysAgo(46),
      },
      {
        authorName: "Laura",
        rating: 4,
        comment:
          "Séjour très agréable dans un cadre magnifique. Route un peu sinueuse pour arriver mais cela vaut largement le détour.",
        reviewedAt: daysAgo(69),
      },
      {
        authorName: "Antoine",
        rating: 5,
        comment:
          "Superbe week-end. Le bois, les grandes baies vitrées et la terrasse donnent vraiment une ambiance de refuge.",
        reviewedAt: daysAgo(103),
      },
      {
        authorName: "Pauline",
        rating: 5,
        comment:
          "Très calme, très propre et parfaitement situé pour partir marcher dans le Vercors.",
        reviewedAt: daysAgo(137),
      },
      {
        authorName: "Hugo",
        rating: 5,
        comment:
          "Une adresse que l’on garderait volontiers pour soi. Le coucher de soleil depuis la terrasse était magnifique.",
        reviewedAt: daysAgo(171),
      },
    ],
  },

  {
    slug: "lecrin",
    lastReviewsImportAt: daysAgo(3),
    reviews: [
      {
        authorName: "Clara",
        rating: 5,
        comment:
          "Architecture magnifique et impressionnante sans être froide. La vue sur les falaises est présente partout.",
        reviewedAt: daysAgo(15),
      },
      {
        authorName: "Alexandre",
        rating: 5,
        comment:
          "Un lieu vraiment différent. On a adoré le contraste entre la pierre, le bois et le paysage très minéral.",
        reviewedAt: daysAgo(37),
      },
      {
        authorName: "Inès",
        rating: 5,
        comment:
          "Le bassin et la terrasse sont superbes. Très belle lumière dans le logement du matin au soir.",
        reviewedAt: daysAgo(63),
      },
      {
        authorName: "Romain",
        rating: 4,
        comment:
          "Très belle expérience et cadre exceptionnel. Quelques kilomètres de petite route avant d’arriver mais le calme est total.",
        reviewedAt: daysAgo(91),
      },
      {
        authorName: "Amandine",
        rating: 5,
        comment:
          "Tout est très épuré sans manquer de confort. Le paysage devient vraiment une partie du logement.",
        reviewedAt: daysAgo(126),
      },
      {
        authorName: "Louis",
        rating: 5,
        comment:
          "Probablement l’un des logements les plus originaux dans lesquels nous avons séjourné.",
        reviewedAt: daysAgo(159),
      },
    ],
  },

  {
    slug: "la-bergerie",
    lastReviewsImportAt: daysAgo(6),
    reviews: [
      {
        authorName: "Marion",
        rating: 5,
        comment:
          "Beaucoup de charme et une rénovation très réussie. On retrouve l’esprit de l’ancienne maison tout en ayant tout le confort.",
        reviewedAt: daysAgo(12),
      },
      {
        authorName: "Baptiste",
        rating: 5,
        comment:
          "La terrasse et le bassin sont parfaits pour profiter des journées ensoleillées. Très beau coin de Drôme.",
        reviewedAt: daysAgo(34),
      },
      {
        authorName: "Julie",
        rating: 5,
        comment:
          "La pierre, la cheminée et les grandes ouvertures donnent énormément de caractère à la maison.",
        reviewedAt: daysAgo(58),
      },
      {
        authorName: "Florian",
        rating: 4,
        comment:
          "Très agréable séjour. L’endroit est paisible tout en restant assez proche des villages alentours.",
        reviewedAt: daysAgo(84),
      },
      {
        authorName: "Anaïs",
        rating: 5,
        comment:
          "On a adoré prendre le petit-déjeuner dehors face aux collines. Une maison où l’on se sent bien immédiatement.",
        reviewedAt: daysAgo(119),
      },
      {
        authorName: "Mathieu",
        rating: 5,
        comment:
          "Très beau mélange entre ancien et contemporain. La cheminée est parfaite pour les soirées plus fraîches.",
        reviewedAt: daysAgo(151),
      },
    ],
  },

  {
    slug: "le-belvedere",
    lastReviewsImportAt: daysAgo(5),
    reviews: [
      {
        authorName: "Charlotte",
        rating: 5,
        comment:
          "La vue est assez spectaculaire. Dès l’entrée, toute la façade vitrée donne directement sur les montagnes.",
        reviewedAt: daysAgo(19),
      },
      {
        authorName: "Victor",
        rating: 5,
        comment:
          "Architecture incroyable, très confortable et surtout beaucoup d’intimité malgré les grandes surfaces vitrées.",
        reviewedAt: daysAgo(41),
      },
      {
        authorName: "Léa",
        rating: 5,
        comment:
          "Le spa face au paysage est exceptionnel, surtout lorsque la lumière tombe sur les reliefs en fin de journée.",
        reviewedAt: daysAgo(66),
      },
      {
        authorName: "Adrien",
        rating: 5,
        comment:
          "Un séjour vraiment marquant. La chambre et la salle de bain profitent elles aussi de la vue.",
        reviewedAt: daysAgo(94),
      },
      {
        authorName: "Mélanie",
        rating: 4,
        comment:
          "Très beau lieu, design et calme. L’accès est un peu isolé mais c’est aussi ce qui fait son charme.",
        reviewedAt: daysAgo(123),
      },
      {
        authorName: "Quentin",
        rating: 5,
        comment:
          "On a passé deux jours presque entièrement sur place. Difficile de se lasser d’un tel panorama.",
        reviewedAt: daysAgo(162),
      },
    ],
  },
];
