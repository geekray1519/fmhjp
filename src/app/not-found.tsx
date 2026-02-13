import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
      <div className="text-8xl mb-6">🔍</div>
      <h1 className="text-4xl font-bold mb-4">ページが見つかりません</h1>
      <p className="text-muted mb-8 max-w-md mx-auto">
        お探しのページは存在しないか、移動された可能性があります。
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-xl font-medium text-sm hover:opacity-90 transition-opacity"
      >
        ホームに戻る
      </Link>
    </div>
  );
}
