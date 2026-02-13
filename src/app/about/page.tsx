import Link from "next/link";
import { ChevronRight, Home, Zap, BookOpen, Users, Target, Star } from "lucide-react";
import { categories } from "@/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "このサイトについて - FMHJP",
  description: "FMHJPについて。インターネット上の無料リソースを日本語で紹介するキュレーションサイト。",
};

export default function AboutPage() {
  const totalResources = categories.reduce(
    (sum, cat) => sum + cat.subcategories.reduce((s, sub) => s + sub.resources.length, 0),
    0
  );
  const totalStarred = categories.reduce(
    (sum, cat) => sum + cat.subcategories.reduce((s, sub) => s + sub.resources.filter((r) => r.starred).length, 0),
    0
  );
  const stats = [
    { icon: BookOpen, label: "カテゴリ数", value: `${categories.length}` },
    { icon: Zap, label: "リソース数", value: `${totalResources.toLocaleString()}+` },
    { icon: Star, label: "おすすめ", value: `${totalStarred.toLocaleString()}+` },
    { icon: Users, label: "更新頻度", value: "毎月" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="flex items-center gap-2 text-sm text-muted mb-8">
        <Link href="/" className="hover:text-foreground transition-colors flex items-center gap-1">
          <Home size={14} />
          ホーム
        </Link>
        <ChevronRight size={14} />
        <span className="text-foreground font-medium">このサイトについて</span>
      </nav>

      <div className="mb-12">
        <h1 className="text-4xl font-extrabold mb-4">
          <span className="gradient-text">このサイトについて</span>
        </h1>
        <p className="text-lg text-muted leading-relaxed">
          FMHJPは、インターネット上の無料リソースを日本語で紹介する、
          最大級のキュレーションサイトです。
        </p>
      </div>

      <div className="space-y-8">
        {/* Mission */}
        <section className="p-6 rounded-2xl border border-border bg-card">
          <div className="flex items-start gap-3 mb-4">
            <Target size={20} className="text-accent mt-1 shrink-0" />
            <div>
              <h2 className="text-xl font-bold mb-2">私たちのミッション</h2>
              <p className="text-sm text-muted leading-relaxed">
                FMHJPは、インターネット上に存在する膨大な無料リソースを、
                日本語で分かりやすく紹介することを目的としています。
                ユーザーが必要な情報やツールを簡単に見つけられるよう、
                厳選されたリソースを24のカテゴリに分類して提供しています。
              </p>
            </div>
          </div>
        </section>

        {/* What We Offer */}
        <section>
          <h2 className="text-2xl font-bold mb-4">提供するもの</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-border bg-card text-sm leading-relaxed">
              <h3 className="font-semibold mb-2">📚 充実したリソースライブラリ</h3>
              <p className="text-muted">
                ソフトウェア、エンターテインメント、教育、プライバシーツール、
                開発者ツール、ゲーム、AI、その他多くのカテゴリから、
                {totalResources.toLocaleString()}以上の厳選されたリソースを提供しています。
              </p>
            </div>

            <div className="p-4 rounded-xl border border-border bg-card text-sm leading-relaxed">
              <h3 className="font-semibold mb-2">🔍 高速検索機能</h3>
              <p className="text-muted">
                探しているリソースを素早く見つけられるよう、
                高度な検索機能を提供しています。
                キーワード検索やカテゴリ検索で、目的のツールやサービスを発見できます。
              </p>
            </div>

            <div className="p-4 rounded-xl border border-border bg-card text-sm leading-relaxed">
              <h3 className="font-semibold mb-2">📖 初心者向けガイド</h3>
              <p className="text-muted">
                インターネットの無料リソースを安全に活用するための基本を学べる、
                初心者向けガイドを提供しています。
                広告ブロック、プライバシー保護、安全なダウンロードなど、
                重要なトピックをカバーしています。
              </p>
            </div>

            <div className="p-4 rounded-xl border border-border bg-card text-sm leading-relaxed">
              <h3 className="font-semibold mb-2">🔄 定期的な更新</h3>
              <p className="text-muted">
                リソースは毎月自動更新されます。
                新しいツールやサービスが追加され、
                古いリンクは定期的に確認・更新されます。
              </p>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section>
          <h2 className="text-2xl font-bold mb-4">FMHJPの規模</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-2xl border border-border bg-card text-center hover:bg-card-hover transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="flex justify-center mb-3">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                      <Icon size={24} />
                    </div>
                  </div>
                  <p className="text-3xl font-bold mb-1">{stat.value}</p>
                  <p className="text-sm text-muted">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Categories */}
        <section>
          <h2 className="text-2xl font-bold mb-4">カテゴリ一覧</h2>
          <div className="p-4 rounded-xl border border-border bg-card">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="text-muted">
                <p className="font-semibold text-foreground mb-2">🎬 エンターテインメント</p>
                <ul className="list-disc list-inside space-y-1 text-muted">
                  <li>動画 / 映画 / アニメ</li>
                  <li>音楽 / ポッドキャスト</li>
                  <li>読書 / 漫画</li>
                  <li>ゲーム / エミュレーション</li>
                </ul>
              </div>
              <div className="text-muted">
                <p className="font-semibold text-foreground mb-2">🛠️ ツール & 開発</p>
                <ul className="list-disc list-inside space-y-1 text-muted">
                  <li>開発者ツール</li>
                  <li>プログラミング</li>
                  <li>デザインツール</li>
                  <li>AI / 機械学習</li>
                </ul>
              </div>
              <div className="text-muted">
                <p className="font-semibold text-foreground mb-2">🔒 プライバシー & セキュリティ</p>
                <ul className="list-disc list-inside space-y-1 text-muted">
                  <li>広告ブロック / プライバシー</li>
                  <li>VPN / プロキシ</li>
                  <li>暗号化ツール</li>
                  <li>セキュリティ</li>
                </ul>
              </div>
              <div className="text-muted">
                <p className="font-semibold text-foreground mb-2">📚 その他</p>
                <ul className="list-disc list-inside space-y-1 text-muted">
                  <li>教育 / 学習</li>
                  <li>ダウンロード</li>
                  <li>モバイルアプリ</li>
                  <li>その他のツール</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section>
          <h2 className="text-2xl font-bold mb-4">FMHJPを選ぶ理由</h2>
          <div className="space-y-3">
            <div className="p-4 rounded-xl border border-border bg-card text-sm leading-relaxed flex items-start gap-3">
              <span className="text-lg">✅</span>
              <div>
                <h3 className="font-semibold mb-1">厳選されたリソース</h3>
                <p className="text-muted">
                  すべてのリソースは、安全性と有用性を考慮して厳選されています。
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-border bg-card text-sm leading-relaxed flex items-start gap-3">
              <span className="text-lg">✅</span>
              <div>
                <h3 className="font-semibold mb-1">日本語対応</h3>
                <p className="text-muted">
                  すべてのコンテンツが日本語で提供されており、
                  日本のユーザーにとって分かりやすくなっています。
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-border bg-card text-sm leading-relaxed flex items-start gap-3">
              <span className="text-lg">✅</span>
              <div>
                <h3 className="font-semibold mb-1">常に最新</h3>
                <p className="text-muted">
                  リソースは毎月自動更新され、常に最新の情報を提供しています。
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-border bg-card text-sm leading-relaxed flex items-start gap-3">
              <span className="text-lg">✅</span>
              <div>
                <h3 className="font-semibold mb-1">使いやすいインターフェース</h3>
                <p className="text-muted">
                  直感的で使いやすいデザインにより、
                  誰でも簡単にリソースを探すことができます。
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-border bg-card text-sm leading-relaxed flex items-start gap-3">
              <span className="text-lg">✅</span>
              <div>
                <h3 className="font-semibold mb-1">完全無料</h3>
                <p className="text-muted">
                  FMHJPのすべてのサービスは完全に無料です。
                  登録や料金は一切必要ありません。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-2xl font-bold mb-4">ご質問やご提案</h2>
          <div className="p-6 rounded-2xl border border-border bg-card">
            <p className="text-sm text-muted mb-4 leading-relaxed">
              FMHJPについてのご質問、ご提案、ご指摘がございましたら、
              お気軽にお問い合わせください。
              ユーザーからのフィードバックは、
              サイトの改善に大変役立ちます。
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-xl font-medium text-sm hover:opacity-90 transition-opacity"
            >
              お問い合わせ
              <ChevronRight size={16} />
            </Link>
          </div>
        </section>
      </div>

      <div className="text-center py-8 border-t border-border mt-12">
        <p className="text-sm text-muted mb-4">さっそくリソースを探してみましょう！</p>
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
