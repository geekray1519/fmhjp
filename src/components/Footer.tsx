import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <span className="text-xl font-bold gradient-text">FMHJP</span>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              インターネット上の無料リソースを集めた最大のコレクション。
              あなたの探し物がきっと見つかります。
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-3">ナビゲーション</h3>
            <ul className="space-y-2 text-sm text-muted">
              <li><Link href="/" className="hover:text-foreground transition-colors">ホーム</Link></li>
              <li><Link href="/search" className="hover:text-foreground transition-colors">検索</Link></li>
              <li><Link href="/beginners-guide" className="hover:text-foreground transition-colors">初心者ガイド</Link></li>
              <li><Link href="/privacy" className="hover:text-foreground transition-colors">広告ブロック / プライバシー</Link></li>
              <li><Link href="/ai" className="hover:text-foreground transition-colors">人工知能</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-3">カテゴリ</h3>
            <ul className="space-y-2 text-sm text-muted">
              <li><Link href="/video" className="hover:text-foreground transition-colors">動画 / 映画 / アニメ</Link></li>
              <li><Link href="/gaming" className="hover:text-foreground transition-colors">ゲーム / エミュレーション</Link></li>
              <li><Link href="/reading" className="hover:text-foreground transition-colors">読書 / 漫画</Link></li>
              <li><Link href="/developer-tools" className="hover:text-foreground transition-colors">開発者ツール</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border text-center text-xs text-muted">
          <p>&copy; {new Date().getFullYear()} FMHJP. インターネット上の無料リソースを集めた最大のコレクション。</p>
        </div>
      </div>
    </footer>
  );
}
