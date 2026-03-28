export type SiteLocale = "zh" | "en";

export type LocalizedField<T> = {
  zh: T;
  en: T;
};

export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export type ResourceType = "Course" | "Paper" | "Tool" | "Dataset" | "Guide";

export type Series = {
  slug: string;
  cover: string;
  theme: string;
  difficulty: Difficulty;
  order: number;
  audience: LocalizedField<string>;
  title: LocalizedField<string>;
  summary: LocalizedField<string>;
  outcomes: LocalizedField<string[]>;
};

export type EpisodeFrontmatter = {
  slug: string;
  seriesSlug: string;
  publishedAt: string;
  duration: string;
  cover: string;
  theme: string;
  difficulty: Difficulty;
  featured: boolean;
  tags: string[];
  title: LocalizedField<string>;
  summary: LocalizedField<string>;
  highlights: LocalizedField<string[]>;
  readingList: Array<{ label: string; href: string }>;
};

export type Episode = EpisodeFrontmatter & {
  body: string;
  readingTimeText: string;
};

export type Resource = {
  slug: string;
  type: ResourceType;
  href: string;
  stage: "Starter" | "Builder" | "Research";
  tags: string[];
  title: LocalizedField<string>;
  summary: LocalizedField<string>;
};

export interface ContentRepository {
  getSeries(): Promise<Series[]>;
  getSeriesBySlug(slug: string): Promise<Series | null>;
  getEpisodes(): Promise<Episode[]>;
  getEpisodeBySlug(slug: string): Promise<Episode | null>;
  getResources(): Promise<Resource[]>;
}
