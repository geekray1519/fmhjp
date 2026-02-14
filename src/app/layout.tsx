import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ToastProvider } from "@/components/ToastProvider";
import { BookmarksProvider } from "@/components/BookmarksProvider";
import { SearchHistoryProvider } from "@/components/SearchHistoryProvider";
import { AppShell } from "@/components/AppShell";
import { ResourceDetailProvider } from "@/components/ResourceDetailProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "FMHJP - 無料リソースガイド",
    template: "%s | FMHJP",
  },
  description:
    "インターネット上の無料リソースを集めた最大のコレクション。ソフトウェア、エンターテインメント、教育、プライバシーツールなど。",
  keywords: [
    "無料リソース",
    "フリーソフト",
    "無料ツール",
    "無料ストリーミング",
    "プライバシー",
    "広告ブロック",
    "ダウンロード",
    "FMHJP",
    "無料アプリ",
    "オープンソース",
    "VPN",
    "アニメ",
    "漫画",
    "ゲーム",
    "AI",
  ],
  metadataBase: new URL("https://fmhyjp.vercel.app"),
  openGraph: {
    title: "FMHJP - 無料リソースガイド",
    description:
      "インターネット上の無料リソースを集めた最大のコレクション。ソフトウェア、エンターテインメント、教育、プライバシーツールなど。",
    type: "website",
    locale: "ja_JP",
    siteName: "FMHJP",
    url: "https://fmhyjp.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "FMHJP - 無料リソースガイド",
    description: "インターネット上の無料リソースを集めた最大のコレクション。",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: "https://fmhyjp.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <meta name="google-adsense-account" content={process.env.NEXT_PUBLIC_ADSENSE_ID || ""} />
        <meta name="theme-color" content="#030712" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#f8fafc" media="(prefers-color-scheme: light)" />
        <link rel="dns-prefetch" href="https://www.google.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "FMHJP",
              alternateName: "FMHJP - 無料リソースガイド",
              url: "https://fmhyjp.vercel.app",
              description:
                "インターネット上の無料リソースを集めた最大のコレクション。ソフトウェア、エンターテインメント、教育、プライバシーツールなど。",
              inLanguage: "ja",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate:
                    "https://fmhyjp.vercel.app/search?q={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${notoSansJP.variable} antialiased`}
      >
        <ThemeProvider>
          <BookmarksProvider>
            <SearchHistoryProvider>
            <ResourceDetailProvider>
            <ToastProvider>
              <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded-lg focus:text-sm focus:font-medium"
              >
                メインコンテンツへスキップ
              </a>
              <AppShell>{children}</AppShell>
              <Analytics />
              <SpeedInsights />
            </ToastProvider>
            </ResourceDetailProvider>
            </SearchHistoryProvider>
          </BookmarksProvider>
        </ThemeProvider>
        {process.env.NEXT_PUBLIC_ADSENSE_ID && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
            data-overlays="bottom"
          />
        )}
      </body>
    </html>
  );
}
