import type { Metadata } from "next";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { resolveLocale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Subscribe"
};

export default async function SubscribePage({
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
      <section className="hero-card narrow-card subscribe-card">
        <p className="eyebrow">Newsletter</p>
        <h1>{isZh ? "订阅功能预留页" : "Subscription placeholder"}</h1>
        <p>
          {isZh
            ? "首版先保留订阅入口和表单样式，等你后续选定邮件服务后，再接 ConvertKit、Beehiiv 或自建 API。"
            : "This first version keeps the subscription experience in place, ready for a future email provider like ConvertKit, Beehiiv, or a custom API."}
        </p>
        <form className="subscribe-form">
          <input disabled placeholder={isZh ? "邮箱地址（暂未接入）" : "Email address (not wired yet)"} type="email" />
          <button disabled type="submit">
            {isZh ? "即将开放" : "Coming soon"}
          </button>
        </form>
      </section>
      <SiteFooter locale={locale} />
    </main>
  );
}
