import type { SiteLocale } from "@/types/content";

export function resolveLocale(input?: string): SiteLocale {
  return input === "en" ? "en" : "zh";
}

export function t<T>(value: { zh: T; en: T }, locale: SiteLocale): T {
  return value[locale] ?? value.en ?? value.zh;
}
