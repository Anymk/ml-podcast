import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { EpisodeCard } from "@/components/cards";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { contentRepository } from "@/lib/content/repository";
import { getRelatedEpisodes, renderEpisodeBody } from "@/lib/content/queries";
import { resolveLocale, t } from "@/lib/i18n";

export async function generateStaticParams() {
  const episodes = await contentRepository.getEpisodes();
  return episodes.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const episode = await contentRepository.getEpisodeBySlug(slug);
  if (!episode) {
    return { title: "Episode not found" };
  }

  return {
    title: episode.title.en,
    description: episode.summary.en,
    openGraph: {
      title: episode.title.en,
      description: episode.summary.en,
      type: "article"
    }
  };
}

export default async function EpisodeDetailPage({
  params,
  searchParams
}: {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { slug } = await params;
  const episode = await contentRepository.getEpisodeBySlug(slug);
  if (!episode) {
    notFound();
  }

  const query = (await searchParams) ?? {};
  const locale = resolveLocale(Array.isArray(query.lang) ? query.lang[0] : query.lang);
  const body = await renderEpisodeBody(episode.body);
  const related = await getRelatedEpisodes(episode);
  const isZh = locale === "zh";

  return (
    <main className="page-shell">
      <SiteHeader locale={locale} />
      <article className="article-shell">
        <header className="hero-card narrow-card article-hero">
          <div className="eyebrow-row">
            <span className="eyebrow">{episode.theme}</span>
            <span className="eyebrow muted">{episode.readingTimeText}</span>
          </div>
          <h1>{t(episode.title, locale)}</h1>
          <p className="hero-copy">{t(episode.summary, locale)}</p>
          <div className="meta-row">
            <span>{new Date(episode.publishedAt).toLocaleDateString(locale === "zh" ? "zh-CN" : "en-US")}</span>
            <span>{episode.duration}</span>
            <span>{episode.difficulty}</span>
          </div>
        </header>

        <section className="split-band article-grid">
          <div>
            <p className="eyebrow">Highlights</p>
            <ul className="bullet-list">
              {t(episode.highlights, locale).map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Reading List</p>
            <ul className="bullet-list">
              {episode.readingList.map((item) => (
                <li key={item.href}>
                  <a className="text-link" href={item.href} rel="noreferrer" target="_blank">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="article-prose">{body}</section>

        <section className="section-block">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Related</p>
              <h2>{isZh ? "继续学习" : "Continue learning"}</h2>
            </div>
            <Link className="text-link" href={`/series/${episode.seriesSlug}?lang=${locale}`}>
              {isZh ? "返回系列路径" : "Back to series"}
            </Link>
          </div>
          <div className="card-grid three-up">
            {related.map((item) => (
              <EpisodeCard item={item} key={item.slug} locale={locale} />
            ))}
          </div>
        </section>
      </article>
      <SiteFooter locale={locale} />
    </main>
  );
}
