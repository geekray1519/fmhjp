import Link from "next/link";
import { ChevronRight, Home, Lock, Mail } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー - FMHJP",
  description: "FMHJPのプライバシーポリシー。Cookie使用、個人情報の取り扱い、Google AdSenseについて。",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="flex items-center gap-2 text-sm text-muted mb-8">
        <Link href="/" className="hover:text-foreground transition-colors flex items-center gap-1">
          <Home size={14} />
          ホーム
        </Link>
        <ChevronRight size={14} />
        <span className="text-foreground font-medium">プライバシーポリシー</span>
      </nav>

      <div className="mb-12">
        <h1 className="text-4xl font-extrabold mb-4">
          <span className="gradient-text">プライバシーポリシー</span>
        </h1>
        <p className="text-sm text-muted">最終更新日: 2026年2月13日</p>
      </div>

      <div className="space-y-8">
        {/* Introduction */}
        <section className="p-6 rounded-2xl border border-border bg-card">
          <div className="flex items-start gap-3 mb-4">
            <Lock size={20} className="text-accent mt-1 shrink-0" />
            <div>
              <h2 className="text-xl font-bold mb-2">プライバシーポリシーについて</h2>
              <p className="text-sm text-muted leading-relaxed">
                FMHJPは、ユーザーのプライバシーを尊重し、個人情報の保護を最優先としています。
                本ポリシーは、当サイトがどのように情報を収集、使用、保護するかについて説明しています。
              </p>
            </div>
          </div>
        </section>

        {/* Cookie and Google AdSense */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Cookie と Google AdSense について</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-border bg-card text-sm leading-relaxed">
              <h3 className="font-semibold mb-2">Google AdSense の使用</h3>
              <p className="text-muted mb-3">
                当サイトは Google AdSense を使用して広告を配信しています。
                Google AdSense は、ユーザーの興味に基づいた広告を表示するため、
                DoubleClick Cookie を使用します。
              </p>
              <p className="text-muted">
                Google は、この Cookie を使用して、当サイトおよび他のウェブサイトでのユーザーの行動に基づいて、
                関連性の高い広告を表示します。
              </p>
            </div>

            <div className="p-4 rounded-xl border border-border bg-card text-sm leading-relaxed">
              <h3 className="font-semibold mb-2">Cookie の種類</h3>
              <ul className="list-disc list-inside space-y-2 text-muted">
                <li>Google AdSense による広告配信用 Cookie</li>
                <li>サイト分析用 Cookie（Google Analytics など）</li>
                <li>ユーザー体験向上用 Cookie</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl border border-border bg-card text-sm leading-relaxed">
              <h3 className="font-semibold mb-2">Cookie の無効化</h3>
              <p className="text-muted mb-3">
                ブラウザの設定で Cookie を無効にすることができます。
                ただし、一部の機能が正常に動作しなくなる可能性があります。
              </p>
            </div>
          </div>
        </section>

        {/* Personal Information Collection */}
        <section>
          <h2 className="text-2xl font-bold mb-4">個人情報の収集・利用目的</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-border bg-card text-sm leading-relaxed">
              <h3 className="font-semibold mb-2">収集する情報</h3>
              <ul className="list-disc list-inside space-y-2 text-muted">
                <li>IP アドレス</li>
                <li>ブラウザの種類とバージョン</li>
                <li>アクセス日時</li>
                <li>参照元ページ</li>
                <li>閲覧ページ</li>
                <li>お問い合わせフォームで提供された情報（名前、メールアドレス、メッセージ）</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl border border-border bg-card text-sm leading-relaxed">
              <h3 className="font-semibold mb-2">利用目的</h3>
              <ul className="list-disc list-inside space-y-2 text-muted">
                <li>サイトの利用状況の分析と改善</li>
                <li>ユーザーに関連性の高い広告の配信</li>
                <li>お問い合わせへの対応</li>
                <li>セキュリティの維持と不正行為の防止</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Third-party Advertising */}
        <section>
          <h2 className="text-2xl font-bold mb-4">サードパーティ広告配信について</h2>
          <div className="p-4 rounded-xl border border-border bg-card text-sm leading-relaxed space-y-3">
            <p className="text-muted">
              当サイトは、Google AdSense などのサードパーティ広告配信事業者を使用しています。
              これらの事業者は、ユーザーの興味に基づいた広告を配信するため、
              Cookie やその他の技術を使用する場合があります。
            </p>
            <p className="text-muted">
              サードパーティ広告配信事業者は、当サイトおよび他のウェブサイトでのユーザーの行動に基づいて、
              広告を配信します。
            </p>
          </div>
        </section>

        {/* Opt-out */}
        <section>
          <h2 className="text-2xl font-bold mb-4">広告のカスタマイズをオプトアウト</h2>
          <div className="p-4 rounded-xl border border-border bg-card text-sm leading-relaxed">
            <p className="text-muted mb-4">
              Google の広告設定ページにアクセスすることで、
              Google AdSense による個人化広告の配信をオプトアウトできます。
            </p>
            <a
              href="https://adssettings.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg font-medium text-sm hover:opacity-90 transition-opacity"
            >
              Google 広告設定にアクセス
              <ChevronRight size={14} />
            </a>
          </div>
        </section>

        {/* APPI Compliance */}
        <section>
          <h2 className="text-2xl font-bold mb-4">個人情報保護法（APPI）への準拠</h2>
          <div className="p-4 rounded-xl border border-border bg-card text-sm leading-relaxed space-y-3">
            <p className="text-muted">
              当サイトは、日本の個人情報保護法（Act on Protection of Personal Information, APPI）に準拠しています。
              ユーザーの個人情報は、適切に管理・保護されます。
            </p>
            <p className="text-muted">
              ユーザーは、自身の個人情報について、開示、訂正、削除を請求する権利を有しています。
            </p>
          </div>
        </section>

        {/* Data Security */}
        <section>
          <h2 className="text-2xl font-bold mb-4">データセキュリティ</h2>
          <div className="p-4 rounded-xl border border-border bg-card text-sm leading-relaxed space-y-3">
            <p className="text-muted">
              当サイトは、ユーザーの個人情報を保護するため、適切なセキュリティ対策を実施しています。
              ただし、インターネット上の通信は完全に安全であることを保証することはできません。
            </p>
            <p className="text-muted">
              個人情報の送信は、ユーザー自身の責任において行われます。
            </p>
          </div>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-2xl font-bold mb-4">お問い合わせ</h2>
          <div className="p-4 rounded-xl border border-border bg-card">
            <div className="flex items-start gap-3">
              <Mail size={20} className="text-accent mt-1 shrink-0" />
              <div className="text-sm">
                <p className="text-muted mb-2">
                  プライバシーポリシーに関するご質問やご不明な点がございましたら、
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
            </div>
          </div>
        </section>

        {/* Policy Changes */}
        <section>
          <h2 className="text-2xl font-bold mb-4">ポリシーの変更</h2>
          <div className="p-4 rounded-xl border border-border bg-card text-sm leading-relaxed space-y-3">
            <p className="text-muted">
              当サイトは、本プライバシーポリシーを予告なく変更することがあります。
              変更後のプライバシーポリシーは、当ページに掲載された時点で有効となります。
            </p>
            <p className="text-muted">
              重要な変更がある場合は、当サイトで通知いたします。
            </p>
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
