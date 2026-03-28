"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import type { SiteLocale } from "@/types/content";

export function LocaleSwitcher({ locale }: { locale: SiteLocale }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const setLocale = (nextLocale: SiteLocale) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("lang", nextLocale);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="locale-switcher" aria-label="Language switcher">
      <button
        className={locale === "zh" ? "locale-chip active" : "locale-chip"}
        onClick={() => setLocale("zh")}
        type="button"
      >
        中文
      </button>
      <button
        className={locale === "en" ? "locale-chip active" : "locale-chip"}
        onClick={() => setLocale("en")}
        type="button"
      >
        EN
      </button>
    </div>
  );
}
