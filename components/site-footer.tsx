import Link from "next/link";

import type { SiteLocale } from "@/types/content";

export function SiteFooter({ locale }: { locale: SiteLocale }) {
  const isZh = locale === "zh";
  const lang = `?lang=${locale}`;

  return (
    <footer className="site-footer">
      <div>
        <p className="footer-title">Gradient Radio</p>
        <p>
          {isZh
            ? "一个把机器学习播客节奏和课程路径结合起来的学习站。"
            : "A learning site that blends technical podcast energy with course-path structure."}
        </p>
      </div>
      <div className="footer-links">
        <Link href={`/episodes${lang}`}>{isZh ? "浏览内容" : "Browse episodes"}</Link>
        <Link href={`/resources${lang}`}>{isZh ? "学习资源" : "Resources"}</Link>
        <Link href={`/subscribe${lang}`}>{isZh ? "订阅更新" : "Subscribe"}</Link>
      </div>
    </footer>
  );
}
