import Link from "next/link";
import { ChevronRight, Home, Shield, Download, Globe, Smartphone, BookOpen, AlertTriangle, Layers } from "lucide-react";
import { categories } from "@/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "初心者ガイド - FMHJP",
  description: "インターネットの無料リソースを安全に活用するための初心者ガイド。広告ブロック、VPN、安全なダウンロードの基本を学びましょう。",
};

const steps = [
  {
    icon: Shield,
    title: "1. 広告ブロッカーをインストール",
    description: "まず最初に、広告ブロッカーをインストールしましょう。これにより、悪質な広告やポップアップから保護されます。",
    recommendation: "uBlock Origin が最もおすすめです。Firefox または Chrome のアドオンストアからインストールできます。",
    link: "/privacy",
    linkText: "広告ブロックツールを見る",
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: Globe,
    title: "2. 安全なブラウザを使う",
    description: "プライバシーを保護するブラウザを使いましょう。Firefox は最も推奨されるブラウザの一つです。",
    recommendation: "Firefox + uBlock Origin の組み合わせが基本です。さらに高度なプライバシーが必要なら Tor Browser を検討してください。",
    link: "/privacy",
    linkText: "プライバシーツールを見る",
    color: "from-blue-500 to-indigo-600",
  },
  {
    icon: AlertTriangle,
    title: "3. 使い捨てメールを活用",
    description: "サインアップが必要なサイトでは、使い捨てメールアドレスを使いましょう。個人のメールアドレスを守ることができます。",
    recommendation: "Temp Mail や Guerrilla Mail などの一時メールサービスを使用しましょう。",
    link: "/misc",
    linkText: "便利なツールを見る",
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: Download,
    title: "4. ダウンロードの安全性を確認",
    description: "ファイルをダウンロードする前に、必ずVirusTotalなどでスキャンしましょう。信頼できるソースからのみダウンロードしてください。",
    recommendation: "VirusTotal (virustotal.com) にファイルをアップロードして、安全性を確認する習慣をつけましょう。",
    link: "/downloading",
    linkText: "ダウンロードツールを見る",
    color: "from-cyan-500 to-blue-600",
  },
  {
    icon: Smartphone,
    title: "5. モバイルも保護する",
    description: "スマートフォンでも広告ブロックやプライバシー保護は重要です。Android では F-Droid、iOS では AltStore が役立ちます。",
    recommendation: "Android: ReVanced で YouTube の広告をブロック。iOS: AltStore でサイドロードアプリを活用。",
    link: "/mobile",
    linkText: "モバイルアプリを見る",
    color: "from-lime-500 to-green-600",
  },
  {
    icon: BookOpen,
    title: "6. 常に最新情報をチェック",
    description: "サイトのURLは変更されることがあります。FMHJPを定期的にチェックして、最新のリソースを確認しましょう。",
    recommendation: "ブックマークに追加して、定期的にアクセスしてください。",
    link: "/",
    linkText: "ホームに戻る",
    color: "from-violet-500 to-purple-600",
  },
];

const tips = [
  "🛡️ 複数の広告ブロッカーを同時に使わないでください。競合が発生する可能性があります。",
  "🔑 パスワードマネージャー（Bitwarden など）を使って、すべてのサイトで異なるパスワードを設定しましょう。",
  "📧 重要なアカウントには二要素認証（2FA）を必ず設定しましょう。",
  "🌐 VPN を使うことで、ISP からの監視を防ぐことができます。Proton VPN の無料プランがおすすめです。",
  "💾 大きなファイルのダウンロードには、JDownloader 2 などのダウンロードマネージャーを使いましょう。",
  "⚠️ 「ミラー」や「代替URL」を使う場合は、公式サイトから確認してからアクセスしてください。",
];

export default function BeginnersGuidePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="flex items-center gap-2 text-sm text-muted mb-8">
        <Link href="/" className="hover:text-foreground transition-colors flex items-center gap-1">
          <Home size={14} />
          ホーム
        </Link>
        <ChevronRight size={14} />
        <span className="text-foreground font-medium">初心者ガイド</span>
      </nav>

      <div className="mb-12">
        <h1 className="text-4xl font-extrabold mb-4">
          <span className="gradient-text">初心者ガイド</span>
        </h1>
        <p className="text-lg text-muted leading-relaxed">
          インターネット上の無料リソースを安全に活用するための基本を学びましょう。
          このガイドでは、最初にやるべきことをステップバイステップで解説します。
        </p>
        <div className="mt-3 flex items-center gap-3 text-xs text-muted">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-card border border-border">
            📖 約5分で読めます
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-card border border-border">
            {steps.length} ステップ
          </span>
        </div>
      </div>

      <div className="space-y-6 mb-16">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <div
              key={i}
              className="relative p-6 rounded-2xl border border-border bg-card hover:bg-card-hover transition-all duration-300 animate-fade-in group"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 bg-gradient-to-br ${step.color} rounded-2xl`} />
              <div className="relative z-10">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${step.color} text-white shrink-0`}>
                    <Icon size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl font-bold mb-2">{step.title}</h2>
                    <p className="text-sm text-muted leading-relaxed mb-3">{step.description}</p>
                    <div className="p-3 rounded-lg bg-accent/5 border border-accent/10 text-sm text-foreground leading-relaxed mb-4">
                      💡 {step.recommendation}
                    </div>
                    <Link
                      href={step.link}
                      className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline font-medium"
                    >
                      {step.linkText}
                      <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6">知っておくと便利なヒント</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {tips.map((tip, i) => (
            <div
              key={i}
              className="p-4 rounded-xl border border-border bg-card text-sm leading-relaxed animate-fade-in"
              style={{ animationDelay: `${(steps.length + i) * 60}ms` }}
            >
              {tip}
            </div>
          ))}
        </div>
      </div>

      <div className="mb-16">
        <div className="flex items-center gap-2 mb-6">
          <Layers size={20} className="text-accent" />
          <h2 className="text-2xl font-bold">全{categories.length}カテゴリ</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {categories.map((cat) => {
            const count = cat.subcategories.reduce((s, sub) => s + sub.resources.length, 0);
            return (
              <Link
                key={cat.id}
                href={`/${cat.slug}`}
                className="group flex items-center gap-3 p-3 rounded-xl border border-border bg-card hover:bg-card-hover hover:border-accent/30 transition-all"
              >
                <span className="text-xl shrink-0">{cat.icon}</span>
                <div className="min-w-0">
                  <div className="text-xs font-medium group-hover:text-accent transition-colors truncate">{cat.title}</div>
                  <div className="text-[10px] text-muted">{count.toLocaleString()} リソース</div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="text-center py-8 border-t border-border">
        <p className="text-sm text-muted mb-4">準備はできましたか？さっそくリソースを探しましょう！</p>
        <Link
          href="/search"
          className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-xl font-medium text-sm hover:opacity-90 transition-opacity"
        >
          リソースを検索する
          <ChevronRight size={16} />
        </Link>
      </div>
    </div>
  );
}
