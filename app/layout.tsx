import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://gradient-radio.example.com"),
  title: {
    default: "Gradient Radio",
    template: "%s | Gradient Radio"
  },
  description:
    "A bilingual Machine Learning learning site with podcast-style lessons, guided series, and curated resources.",
  openGraph: {
    title: "Gradient Radio",
    description: "Machine Learning learning paths, podcast-style lessons, and curated resources.",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
