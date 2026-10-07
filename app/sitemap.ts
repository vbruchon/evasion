import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/seo/site-url";

const publicRoutes = [
  {
    path: "/",
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    path: "/logements",
    changeFrequency: "weekly",
    priority: 0.9,
  },
  {
    path: "/a-propos",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/avis",
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    path: "/faq",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/contact",
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    path: "/mentions-legales",
    changeFrequency: "yearly",
    priority: 0.2,
  },
  {
    path: "/politique-de-confidentialite",
    changeFrequency: "yearly",
    priority: 0.2,
  },
] as const satisfies readonly {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}[];

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((route) => ({
    url: new URL(route.path, siteUrl).toString(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
