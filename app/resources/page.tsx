import type { Metadata } from "next";

import { ResourceCard } from "@/components/cards";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getAllResources } from "@/lib/content/queries";
import { resolveLocale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Resources"
};

export default async function ResourcesPage({
  searchParams
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = (await searchParams) ?? {};
  const locale = resolveLocale(Array.isArray(params.lang) ? params.lang[0] : params.lang);
  const resources = await getAllResources();
  const isZh = locale === "zh";

  return (
    <main className="page-shell">
      <SiteHeader locale={locale} />
      <section className="hero-card narrow-card">
        <p className="eyebrow">Resource Desk</p>
        <h1>{isZh ? "机器学习资源导航" : "Machine Learning resource desk"}</h1>
        <p>
          {isZh
            ? "把课程、论文、工具和数据集放进一个不断生长的导航层，帮助你更快组织学习顺序。"
            : "A curated desk for courses, papers, tools, and datasets so learners can move with more clarity and less noise."}
        </p>
      </section>
      <section className="card-grid two-up">
        {resources.map((item) => (
          <ResourceCard item={item} key={item.slug} locale={locale} />
        ))}
      </section>
      <SiteFooter locale={locale} />
    </main>
  );
}
