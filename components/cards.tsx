import Link from "next/link";

import { t } from "@/lib/i18n";
import type { Episode, Resource, Series, SiteLocale } from "@/types/content";

export function SeriesCard({ item, locale }: { item: Series; locale: SiteLocale }) {
  return (
    <article className="card series-card">
      <div className="eyebrow-row">
        <span className="eyebrow">{item.theme}</span>
        <span className="eyebrow muted">{item.difficulty}</span>
      </div>
      <h3>{t(item.title, locale)}</h3>
      <p>{t(item.summary, locale)}</p>
      <p className="meta">{t(item.audience, locale)}</p>
      <Link className="text-link" href={`/series/${item.slug}?lang=${locale}`}>
        {locale === "zh" ? "查看学习路径" : "Open learning path"}
      </Link>
    </article>
  );
}

export function EpisodeCard({ item, locale }: { item: Episode; locale: SiteLocale }) {
  return (
    <article className="card episode-card">
      <div className="eyebrow-row">
        <span className="eyebrow">{item.theme}</span>
        <span className="eyebrow muted">{item.readingTimeText}</span>
      </div>
      <h3>{t(item.title, locale)}</h3>
      <p>{t(item.summary, locale)}</p>
      <div className="tag-row">
        {item.tags.map((tag) => (
          <span className="tag" key={tag}>
            {tag}
          </span>
        ))}
      </div>
      <Link className="text-link" href={`/episodes/${item.slug}?lang=${locale}`}>
        {locale === "zh" ? "阅读这一期" : "Read this episode"}
      </Link>
    </article>
  );
}

export function ResourceCard({ item, locale }: { item: Resource; locale: SiteLocale }) {
  return (
    <article className="card resource-card">
      <div className="eyebrow-row">
        <span className="eyebrow">{item.type}</span>
        <span className="eyebrow muted">{item.stage}</span>
      </div>
      <h3>{t(item.title, locale)}</h3>
      <p>{t(item.summary, locale)}</p>
      <a className="text-link" href={item.href} rel="noreferrer" target="_blank">
        {locale === "zh" ? "打开资源" : "Open resource"}
      </a>
    </article>
  );
}
