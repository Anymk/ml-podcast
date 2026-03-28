import type { Metadata } from "next";

import { SeriesCard } from "@/components/cards";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getAllSeries } from "@/lib/content/queries";
import { resolveLocale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Series"
};

export default async function SeriesPage({
  searchParams
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = (await searchParams) ?? {};
  const locale = resolveLocale(Array.isArray(params.lang) ? params.lang[0] : params.lang);
  const series = await getAllSeries();
  const isZh = locale === "zh";

  return (
    <main className="page-shell">
      <SiteHeader locale={locale} />
      <section className="hero-card narrow-card">
        <p className="eyebrow">Learning Series</p>
        <h1>{isZh ? "课程路径与专题系列" : "Learning paths and thematic series"}</h1>
        <p>
          {isZh
            ? "每个系列都像一张带顺序的学习地图，适合从零开始，或者系统补强已有知识。"
            : "Each series is designed as a sequenced map so learners can move from fundamentals to applied ML with less friction."}
        </p>
      </section>
      <section className="card-grid three-up">
        {series.map((item) => (
          <SeriesCard item={item} key={item.slug} locale={locale} />
        ))}
      </section>
      <SiteFooter locale={locale} />
    </main>
  );
}
