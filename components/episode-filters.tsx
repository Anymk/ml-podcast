"use client";

import { useMemo, useState } from "react";

import { EpisodeCard } from "@/components/cards";
import type { Episode, SiteLocale } from "@/types/content";

export function EpisodeFilters({ episodes, locale }: { episodes: Episode[]; locale: SiteLocale }) {
  const [theme, setTheme] = useState("all");
  const [difficulty, setDifficulty] = useState("all");
  const [tag, setTag] = useState("all");

  const themes = useMemo(() => ["all", ...new Set(episodes.map((item) => item.theme))], [episodes]);
  const difficulties = useMemo(
    () => ["all", ...new Set(episodes.map((item) => item.difficulty))],
    [episodes]
  );
  const tags = useMemo(() => ["all", ...new Set(episodes.flatMap((item) => item.tags))], [episodes]);

  const filtered = useMemo(() => {
    return episodes.filter((item) => {
      const matchTheme = theme === "all" || item.theme === theme;
      const matchDifficulty = difficulty === "all" || item.difficulty === difficulty;
      const matchTag = tag === "all" || item.tags.includes(tag);
      return matchTheme && matchDifficulty && matchTag;
    });
  }, [difficulty, episodes, tag, theme]);

  return (
    <div className="filters-shell">
      <div className="filter-bar">
        <label>
          <span>{locale === "zh" ? "主题" : "Theme"}</span>
          <select onChange={(event) => setTheme(event.target.value)} value={theme}>
            {themes.map((value) => (
              <option key={value} value={value}>
                {value === "all" ? (locale === "zh" ? "全部" : "All") : value}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>{locale === "zh" ? "难度" : "Difficulty"}</span>
          <select onChange={(event) => setDifficulty(event.target.value)} value={difficulty}>
            {difficulties.map((value) => (
              <option key={value} value={value}>
                {value === "all" ? (locale === "zh" ? "全部" : "All") : value}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>{locale === "zh" ? "标签" : "Tag"}</span>
          <select onChange={(event) => setTag(event.target.value)} value={tag}>
            {tags.map((value) => (
              <option key={value} value={value}>
                {value === "all" ? (locale === "zh" ? "全部" : "All") : value}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="card-grid two-up">
        {filtered.map((item) => (
          <EpisodeCard item={item} key={item.slug} locale={locale} />
        ))}
      </div>
    </div>
  );
}
