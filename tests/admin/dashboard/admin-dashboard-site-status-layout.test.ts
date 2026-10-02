import { describe, expect, it } from "vitest";

import {
  getAdminDashboardAttentionItemClassName,
  getAdminDashboardSiteStatusGridClassName,
} from "@/lib/admin/dashboard/site-status/admin-dashboard-site-status-layout";

describe("admin dashboard site status layout", () => {
  describe("getAdminDashboardSiteStatusGridClassName", () => {
    it.each([
      [1, ""],
      [2, "sm:grid-cols-2"],
      [3, "sm:grid-cols-2 xl:grid-cols-3"],
      [4, "sm:grid-cols-2 xl:grid-cols-4"],
      [5, "sm:grid-cols-2 xl:grid-cols-5"],
      [6, "sm:grid-cols-2 xl:grid-cols-3"],
      [7, "sm:grid-cols-2 xl:grid-cols-12"],
      [8, "sm:grid-cols-2 xl:grid-cols-4"],
      [9, "sm:grid-cols-2 xl:grid-cols-20"],
      [10, "sm:grid-cols-2 xl:grid-cols-5"],
      [11, "sm:grid-cols-2 xl:grid-cols-5"],
    ])("returns the expected grid for %i items", (count, expected) => {
      expect(getAdminDashboardSiteStatusGridClassName(count)).toBe(expected);
    });
  });

  describe("getAdminDashboardAttentionItemClassName", () => {
    it("splits seven items into four quarters then three thirds", () => {
      expect(getAdminDashboardAttentionItemClassName(0, 7)).toContain(
        "xl:col-span-3",
      );

      expect(getAdminDashboardAttentionItemClassName(3, 7)).toContain(
        "xl:col-span-3",
      );

      const firstSecondRowItem = getAdminDashboardAttentionItemClassName(4, 7);

      expect(firstSecondRowItem).toContain("xl:col-span-4");
      expect(firstSecondRowItem).toContain("xl:border-t");
      expect(firstSecondRowItem).toContain("xl:border-l-0");

      expect(getAdminDashboardAttentionItemClassName(5, 7)).toContain(
        "xl:border-l",
      );
    });

    it("splits nine items into five fifths then four quarters", () => {
      expect(getAdminDashboardAttentionItemClassName(0, 9)).toContain(
        "xl:col-span-4",
      );

      expect(getAdminDashboardAttentionItemClassName(4, 9)).toContain(
        "xl:col-span-4",
      );

      const firstSecondRowItem = getAdminDashboardAttentionItemClassName(5, 9);

      expect(firstSecondRowItem).toContain("xl:col-span-5");
      expect(firstSecondRowItem).toContain("xl:border-t");
      expect(firstSecondRowItem).toContain("xl:border-l-0");

      expect(getAdminDashboardAttentionItemClassName(6, 9)).toContain(
        "xl:border-l",
      );
    });

    it("adds mobile and tablet separators based on the item position", () => {
      const firstItem = getAdminDashboardAttentionItemClassName(0, 5);
      const secondItem = getAdminDashboardAttentionItemClassName(1, 5);
      const thirdItem = getAdminDashboardAttentionItemClassName(2, 5);

      expect(firstItem).not.toContain("border-t border-border/50");

      expect(secondItem).toContain("border-t border-border/50");
      expect(secondItem).toContain("sm:border-l");

      expect(thirdItem).toContain("sm:border-t");
      expect(thirdItem).toContain("sm:border-l-0");
    });
  });
});
