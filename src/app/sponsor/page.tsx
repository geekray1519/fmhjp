import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Check,
  ChevronRight,
  Home,
  Megaphone,
  Scale,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "掲載について",
  description: "FMHJPへの掲載プランのご案内。ツール制作者向けのPR掲載・広告掲載について。",
  alternates: { canonical: "https://fmhyjp.vercel.app/sponsor" },
};

const plans = [
  {
    name: "ベーシック",
    price: "¥3,000",
    unit: "/月",
    description: "まずは小さく検証したい方向けの入門プラン",
    features: [
      "カテゴリ内の通常掲載（1件）",
      "掲載文の編集（月1回まで）",
      "掲載開始前の内容確認",
      "月次レポート（表示回数）",
    ],
    featured: false,
  },
  {
    name: "スタンダード",
    price: "¥10,000",
    unit: "/月",
    description: "継続的に認知を広げたい制作者向けの人気プラン",
    features: [
      "カテゴリ上位枠への優先掲載（1件）",
      "「PR」表記付きでの注目表示",
      "掲載文の編集（月4回まで）",
      "月次レポート（表示・クリック）",
      "年間契約で20%OFF",
    ],
    featured: true,
  },
  {
    name: "プレミアム",
    price: "¥30,000",
    unit: "/月",
    description: "新機能リリースや大型キャンペーン向けの強化プラン",
    features: [
      "全カテゴリ横断の優先露出",
      "トップページ内の特設枠表示",
      "「広告」表記付きのプロモーション掲載",
      "掲載文の編集（回数無制限）",
      "月次レポート（表示・クリック・遷移）",
      "年間契約で20%OFF",
    ],
    featured: false,
  },
];

const stats = [
  { label: "掲載リソース総数", value: "15,380+" },
  { label: "カテゴリ数", value: "24" },
  { label: "毎月の更新", value: "継続実施" },
  { label: "日本語ユーザー中心", value: "高い親和性" },
];

export default function SponsorPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="flex items-center gap-2 text-sm text-muted mb-8">
        <Link href="/" className="hover:text-foreground transition-colors flex items-center gap-1">
          <Home size={14} />
          ホーム
        </Link>
        <ChevronRight size={14} />
        <span className="text-foreground font-medium">掲載について</span>
      </nav>

      <div className="mb-12">
        <h1 className="text-4xl font-extrabold mb-4">
          <span className="gradient-text">掲載について</span>
        </h1>
        <p className="text-lg text-muted leading-relaxed max-w-3xl">
          FMHJPでは、優れたツールを開発する制作者の皆さま向けに、
          PR掲載・広告掲載プランをご用意しています。
          日本語ユーザーへ的確に届けるための導線設計と、透明性の高い表示ポリシーを両立しています。
        </p>
      </div>

      <div className="space-y-10">
        <section className="p-6 rounded-2xl border border-border bg-card">
          <div className="flex items-start gap-3 mb-4">
            <Megaphone size={20} className="text-accent mt-1 shrink-0" />
            <div>
              <h2 className="text-xl font-bold mb-2">FMHJP掲載の特長</h2>
              <p className="text-sm text-muted leading-relaxed">
                継続的な更新体制の中で、実際に探しているユーザーへ自然な形でツールを届けられます。
                過度な誇張表現は避け、内容の正確性と実用性を重視した掲載運用を行っています。
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl border border-border bg-background/60 text-sm">
              <p className="font-semibold mb-1">日本語文脈で訴求</p>
              <p className="text-muted">国内ユーザーに伝わる表現で価値を説明します。</p>
            </div>
            <div className="p-4 rounded-xl border border-border bg-background/60 text-sm">
              <p className="font-semibold mb-1">長期運用しやすい料金</p>
              <p className="text-muted">年間契約で20%OFF、継続施策に向いています。</p>
            </div>
            <div className="p-4 rounded-xl border border-border bg-background/60 text-sm">
              <p className="font-semibold mb-1">透明性ある表記</p>
              <p className="text-muted">PR・広告の明示により信頼性を確保します。</p>
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 size={20} className="text-accent" />
            <h2 className="text-2xl font-bold">FMHJPのリーチ</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="p-5 rounded-2xl border border-border bg-card text-center">
                <p className="text-3xl font-bold mb-1">{stat.value}</p>
                <p className="text-xs text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between gap-3 mb-4">
            <h2 className="text-2xl font-bold">掲載プラン</h2>
            <p className="text-sm text-muted">すべて税込表示・年間契約で20%OFF</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {plans.map((plan) => (
              <article
                key={plan.name}
                className={`relative p-6 rounded-2xl border bg-card ${
                  plan.featured
                    ? "border-accent shadow-[0_0_0_1px_rgba(59,130,246,0.35)] lg:-translate-y-1"
                    : "border-border"
                }`}
              >
                {plan.featured && (
                  <span className="absolute -top-3 right-4 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-accent text-white text-xs font-semibold">
                    <Sparkles size={12} />
                    人気
                  </span>
                )}
                <div className="mb-4">
                  <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                  <p className="text-sm text-muted mb-4">{plan.description}</p>
                  <p className="flex items-end gap-1">
                    <span className="text-3xl font-extrabold">{plan.price}</span>
                    <span className="text-sm text-muted mb-1">{plan.unit}</span>
                  </p>
                </div>
                <ul className="space-y-2 mb-5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-muted leading-relaxed">
                      <Check size={16} className="text-accent mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-opacity ${
                    plan.featured ? "bg-accent text-white hover:opacity-90" : "bg-accent/10 text-accent hover:bg-accent/15"
                  }`}
                >
                  このプランで相談する
                  <ArrowRight size={16} />
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="p-6 rounded-2xl border border-border bg-card">
            <div className="flex items-start gap-3 mb-3">
              <ShieldCheck size={20} className="text-accent mt-1 shrink-0" />
              <div>
                <h2 className="text-lg font-bold mb-2">PR / 広告の表記について</h2>
                <p className="text-sm text-muted leading-relaxed">
                  有償掲載は読者に分かりやすく「PR」または「広告」と明示します。
                  編集コンテンツとの混同を避けるため、表示ラベル・掲載位置・説明文を明確に区分しています。
                </p>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-muted">
              <li className="flex items-start gap-2">
                <BadgeCheck size={16} className="text-accent mt-0.5 shrink-0" />
                <span>有償であることが識別できるラベル表記</span>
              </li>
              <li className="flex items-start gap-2">
                <BadgeCheck size={16} className="text-accent mt-0.5 shrink-0" />
                <span>通常掲載との視覚的な区分</span>
              </li>
              <li className="flex items-start gap-2">
                <BadgeCheck size={16} className="text-accent mt-0.5 shrink-0" />
                <span>掲載内容の事前確認プロセス</span>
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl border border-border bg-card">
            <div className="flex items-start gap-3 mb-3">
              <Scale size={20} className="text-accent mt-1 shrink-0" />
              <div>
                <h2 className="text-lg font-bold mb-2">法令遵守に関するご案内</h2>
                <p className="text-sm text-muted leading-relaxed">
                  掲載内容は景品表示法を含む関連法令への適合を前提としています。
                  根拠のない最上級表現や誤認を招く比較表現は掲載できません。
                </p>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-accent/5 border border-accent/10">
              <p className="text-xs text-muted leading-relaxed">
                例: 「必ず効果が出る」「業界No.1」など、客観的根拠の提示がない断定表現は
                掲載前に修正をお願いする場合があります。適切な根拠資料のご提示にご協力ください。
              </p>
            </div>
          </div>
        </section>

        <section className="p-6 rounded-2xl border border-border bg-card text-center">
          <h2 className="text-2xl font-bold mb-3">掲載をご検討中の方へ</h2>
          <p className="text-sm text-muted leading-relaxed max-w-2xl mx-auto mb-6">
            掲載目的や対象ユーザーに合わせて、最適なプランをご提案します。
            まずはお問い合わせページから、ツール概要とご希望の掲載時期をお知らせください。
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-xl font-medium text-sm hover:opacity-90 transition-opacity"
          >
            お問い合わせへ
            <ChevronRight size={16} />
          </Link>
        </section>
      </div>
    </div>
  );
}
