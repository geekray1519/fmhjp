import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ToastProvider } from "@/components/ToastProvider";
import { AppShell } from "@/components/AppShell";

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
      </head>
      <body
        className={`${inter.variable} ${notoSansJP.variable} antialiased`}
      >
        <ThemeProvider>
          <ToastProvider>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded-lg focus:text-sm focus:font-medium"
            >
              メインコンテンツへスキップ
            </a>
            <AppShell>{children}</AppShell>
          </ToastProvider>
        </ThemeProvider>
        {process.env.NEXT_PUBLIC_ADSENSE_ID && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
