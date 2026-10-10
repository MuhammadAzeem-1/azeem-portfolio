import type { Metadata } from "next";
import { portfolio } from "@/data/portfolio";
import { GeistSans } from "geist/font/sans";
import { MarketProvider } from "@/components/market-provider";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(portfolio.siteUrl || "http://localhost:3000"),
  ...(portfolio.siteUrl ? { alternates: { canonical: "/" } } : {}),
  title: { default: `${portfolio.name} — Full-Stack Engineer`, template: `%s — ${portfolio.name}` },
  description: portfolio.introduction,
  openGraph: { type: "website", title: `${portfolio.name} — Full-Stack Engineer`, description: portfolio.introduction, locale: "en_US" },
  twitter: { card: "summary_large_image", title: `${portfolio.name} — Full-Stack Engineer`, description: portfolio.introduction },
  robots: { index: true, follow: true },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-scroll-behavior="smooth" className={GeistSans.variable}><body><a href="#main-content" className="skip-link">Skip to content</a><MarketProvider>{children}</MarketProvider></body></html>;
}
