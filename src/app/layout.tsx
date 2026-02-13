import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
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
  metadataBase: new URL("https://fmhjp.vercel.app"),
  openGraph: {
    title: "FMHJP - 無料リソースガイド",
    description:
      "インターネット上の無料リソースを集めた最大のコレクション。ソフトウェア、エンターテインメント、教育、プライバシーツールなど。",
    type: "website",
    locale: "ja_JP",
    siteName: "FMHJP",
    url: "https://fmhjp.vercel.app",
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
    canonical: "https://fmhjp.vercel.app",
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
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${inter.variable} ${notoSansJP.variable} antialiased`}
      >
        <ThemeProvider>
          <AppShell>{children}</AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
