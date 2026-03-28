import Link from "next/link";

import { LocaleSwitcher } from "@/components/locale-switcher";
import type { SiteLocale } from "@/types/content";

export function SiteHeader({ locale }: { locale: SiteLocale }) {
  const lang = `?lang=${locale}`;

  return (
    <header className="site-header">
      <Link className="brand" href={`/${lang}`}>
        <span className="brand-mark">ML</span>
        <span>
          <strong>Gradient Radio</strong>
          <small>Machine Learning Learning Studio</small>
        </span>
      </Link>
      <nav className="site-nav">
        <Link href={`/series${lang}`}>Series</Link>
        <Link href={`/episodes${lang}`}>Episodes</Link>
        <Link href={`/resources${lang}`}>Resources</Link>
        <Link href={`/about${lang}`}>About</Link>
        <Link href={`/subscribe${lang}`}>Subscribe</Link>
      </nav>
      <LocaleSwitcher locale={locale} />
    </header>
  );
}
