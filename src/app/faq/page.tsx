import Link from "next/link";
import { ChevronRight, CircleHelp, ExternalLink, HandHeart, Home, LifeBuoy, MessageCircle, ShieldCheck, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "よくある質問",
  description: "利用時によくある質問と回答を日本語でまとめています。",
  alternates: { canonical: "https://fmhyjp.vercel.app/faq" },
};

type FaqLink = {
  label: string;
  url: string;
};

type FaqItem = {
  question: string;
  answer: string;
  icon: LucideIcon;
  links?: FaqLink[];
};

const faqItems: FaqItem[] = [
  {
    question: "投稿が少なく見えるのはなぜですか？",
    answer:
      "更新の中心はウェブ版で、掲載リンクは継続的に追加・更新されています。新着情報の追跡は更新ページを確認してください。",
    icon: CircleHelp,
    links: [
      { label: "サイト本体", url: "https://fmhyjp.vercel.app/" },
      { label: "更新情報", url: "https://redd.it/1pl8vl0" },
    ],
  },
  {
    question: "掲載されているサイトは安全ですか？",
    answer:
      "掲載前に確認を行っていますが、最終的な安全確認は利用者側でも実施してください。ファイルは実行前にスキャンする運用を推奨します。",
    icon: ShieldCheck,
  },
  {
    question: "サイトが開けないときはどうすればよいですか？",
    answer:
      "回線・DNS・ブラウザ設定の影響で表示できないことがあります。接続トラブル向けの手順を順に試し、必要であればバックアップ情報を確認してください。",
    icon: LifeBuoy,
    links: [
      { label: "接続トラブル対処", url: "https://rentry.co/7vycxgn2" },
      { label: "バックアップ情報", url: "https://github.com/fmhy/FMHY/wiki/Backups" },
    ],
  },
  {
    question: "どこから問い合わせできますか？",
    answer:
      "提案・修正依頼・質問はコミュニティ窓口から受け付けています。内容が具体的だと反映までが速くなります。",
    icon: MessageCircle,
    links: [
      { label: "Discord", url: "https://github.com/fmhy/FMHY/wiki/FMHY-Discord" },
      { label: "Mod Messages", url: "https://www.reddit.com/message/compose/?to=/r/FREEMEDIAHECKYEAH" },
    ],
  },
  {
    question: "内容の編集提案はできますか？",
    answer:
      "可能です。誤りの修正や新規リンクの提案は歓迎されます。再現手順や根拠を添えるとレビューしやすくなります。",
    icon: Wrench,
    links: [
      { label: "Pull Requests", url: "https://github.com/fmhy/FMHYedit" },
      { label: "Discord 提案窓口", url: "https://github.com/fmhy/FMHY/wiki/FMHY-Discord" },
    ],
  },
  {
    question: "寄付は受け付けていますか？",
    answer: "寄付は受け付けていません。運営は収益目的ではなく、継続的な公開と改善を目的に行われています。",
    icon: HandHeart,
  },
  {
    question: "このプロジェクトはいつ開始されましたか？",
    answer: "公開プロジェクトとしての開始時期は 2018 年 4 月 29 日です。",
    icon: CircleHelp,
    links: [{ label: "開始時期の記録", url: "https://i.ibb.co/VJQmQ9t/image.png" }],
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function FaqPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <nav className="flex items-center gap-2 text-sm text-muted mb-8">
        <Link href="/" className="hover:text-foreground transition-colors flex items-center gap-1">
          <Home size={14} />
          ホーム
        </Link>
        <ChevronRight size={14} />
        <span className="text-foreground font-medium">よくある質問</span>
      </nav>

      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-4">
          <span className="gradient-text">よくある質問</span>
        </h1>
        <p className="text-lg text-muted leading-relaxed">
          初めて利用するときに迷いやすいポイントを、要点だけ先に確認できる形で整理しています。
        </p>
      </div>

      <section className="space-y-4">
        {faqItems.map((item, i) => {
          const Icon = item.icon;
          return (
            <article
              key={item.question}
              className="p-5 rounded-2xl border border-border bg-card hover:bg-card-hover transition-all animate-fade-in"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="p-2.5 rounded-xl bg-accent/10 text-accent shrink-0">
                  <Icon size={18} />
                </div>
                <h2 className="text-lg font-bold leading-tight">{item.question}</h2>
              </div>
              <p className="text-sm text-muted leading-relaxed mb-3">{item.answer}</p>
              {item.links && item.links.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {item.links.map((linkItem) => (
                    <a
                      key={`${item.question}-${linkItem.url}`}
                      href={linkItem.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-background text-xs hover:border-accent/30 hover:text-accent transition-colors"
                    >
                      {linkItem.label}
                      <ExternalLink size={12} />
                    </a>
                  ))}
                </div>
              )}
            </article>
          );
        })}
      </section>
    </div>
  );
}
