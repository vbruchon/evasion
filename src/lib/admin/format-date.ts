export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
};

export const formatRelativeDate = (date: Date) => {
  const now = new Date();

  const diffInMilliseconds = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
  const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

  if (diffInMinutes < 1) {
    return "à l’instant";
  }

  if (diffInMinutes < 60) {
    return `il y a ${diffInMinutes} min`;
  }

  if (diffInHours < 24) {
    return `il y a ${diffInHours} h`;
  }

  if (diffInDays === 1) {
    return "il y a 1 jour";
  }

  if (diffInDays < 30) {
    return `il y a ${diffInDays} jours`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);

  if (diffInMonths === 1) {
    return "il y a 1 mois";
  }

  if (diffInMonths < 12) {
    return `il y a ${diffInMonths} mois`;
  }

  const diffInYears = Math.floor(diffInMonths / 12);

  return diffInYears === 1 ? "il y a 1 an" : `il y a ${diffInYears} ans`;
};
