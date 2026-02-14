import Link from "next/link";
import { ChevronRight, Home, AlertTriangle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "利用規約 - FMHJP",
  description: "FMHJPの利用規約。サービスの説明、免責事項、知的財産権について。",
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="flex items-center gap-2 text-sm text-muted mb-8">
        <Link href="/" className="hover:text-foreground transition-colors flex items-center gap-1">
          <Home size={14} />
          ホーム
        </Link>
        <ChevronRight size={14} />
        <span className="text-foreground font-medium">利用規約</span>
      </nav>

      <div className="mb-12">
        <h1 className="text-4xl font-extrabold mb-4">
          <span className="gradient-text">利用規約</span>
        </h1>
        <p className="text-sm text-muted">最終更新日: 2026年2月14日</p>
      </div>

      <div className="space-y-8">
        {/* Introduction */}
        <section className="p-6 rounded-2xl border border-border bg-card">
          <div className="flex items-start gap-3 mb-4">
            <AlertTriangle size={20} className="text-accent mt-1 shrink-0" />
            <div>
              <h2 className="text-xl font-bold mb-2">利用規約について</h2>
              <p className="text-sm text-muted leading-relaxed">
                本利用規約は、FMHJP（以下「当サイト」）の利用に関する条件を定めています。
                当サイトを利用することで、本規約に同意したものとみなされます。
              </p>
            </div>
          </div>
        </section>

        {/* Service Description */}
        <section>
          <h2 className="text-2xl font-bold mb-4">サービスの説明</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-border bg-card text-sm leading-relaxed">
              <h3 className="font-semibold mb-2">当サイトについて</h3>
              <p className="text-muted">
                FMHJPは、インターネット上の無料リソースを日本語で紹介するキュレーションサイトです。
                ソフトウェア、エンターテインメント、教育、プライバシーツール、開発者ツールなど、
                様々なカテゴリの無料リソースを提供しています。
              </p>
            </div>

            <div className="p-4 rounded-xl border border-border bg-card text-sm leading-relaxed">
              <h3 className="font-semibold mb-2">サービス内容</h3>
              <ul className="list-disc list-inside space-y-2 text-muted">
                <li>無料リソースの紹介と検索機能</li>
                <li>カテゴリ別のリソース分類</li>
                <li>初心者向けガイドの提供</li>
                <li>定期的なコンテンツ更新</li>
              </ul>
            </div>
          </div>
        </section>

        {/* External Links Disclaimer */}
        <section>
          <h2 className="text-2xl font-bold mb-4">外部リンクの免責事項</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-border bg-card text-sm leading-relaxed">
              <h3 className="font-semibold mb-2">リンク先の責任</h3>
              <p className="text-muted mb-3">
                当サイトは、外部サイトへのリンクを提供しています。
                リンク先サイトの内容、安全性、正確性については、当サイトは一切の責任を負いません。
              </p>
              <p className="text-muted">
                リンク先サイトの利用は、ユーザー自身の判断と責任において行われます。
              </p>
            </div>

            <div className="p-4 rounded-xl border border-border bg-card text-sm leading-relaxed">
              <h3 className="font-semibold mb-2">リンク先の変更・削除</h3>
              <p className="text-muted">
                当サイトは、予告なくリンク先の追加、変更、削除を行うことがあります。
                リンク先が削除された場合、当サイトは責任を負いません。
              </p>
            </div>

            <div className="p-4 rounded-xl border border-border bg-card text-sm leading-relaxed">
              <h3 className="font-semibold mb-2">リンク先での問題</h3>
              <p className="text-muted">
                リンク先サイトでの問題（ウイルス感染、詐欺、著作権侵害など）について、
                当サイトは一切の責任を負いません。
              </p>
            </div>
          </div>
        </section>

        {/* Intellectual Property */}
        <section>
          <h2 className="text-2xl font-bold mb-4">知的財産権</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-border bg-card text-sm leading-relaxed">
              <h3 className="font-semibold mb-2">著作権</h3>
              <p className="text-muted mb-3">
                当サイトのコンテンツ（テキスト、画像、レイアウトなど）は、
                FMHJPまたはコンテンツ提供者の著作物です。
              </p>
              <p className="text-muted">
                ユーザーは、個人的な使用目的でのみ、当サイトのコンテンツを閲覧・利用できます。
                商用利用、複製、配布、改変は禁止されています。
              </p>
            </div>

            <div className="p-4 rounded-xl border border-border bg-card text-sm leading-relaxed">
              <h3 className="font-semibold mb-2">商標</h3>
              <p className="text-muted">
                「FMHJP」およびロゴは、FMHJPの商標です。
                ユーザーは、当サイトの許可なく、これらの商標を使用することはできません。
              </p>
            </div>
          </div>
        </section>

        {/* Usage Restrictions */}
        <section>
          <h2 className="text-2xl font-bold mb-4">利用制限</h2>
          <div className="p-4 rounded-xl border border-border bg-card text-sm leading-relaxed">
            <h3 className="font-semibold mb-3">禁止事項</h3>
            <ul className="list-disc list-inside space-y-2 text-muted">
              <li>当サイトのコンテンツの無断複製、配布、改変</li>
              <li>当サイトへの不正アクセス、ハッキング、スパム行為</li>
              <li>当サイトのサーバーに過度な負荷をかける行為</li>
              <li>違法な目的での当サイトの利用</li>
              <li>他のユーザーの権利を侵害する行為</li>
              <li>当サイトの運営を妨害する行為</li>
              <li>自動化ツール（ボット、スクレイパーなど）による無断アクセス</li>
            </ul>
          </div>
        </section>

        {/* Liability Disclaimer */}
        <section>
          <h2 className="text-2xl font-bold mb-4">免責事項</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-border bg-card text-sm leading-relaxed">
              <h3 className="font-semibold mb-2">情報の正確性</h3>
              <p className="text-muted">
                当サイトは、掲載情報の正確性、完全性、最新性を保証しません。
                情報は予告なく変更される場合があります。
              </p>
            </div>

            <div className="p-4 rounded-xl border border-border bg-card text-sm leading-relaxed">
              <h3 className="font-semibold mb-2">サービスの中断</h3>
              <p className="text-muted">
                当サイトは、予告なくサービスを中断、変更、終了することがあります。
                サービスの中断による損害について、当サイトは責任を負いません。
              </p>
            </div>

            <div className="p-4 rounded-xl border border-border bg-card text-sm leading-relaxed">
              <h3 className="font-semibold mb-2">損害賠償の免除</h3>
              <p className="text-muted">
                当サイトの利用に関連して生じた損害（直接的、間接的、特別な損害を含む）について、
                FMHJPは一切の責任を負いません。
              </p>
            </div>

            <div className="p-4 rounded-xl border border-border bg-card text-sm leading-relaxed">
              <h3 className="font-semibold mb-2">リソースの安全性</h3>
              <p className="text-muted">
                当サイトで紹介するリソースの安全性、合法性、有用性は保証されません。
                ユーザーは、自身の判断と責任において、リソースを利用してください。
              </p>
            </div>
          </div>
        </section>

        {/* Policy Changes */}
        <section>
          <h2 className="text-2xl font-bold mb-4">規約の変更</h2>
          <div className="p-4 rounded-xl border border-border bg-card text-sm leading-relaxed space-y-3">
            <p className="text-muted">
              当サイトは、本利用規約を予告なく変更することがあります。
              変更後の規約は、当ページに掲載された時点で有効となります。
            </p>
            <p className="text-muted">
              重要な変更がある場合は、当サイトで通知いたします。
              変更後も当サイトを利用することで、新しい規約に同意したものとみなされます。
            </p>
          </div>
        </section>

        {/* Governing Law */}
        <section>
          <h2 className="text-2xl font-bold mb-4">準拠法</h2>
          <div className="p-4 rounded-xl border border-border bg-card text-sm leading-relaxed">
            <p className="text-muted">
              本利用規約は、日本法に準拠します。
              本規約に関する紛争は、日本の裁判所の管轄に属します。
            </p>
          </div>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-2xl font-bold mb-4">お問い合わせ</h2>
          <div className="p-4 rounded-xl border border-border bg-card text-sm leading-relaxed">
            <p className="text-muted mb-3">
              利用規約に関するご質問やご不明な点がございましたら、
              お気軽にお問い合わせください。
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-accent hover:underline font-medium"
            >
              お問い合わせフォーム
              <ChevronRight size={14} />
            </Link>
          </div>
        </section>
      </div>

      <div className="text-center py-8 border-t border-border mt-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-xl font-medium text-sm hover:opacity-90 transition-opacity"
        >
          ホームに戻る
          <ChevronRight size={16} />
        </Link>
      </div>
    </div>
  );
}
