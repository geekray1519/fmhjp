import Link from "next/link";
import { Home, Search, BookOpen } from "lucide-react";

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
      <div className="relative inline-block mb-8">
        <div className="text-8xl animate-fade-in">404</div>
        <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-2xl -z-10" />
      </div>
      <h1 className="text-3xl font-bold mb-3 animate-fade-in" style={{ animationDelay: "100ms" }}>
        ページが見つかりません
      </h1>
      <p className="text-muted mb-8 max-w-md mx-auto animate-fade-in" style={{ animationDelay: "200ms" }}>
        お探しのページは存在しないか、移動された可能性があります。
        下のリンクからお探しのコンテンツを見つけてください。
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-in" style={{ animationDelay: "300ms" }}>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-xl font-medium text-sm hover:opacity-90 transition-opacity shadow-lg shadow-accent/25"
        >
          <Home size={16} />
          ホームに戻る
        </Link>
        <Link
          href="/search"
          className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-xl font-medium text-sm hover:bg-card transition-colors"
        >
          <Search size={16} />
          リソースを検索
        </Link>
        <Link
          href="/beginners-guide"
          className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-xl font-medium text-sm hover:bg-card transition-colors"
        >
          <BookOpen size={16} />
          初心者ガイド
        </Link>
      </div>
    </div>
  );
}
