import type { MetadataRoute } from "next";

import { contentRepository } from "@/lib/content/repository";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://gradient-radio.example.com";
  const [series, episodes] = await Promise.all([
    contentRepository.getSeries(),
    contentRepository.getEpisodes()
  ]);

  return [
    "",
    "/series",
    "/episodes",
    "/resources",
    "/about",
    "/subscribe",
    ...series.map((item) => `/series/${item.slug}`),
    ...episodes.map((item) => `/episodes/${item.slug}`)
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date()
  }));
}
