import type { MetadataRoute } from "next";

import { projects } from "@/data/portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");

  if (!siteUrl) {
    return [];
  }

  const staticRoutes = ["", "/projects", "/contact"];

  return [
    ...staticRoutes.map((path) => ({
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
      url: `${siteUrl}${path}`,
    })),
    ...projects.map((project) => ({
      changeFrequency: "monthly" as const,
      priority: 0.7,
      url: `${siteUrl}/projects/${project.slug}`,
    })),
  ];
}
