import Link from "next/link";

import { EpisodeCard, ResourceCard, SeriesCard } from "@/components/cards";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getHomeData } from "@/lib/content/queries";
import { resolveLocale } from "@/lib/i18n";

export default async function Home({
  searchParams
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = (await searchParams) ?? {};
  const locale = resolveLocale(Array.isArray(params.lang) ? params.lang[0] : params.lang);
  const data = await getHomeData();
  const isZh = locale === "zh";

  return (
    <main className="page-shell">
      <SiteHeader locale={locale} />
      <section className="hero-card hero-grid">
        <div>
          <p className="eyebrow">Machine Learning Learning Studio</p>
          <h1>
            {isZh
              ? "把技术播客的节奏，变成真正能学完的机器学习路径"
              : "Turn podcast energy into Machine Learning paths you can actually finish."}
          </h1>
          <p className="hero-copy">
            {isZh
              ? "Gradient Radio 用系列课程、单集深挖和精选资源，帮你从入门走到可独立构建模型、评估实验和设计产品原型。"
              : "Gradient Radio combines guided series, deep-dive episodes, and curated resources so you can move from theory to practical ML building."}
          </p>
          <div className="hero-actions">
            <Link className="cta-button" href={`/series?lang=${locale}`}>
              {isZh ? "开始学习路径" : "Start a learning path"}
            </Link>
            <Link className="ghost-button" href={`/episodes?lang=${locale}`}>
              {isZh ? "浏览最新内容" : "Browse latest episodes"}
            </Link>
          </div>
        </div>
        <div className="hero-panel">
          <div className="stat-block">
            <strong>02</strong>
            <span>{isZh ? "首发课程路径" : "Launch series"}</span>
          </div>
          <div className="stat-block">
            <strong>03</strong>
            <span>{isZh ? "示例深度内容" : "Deep-dive episodes"}</span>
          </div>
          <div className="stat-block">
            <strong>04</strong>
            <span>{isZh ? "精选学习资源" : "Curated resources"}</span>
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Featured Series</p>
            <h2>{isZh ? "按路径学习，而不是按碎片收藏" : "Learn in paths, not in disconnected tabs."}</h2>
          </div>
          <Link className="text-link" href={`/series?lang=${locale}`}>
            {isZh ? "查看全部路径" : "View all series"}
          </Link>
        </div>
        <div className="card-grid three-up">
          {data.featuredSeries.map((item) => (
            <SeriesCard item={item} key={item.slug} locale={locale} />
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Latest Episodes</p>
            <h2>{isZh ? "像听技术播客一样更新，但每期都能沉淀成知识节点" : "Podcast-style publishing with article-grade learning value."}</h2>
          </div>
        </div>
        <div className="card-grid three-up">
          {data.latestEpisodes.map((item) => (
            <EpisodeCard item={item} key={item.slug} locale={locale} />
          ))}
        </div>
      </section>

      <section className="split-band">
        <div>
          <p className="eyebrow">Resource Desk</p>
          <h2>{isZh ? "把工具、论文、课程和数据集放进同一张导航地图" : "Keep tools, papers, datasets, and guides in one learning map."}</h2>
        </div>
        <div className="card-grid two-up compact-grid">
          {data.featuredResources.map((item) => (
            <ResourceCard item={item} key={item.slug} locale={locale} />
          ))}
        </div>
      </section>

      <section className="newsletter-band">
        <div>
          <p className="eyebrow">Newsletter</p>
          <h2>{isZh ? "每周收到 1 份机器学习学习清单" : "Receive one focused ML study digest every week."}</h2>
          <p>
            {isZh
              ? "首版先保留订阅入口和说明，不接真实邮件服务。"
              : "The first version keeps subscription UX in place without wiring a real email backend yet."}
          </p>
        </div>
        <Link className="cta-button" href={`/subscribe?lang=${locale}`}>
          {isZh ? "查看订阅说明" : "Open subscribe page"}
        </Link>
      </section>
      <SiteFooter locale={locale} />
    </main>
  );
}
