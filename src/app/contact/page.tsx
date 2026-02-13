import Link from "next/link";
import { ChevronRight, Home, Mail, MessageSquare, User } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "お問い合わせ - FMHJP",
  description: "FMHJPへのお問い合わせ。ご質問、ご提案、ご指摘をお送りください。",
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="flex items-center gap-2 text-sm text-muted mb-8">
        <Link href="/" className="hover:text-foreground transition-colors flex items-center gap-1">
          <Home size={14} />
          ホーム
        </Link>
        <ChevronRight size={14} />
        <span className="text-foreground font-medium">お問い合わせ</span>
      </nav>

      <div className="mb-12">
        <h1 className="text-4xl font-extrabold mb-4">
          <span className="gradient-text">お問い合わせ</span>
        </h1>
        <p className="text-lg text-muted leading-relaxed">
          FMHJPについてのご質問、ご提案、ご指摘がございましたら、
          下記のフォームからお気軽にお問い合わせください。
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Contact Info */}
        <div className="lg:col-span-1 space-y-4">
          <div className="p-6 rounded-2xl border border-border bg-card">
            <div className="flex items-start gap-3 mb-4">
              <Mail size={20} className="text-accent mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">メールでのお問い合わせ</h3>
                <p className="text-sm text-muted leading-relaxed">
                  メールでのお問い合わせもお受けしています。
                </p>
              </div>
            </div>
            <a
              href="mailto:contact@fmhyjp.com"
              className="inline-flex items-center gap-2 text-accent hover:underline font-medium text-sm"
            >
              contact@fmhyjp.com
              <ChevronRight size={14} />
            </a>
          </div>

          <div className="p-6 rounded-2xl border border-border bg-card">
            <div className="flex items-start gap-3 mb-4">
              <MessageSquare size={20} className="text-accent mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">返信について</h3>
                <p className="text-sm text-muted leading-relaxed">
                  通常、3営業日以内にご返信いたします。
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-border bg-card">
            <div className="flex items-start gap-3">
              <div className="text-2xl">⏰</div>
              <div>
                <h3 className="font-semibold mb-1">営業時間</h3>
                <p className="text-sm text-muted leading-relaxed">
                  24時間受け付けています。
                  ご返信は営業時間内に行います。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <form className="space-y-6 p-6 rounded-2xl border border-border bg-card">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold mb-2">
                <div className="flex items-center gap-2">
                  <User size={16} className="text-accent" />
                  お名前 <span className="text-red-500">*</span>
                </div>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="山田太郎"
                required
                aria-required="true"
                autoComplete="name"
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all invalid:border-red-500/50 invalid:focus:ring-red-500/50"
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold mb-2">
                <div className="flex items-center gap-2">
                  <Mail size={16} className="text-accent" />
                  メールアドレス <span className="text-red-500">*</span>
                </div>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="example@example.com"
                required
                aria-required="true"
                autoComplete="email"
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all invalid:border-red-500/50 invalid:focus:ring-red-500/50"
              />
            </div>

            {/* Subject Field */}
            <div>
              <label htmlFor="subject" className="block text-sm font-semibold mb-2">
                <div className="flex items-center gap-2">
                  <MessageSquare size={16} className="text-accent" />
                  件名 <span className="text-red-500">*</span>
                </div>
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="お問い合わせの件名"
                required
                aria-required="true"
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all invalid:border-red-500/50 invalid:focus:ring-red-500/50"
              />
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block text-sm font-semibold mb-2">
                <div className="flex items-center gap-2">
                  <MessageSquare size={16} className="text-accent" />
                  メッセージ <span className="text-red-500">*</span>
                </div>
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="お問い合わせの内容をお書きください..."
                rows={6}
                required
                aria-required="true"
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-none invalid:border-red-500/50 invalid:focus:ring-red-500/50"
              />
            </div>

            {/* Privacy Notice */}
            <div className="p-4 rounded-lg bg-accent/5 border border-accent/10 text-xs text-muted leading-relaxed">
              <p className="mb-2">
                <span className="font-semibold text-foreground">プライバシーについて：</span>
              </p>
              <p>
                ご入力いただいた個人情報は、お問い合わせへの対応のみに使用され、
                他の目的で使用されることはありません。
                詳細は
                <Link href="/privacy-policy" className="text-accent hover:underline">
                  プライバシーポリシー
                </Link>
                をご覧ください。
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full px-6 py-3 bg-accent text-white rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
            >
              送信
            </button>
          </form>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">よくあるご質問</h2>
        <div className="space-y-4">
          <details className="p-4 rounded-xl border border-border bg-card cursor-pointer group">
            <summary className="font-semibold text-foreground flex items-center justify-between">
              <span>リソースの追加申請はできますか？</span>
              <span className="text-accent group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="text-sm text-muted leading-relaxed mt-3">
              はい、リソースの追加申請をお受けしています。
              お問い合わせフォームから、リソースの詳細情報とともにお申請ください。
              申請内容を確認した上で、サイトへの掲載を検討させていただきます。
            </p>
          </details>

          <details className="p-4 rounded-xl border border-border bg-card cursor-pointer group">
            <summary className="font-semibold text-foreground flex items-center justify-between">
              <span>掲載されているリソースに問題があります</span>
              <span className="text-accent group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="text-sm text-muted leading-relaxed mt-3">
              リソースに問題がある場合は、お気軽にお知らせください。
              リンク切れ、不適切なコンテンツ、セキュリティ上の問題など、
              詳細をお教えいただければ、対応させていただきます。
            </p>
          </details>

          <details className="p-4 rounded-xl border border-border bg-card cursor-pointer group">
            <summary className="font-semibold text-foreground flex items-center justify-between">
              <span>著作権に関するお問い合わせ</span>
              <span className="text-accent group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="text-sm text-muted leading-relaxed mt-3">
              著作権に関するご指摘やご質問がございましたら、
              お問い合わせフォームからお知らせください。
              内容を確認した上で、適切に対応させていただきます。
            </p>
          </details>

          <details className="p-4 rounded-xl border border-border bg-card cursor-pointer group">
            <summary className="font-semibold text-foreground flex items-center justify-between">
              <span>返信がない場合はどうすればいいですか？</span>
              <span className="text-accent group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="text-sm text-muted leading-relaxed mt-3">
              通常、3営業日以内にご返信いたします。
              それ以上経過してもご返信がない場合は、
              メールアドレスの入力に誤りがないかご確認の上、
              再度お問い合わせください。
            </p>
          </details>
        </div>
      </section>

      <div className="text-center py-8 border-t border-border">
        <p className="text-sm text-muted mb-4">
          ご不明な点やご質問がございましたら、
          いつでもお気軽にお問い合わせください。
        </p>
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
