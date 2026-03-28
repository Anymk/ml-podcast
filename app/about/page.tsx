import type { Metadata } from "next";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { resolveLocale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "About"
};

export default async function AboutPage({
  searchParams
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = (await searchParams) ?? {};
  const locale = resolveLocale(Array.isArray(params.lang) ? params.lang[0] : params.lang);
  const isZh = locale === "zh";

  return (
    <main className="page-shell">
      <SiteHeader locale={locale} />
      <section className="hero-card narrow-card">
        <p className="eyebrow">About</p>
        <h1>{isZh ? "为什么要做这个学习站" : "Why this learning site exists"}</h1>
        <p>
          {isZh
            ? "Gradient Radio 试图解决一个常见问题：我们看了很多机器学习内容，却很难把它们串成一条真正可执行的学习路线。"
            : "Gradient Radio exists to solve a familiar problem: many people consume ML content, but struggle to turn it into a coherent study path."}
        </p>
      </section>
      <section className="split-band">
        <div>
          <p className="eyebrow">Principles</p>
          <ul className="bullet-list">
            <li>{isZh ? "像播客一样保持更新频率，像课程一样保证顺序感。" : "Publish with podcast rhythm, but structure like a course."}</li>
            <li>{isZh ? "每条内容都尽量给出延伸阅读与实践连接点。" : "Anchor every lesson with follow-up reading and practical next steps."}</li>
            <li>{isZh ? "保持轻量内容架构，为未来 CMS 和多作者扩展预留接口。" : "Keep the architecture light while leaving room for CMS and multi-author expansion."}</li>
          </ul>
        </div>
        <div className="timeline-panel">
          <p className="eyebrow">Team</p>
          <div className="timeline-item">
            <span>01</span>
            <div>
              <strong>{isZh ? "内容策划" : "Editorial direction"}</strong>
              <p>{isZh ? "围绕机器学习学习路径、实验方法和产品视角组织内容。" : "Curate content around learning paths, experimentation habits, and product-facing ML practice."}</p>
            </div>
          </div>
          <div className="timeline-item">
            <span>02</span>
            <div>
              <strong>{isZh ? "课程结构" : "Course structure"}</strong>
              <p>{isZh ? "把零散单集聚合成专题系列，降低学习中断成本。" : "Aggregate individual episodes into coherent series so learners can continue with less friction."}</p>
            </div>
          </div>
        </div>
      </section>
      <SiteFooter locale={locale} />
    </main>
  );
}
