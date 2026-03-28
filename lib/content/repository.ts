import "server-only";

import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

import type {
  ContentRepository,
  Episode,
  EpisodeFrontmatter,
  Resource,
  Series
} from "@/types/content";

const CONTENT_ROOT = path.join(process.cwd(), "content");
const SERIES_ROOT = path.join(CONTENT_ROOT, "series");
const EPISODES_ROOT = path.join(CONTENT_ROOT, "episodes");
const RESOURCES_FILE = path.join(CONTENT_ROOT, "resources.json");

class LocalFileContentRepository implements ContentRepository {
  async getSeries(): Promise<Series[]> {
    const entries = await fs.readdir(SERIES_ROOT);
    const records = await Promise.all(
      entries
        .filter((entry) => entry.endsWith(".json"))
        .map(async (entry) => {
          const filePath = path.join(SERIES_ROOT, entry);
          const source = await fs.readFile(filePath, "utf8");
          return JSON.parse(source) as Series;
        })
    );

    return records.sort((left, right) => left.order - right.order);
  }

  async getSeriesBySlug(slug: string): Promise<Series | null> {
    const series = await this.getSeries();
    return series.find((item) => item.slug === slug) ?? null;
  }

  async getEpisodes(): Promise<Episode[]> {
    const entries = await fs.readdir(EPISODES_ROOT);
    const records = await Promise.all(
      entries
        .filter((entry) => entry.endsWith(".mdx"))
        .map(async (entry) => {
          const filePath = path.join(EPISODES_ROOT, entry);
          const source = await fs.readFile(filePath, "utf8");
          const { data, content } = matter(source);
          const stats = readingTime(content);

          return {
            ...(data as EpisodeFrontmatter),
            body: content,
            readingTimeText: stats.text
          } satisfies Episode;
        })
    );

    return records.sort(
      (left, right) => new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime()
    );
  }

  async getEpisodeBySlug(slug: string): Promise<Episode | null> {
    const episodes = await this.getEpisodes();
    return episodes.find((item) => item.slug === slug) ?? null;
  }

  async getResources(): Promise<Resource[]> {
    const source = await fs.readFile(RESOURCES_FILE, "utf8");
    return JSON.parse(source) as Resource[];
  }
}

export const contentRepository: ContentRepository = new LocalFileContentRepository();
