export const getAdminDashboardSiteStatusGridClassName = (count: number) => {
  switch (count) {
    case 1:
      return "";

    case 2:
      return "sm:grid-cols-2";

    case 3:
      return "sm:grid-cols-2 xl:grid-cols-3";

    case 4:
      return "sm:grid-cols-2 xl:grid-cols-4";

    case 5:
      return "sm:grid-cols-2 xl:grid-cols-5";

    case 6:
      return "sm:grid-cols-2 xl:grid-cols-3";

    case 7:
      return "sm:grid-cols-2 xl:grid-cols-12";

    case 8:
      return "sm:grid-cols-2 xl:grid-cols-4";

    case 9:
      return "sm:grid-cols-2 xl:grid-cols-20";

    case 10:
      return "sm:grid-cols-2 xl:grid-cols-5";

    default:
      return "sm:grid-cols-2 xl:grid-cols-5";
  }
};

const getDesktopItemClassName = (index: number, count: number) => {
  switch (count) {
    case 1:
      return "xl:border-l-0 xl:border-t-0";

    case 2:
    case 3:
    case 4:
    case 5:
      return index === 0
        ? "xl:border-l-0 xl:border-t-0"
        : "xl:border-l xl:border-t-0 xl:border-border/50";

    case 6:
      return [
        index >= 3 ? "xl:border-t xl:border-border/50" : "xl:border-t-0",
        index % 3 !== 0 ? "xl:border-l xl:border-border/50" : "xl:border-l-0",
      ].join(" ");

    case 7:
      return [
        index < 4 ? "xl:col-span-3" : "xl:col-span-4",
        index >= 4 ? "xl:border-t xl:border-border/50" : "xl:border-t-0",
        index === 0 || index === 4
          ? "xl:border-l-0"
          : "xl:border-l xl:border-border/50",
      ].join(" ");

    case 8:
      return [
        index >= 4 ? "xl:border-t xl:border-border/50" : "xl:border-t-0",
        index % 4 !== 0 ? "xl:border-l xl:border-border/50" : "xl:border-l-0",
      ].join(" ");

    case 9:
      return [
        index < 5 ? "xl:col-span-4" : "xl:col-span-5",
        index >= 5 ? "xl:border-t xl:border-border/50" : "xl:border-t-0",
        index === 0 || index === 5
          ? "xl:border-l-0"
          : "xl:border-l xl:border-border/50",
      ].join(" ");

    case 10:
    default:
      return [
        index >= 5 ? "xl:border-t xl:border-border/50" : "xl:border-t-0",
        index % 5 !== 0 ? "xl:border-l xl:border-border/50" : "xl:border-l-0",
      ].join(" ");
  }
};

export const getAdminDashboardAttentionItemClassName = (
  index: number,
  count: number,
) => {
  const mobileBorder = index > 0 ? "border-t border-border/50" : "";

  const tabletBorderTop =
    index >= 2 ? "sm:border-t sm:border-border/50" : "sm:border-t-0";

  const tabletBorderLeft =
    index % 2 === 1 ? "sm:border-l sm:border-border/50" : "sm:border-l-0";

  return [
    mobileBorder,
    tabletBorderTop,
    tabletBorderLeft,
    getDesktopItemClassName(index, count),
  ]
    .filter(Boolean)
    .join(" ");
};
