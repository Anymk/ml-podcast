import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { EpisodeCard } from "@/components/cards";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { contentRepository } from "@/lib/content/repository";
import { getSeriesDetail } from "@/lib/content/queries";
import { resolveLocale, t } from "@/lib/i18n";

export async function generateStaticParams() {
  const series = await contentRepository.getSeries();
  return series.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const detail = await getSeriesDetail(slug);
  if (!detail) {
    return { title: "Series not found" };
  }

  return {
    title: detail.series.title.en,
    description: detail.series.summary.en
  };
}

export default async function SeriesDetailPage({
  params,
  searchParams
}: {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { slug } = await params;
  const detail = await getSeriesDetail(slug);
  if (!detail) {
    notFound();
  }

  const query = (await searchParams) ?? {};
  const locale = resolveLocale(Array.isArray(query.lang) ? query.lang[0] : query.lang);
  const isZh = locale === "zh";

  return (
    <main className="page-shell">
      <SiteHeader locale={locale} />
      <section className="hero-card hero-grid">
        <div>
          <p className="eyebrow">{detail.series.theme}</p>
          <h1>{t(detail.series.title, locale)}</h1>
          <p className="hero-copy">{t(detail.series.summary, locale)}</p>
        </div>
        <div className="hero-panel">
          <div className="stat-block">
            <strong>{detail.episodes.length.toString().padStart(2, "0")}</strong>
            <span>{isZh ? "章节内容" : "Episodes"}</span>
          </div>
          <div className="stat-block">
            <strong>{detail.series.difficulty}</strong>
            <span>{isZh ? "难度级别" : "Difficulty"}</span>
          </div>
          <div className="stat-block">
            <strong>{t(detail.series.audience, locale)}</strong>
            <span>{isZh ? "适合人群" : "Best for"}</span>
          </div>
        </div>
      </section>

      <section className="split-band">
        <div>
          <p className="eyebrow">Outcomes</p>
          <h2>{isZh ? "完成这条路径后，你将能够" : "What you will be able to do after this path"}</h2>
          <ul className="bullet-list">
            {t(detail.series.outcomes, locale).map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
        <div className="timeline-panel">
          <p className="eyebrow">Roadmap</p>
          {detail.episodes.map((episode, index) => (
            <div className="timeline-item" key={episode.slug}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <strong>{t(episode.title, locale)}</strong>
                <p>{t(episode.summary, locale)}</p>
                <Link className="text-link" href={`/episodes/${episode.slug}?lang=${locale}`}>
                  {isZh ? "查看内容" : "Open lesson"}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <h2>{isZh ? "系列内容" : "Series episodes"}</h2>
        </div>
        <div className="card-grid two-up">
          {detail.episodes.map((item) => (
            <EpisodeCard item={item} key={item.slug} locale={locale} />
          ))}
        </div>
      </section>
      <SiteFooter locale={locale} />
    </main>
  );
}
