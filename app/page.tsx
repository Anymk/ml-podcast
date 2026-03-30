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
            <strong>{String(data.totals.series).padStart(2, "0")}</strong>
            <span>{isZh ? "学习路径" : "Learning series"}</span>
          </div>
          <div className="stat-block">
            <strong>{String(data.totals.episodes).padStart(2, "0")}</strong>
            <span>{isZh ? "深度内容" : "Episodes"}</span>
          </div>
          <div className="stat-block">
            <strong>{String(data.totals.resources).padStart(2, "0")}</strong>
            <span>{isZh ? "精选资源" : "Curated resources"}</span>
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

      {data.beginnerCodeSeries ? (
        <section className="split-band">
          <div>
            <p className="eyebrow">ML + Code</p>
            <h2>
              {isZh
                ? "给 0 基础学习者准备的“边写代码边学机器学习”模块"
                : "A beginner-first module for learning Machine Learning by writing code."}
            </h2>
            <p className="hero-copy">
              {isZh
                ? "这个模块会从 Python、Notebook、最小训练流程和读代码习惯开始，帮助完全没基础的人把抽象概念落到实际代码里。"
                : "This module starts with Python, notebooks, tiny training loops, and code reading habits so complete beginners can anchor ML concepts in real code."}
            </p>
            <Link className="cta-button" href={`/series/${data.beginnerCodeSeries.slug}?lang=${locale}`}>
              {isZh ? "进入代码教学模块" : "Open the code-learning module"}
            </Link>
          </div>
          <div className="hero-panel">
            <div className="stat-block">
              <strong>{data.beginnerCodeSeries.difficulty}</strong>
              <span>{isZh ? "适合从零开始" : "Built for beginners"}</span>
            </div>
            <div className="stat-block">
              <strong>{data.beginnerCodeSeries.theme}</strong>
              <span>{isZh ? "代码导向学习路径" : "Code-first learning path"}</span>
            </div>
            <div className="stat-block">
              <strong>{isZh ? "3+" : "3+"}</strong>
              <span>{isZh ? "配套实操内容" : "Hands-on companion lessons"}</span>
            </div>
          </div>
        </section>
      ) : null}

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
