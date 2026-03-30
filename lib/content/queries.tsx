import "server-only";

import { compileMDX } from "next-mdx-remote/rsc";

import { CodePlayground } from "@/components/code-playground";
import { contentRepository } from "@/lib/content/repository";
import type { Episode, Series } from "@/types/content";

export async function getHomeData() {
  const [series, episodes, resources] = await Promise.all([
    contentRepository.getSeries(),
    contentRepository.getEpisodes(),
    contentRepository.getResources()
  ]);

  const beginnerCodeSeries = series.find((item) => item.slug === "ml-code-lab") ?? null;

  return {
    featuredSeries: series.slice(0, 3),
    featuredEpisodes: episodes.filter((item) => item.featured).slice(0, 3),
    latestEpisodes: episodes.slice(0, 6),
    featuredResources: resources.slice(0, 4),
    beginnerCodeSeries,
    totals: {
      series: series.length,
      episodes: episodes.length,
      resources: resources.length
    }
  };
}

export async function getSeriesDetail(slug: string) {
  const [series, episodes] = await Promise.all([
    contentRepository.getSeriesBySlug(slug),
    contentRepository.getEpisodes()
  ]);

  if (!series) {
    return null;
  }

  return {
    series,
    episodes: episodes.filter((item) => item.seriesSlug === slug)
  };
}

export async function getRelatedEpisodes(current: Episode, limit = 3) {
  const episodes = await contentRepository.getEpisodes();
  return episodes
    .filter((item) => item.slug !== current.slug)
    .filter((item) => item.seriesSlug === current.seriesSlug || item.theme === current.theme)
    .slice(0, limit);
}

export async function renderEpisodeBody(source: string) {
  const compiled = await compileMDX({
    source,
    options: {
      parseFrontmatter: false
    },
    components: {
      h2: (props) => <h2 className="mdx-h2" {...props} />,
      h3: (props) => <h3 className="mdx-h3" {...props} />,
      p: (props) => <p className="mdx-p" {...props} />,
      ul: (props) => <ul className="mdx-ul" {...props} />,
      ol: (props) => <ol className="mdx-ol" {...props} />,
      li: (props) => <li className="mdx-li" {...props} />,
      a: (props) => <a className="mdx-a" {...props} />,
      blockquote: (props) => <blockquote className="mdx-quote" {...props} />,
      code: (props) => <code className="mdx-code" {...props} />,
      pre: (props) => <pre className="mdx-pre" {...props} />,
      CodePlayground
    }
  });

  return compiled.content;
}

export async function getAllSeries(): Promise<Series[]> {
  return contentRepository.getSeries();
}

export async function getAllEpisodes() {
  return contentRepository.getEpisodes();
}

export async function getAllResources() {
  return contentRepository.getResources();
}
