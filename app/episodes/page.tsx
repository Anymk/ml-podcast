import type { Metadata } from "next";

import { EpisodeFilters } from "@/components/episode-filters";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getAllEpisodes } from "@/lib/content/queries";
import { resolveLocale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Episodes"
};

export default async function EpisodesPage({
  searchParams
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = (await searchParams) ?? {};
  const locale = resolveLocale(Array.isArray(params.lang) ? params.lang[0] : params.lang);
  const episodes = await getAllEpisodes();
  const isZh = locale === "zh";

  return (
    <main className="page-shell">
      <SiteHeader locale={locale} />
      <section className="hero-card narrow-card">
        <p className="eyebrow">Episodes</p>
        <h1>{isZh ? "单集内容库" : "Episode library"}</h1>
        <p>
          {isZh
            ? "这里的每一篇都像一集技术播客的文字增强版：有主线、有总结，也有延伸阅读。"
            : "Each entry is designed like an enhanced technical podcast episode with a clear narrative, practical highlights, and follow-up reading."}
        </p>
      </section>
      <EpisodeFilters episodes={episodes} locale={locale} />
      <SiteFooter locale={locale} />
    </main>
  );
}
