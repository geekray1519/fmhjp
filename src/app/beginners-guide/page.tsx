import Link from "next/link";
import {
  ChevronRight,
  Download,
  ExternalLink,
  Film,
  Gamepad2,
  Globe,
  Home,
  Layers,
  Library,
  Lock,
  Monitor,
  Music2,
  Shield,
  Smartphone,
  Star,
  Tv,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { categories } from "@/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "初心者ガイド",
  description: "最初に導入したい安全設定と、カテゴリ別に使える定番リソースをまとめた初心者向けガイドです。",
  alternates: { canonical: "https://fmhyjp.vercel.app/beginners-guide" },
};

type Step = {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  recommendation: string;
  jumpTo: string;
  color: string;
  icon: LucideIcon;
};

type GuideResource = {
  name: string;
  url: string;
  description: string;
  featured?: boolean;
};

type GuideSection = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  resources: GuideResource[];
};

const steps: Step[] = [
  {
    id: "step-1",
    icon: Shield,
    title: "1. 最初に広告対策を入れる",
    shortTitle: "広告対策",
    description: "悪質広告や偽ダウンロードボタンを避けるため、まず広告ブロックを導入します。",
    recommendation: "PC は uBO、モバイルは AdGuard / Rethink DNS を基準にすると安定します。",
    jumpTo: "#adblocking",
    color: "from-emerald-500 to-teal-600",
  },
  {
    id: "step-2",
    icon: Globe,
    title: "2. ブラウザ環境を整える",
    shortTitle: "ブラウザ",
    description: "日常的に使うブラウザを安全寄りに設定すると、全体のリスクを下げられます。",
    recommendation: "Firefox を中心に、必要に応じて Brave / Cromite を使い分けるのがおすすめです。",
    jumpTo: "#browsers",
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: "step-3",
    icon: Download,
    title: "3. ダウンロード前に確認する",
    shortTitle: "安全確認",
    description: "不明なファイルは実行前にスキャンし、誤検知かどうかを確認してから使います。",
    recommendation: "VirusTotal で確認し、判定に迷う場合は Scan Guide を参照して判断してください。",
    jumpTo: "#security",
    color: "from-cyan-500 to-blue-600",
  },
  {
    id: "step-4",
    icon: Lock,
    title: "4. プライバシーの基本を押さえる",
    shortTitle: "プライバシー",
    description: "情報漏えい対策として、メールとパスワード管理を最初から分離しておくと安全です。",
    recommendation: "Proton、SearXNG、HaveIBeenPwned を組み合わせて運用するのが定番です。",
    jumpTo: "#privacy",
    color: "from-fuchsia-500 to-rose-600",
  },
  {
    id: "step-5",
    icon: Monitor,
    title: "5. 目的別リソースを選ぶ",
    shortTitle: "カテゴリ別",
    description: "動画・音楽・ゲーム・読書など、用途ごとに実績のあるサービスを使い分けます。",
    recommendation: "まずは各カテゴリのおすすめ付きカードから 1 つずつ試すと失敗しにくいです。",
    jumpTo: "#resource-sections",
    color: "from-amber-500 to-orange-600",
  },
  {
    id: "step-6",
    icon: Smartphone,
    title: "6. モバイルも同じ基準で運用",
    shortTitle: "モバイル",
    description: "Android / iOS でも更新経路が明確な配布元を使うと、継続的に安全を保てます。",
    recommendation: "Android は Obtainium、iOS は SideStore / Sideloadly を用途別に選びましょう。",
    jumpTo: "#mobile",
    color: "from-lime-500 to-green-600",
  },
];

const guideSections: GuideSection[] = [
  {
    id: "adblocking",
    title: "Adblocking",
    description: "広告・偽ボタン回避の基本セットです。複数の広告ブロッカー同時利用は競合しやすいので避けます。",
    icon: Shield,
    resources: [
      { name: "uBO", url: "https://github.com/gorhill/uBlock", description: "ブラウザ向けの定番広告ブロック拡張。", featured: true },
      { name: "Redirect Skipper", url: "https://www.reddit.com/r/FREEMEDIAHECKYEAH/wiki/internet-tools/#wiki_.25B7_redirect_bypass", description: "待機ページや中継リンクをスキップしやすくします。" },
      { name: "AdGuard Premium", url: "https://www.reddit.com/r/FREEMEDIAHECKYEAH/wiki/android/#wiki_.25B7_android_adblocking", description: "モバイル向けの広告・DNS 制御ツール。" },
      { name: "Rethink DNS", url: "https://rethinkdns.com/app", description: "Android で使いやすい DNS ベースの保護アプリ。" },
      { name: "ReVanced Manager", url: "https://revanced.app/", description: "一部モバイルアプリの広告対策に活用できます。" },
    ],
  },
  {
    id: "browsers",
    title: "Browsers",
    description: "ブラウザは安全性と拡張性のバランスで選びます。",
    icon: Globe,
    resources: [
      { name: "Firefox", url: "https://www.reddit.com/r/FREEMEDIAHECKYEAH/wiki/internet-tools/#wiki_.25B7_firefox_tools", description: "拡張機能との相性が良い推奨ブラウザ。", featured: true },
      { name: "Brave", url: "https://brave.com/", description: "Chromium 系で使いやすいプライバシー寄りブラウザ。" },
      { name: "Cromite", url: "https://github.com/uazo/cromite", description: "Android 向けの軽量 Chromium 派生。" },
      { name: "AdGuard for iOS", url: "https://adguard.com/en/adguard-ios/overview.html", description: "Safari と併用しやすい iOS 広告対策。" },
    ],
  },
  {
    id: "movies",
    title: "Movies / Shows",
    description: "視聴・管理・検索を分けて使うと見たい作品を探しやすくなります。",
    icon: Film,
    resources: [
      { name: "Cineby", url: "https://www.cineby.gd/", description: "映画・番組向けストリーミング。", featured: true },
      { name: "NEPU", url: "https://nepu.to/", description: "作品数が多いストリーミングサービス。" },
      { name: "XPrime", url: "https://xprime.today/", description: "動画視聴の代替先として使えます。" },
      { name: "ExT.to", url: "https://ext.to/browse/?cat=1", description: "動画カテゴリのトレント探索。" },
      { name: "Letterboxd", url: "https://letterboxd.com/", description: "映画の記録・発見に便利な管理サービス。" },
    ],
  },
  {
    id: "anime",
    title: "Anime",
    description: "視聴、ダウンロード、進捗管理を用途別に用意しておくと運用しやすくなります。",
    icon: Tv,
    resources: [
      { name: "AnimeKai", url: "https://animekai.to/home", description: "アニメ視聴向けの定番サイト。", featured: true },
      { name: "Miruro", url: "https://www.miruro.com/", description: "複数作品をまとめて追いやすい構成。" },
      { name: "HiAnime", url: "https://hianime.to/", description: "シリーズ検索しやすいアニメ配信。" },
      { name: "Nyaa", url: "https://nyaa.si/", description: "アニメ系トレントで利用者が多いサイト。" },
      { name: "AniList", url: "https://anilist.co/", description: "視聴記録と作品発見に便利なトラッカー。" },
    ],
  },
  {
    id: "music",
    title: "Music",
    description: "再生・取得・管理を分離すると、端末ごとの運用が安定します。",
    icon: Music2,
    resources: [
      { name: "SpotX", url: "https://github.com/SpotX-Official/SpotX", description: "PC で利用されることが多い Spotify 関連ツール。", featured: true },
      { name: "Monochrome", url: "https://monochrome.tf/", description: "音楽再生向けの代替サービス。" },
      { name: "lucida", url: "https://lucida.to/", description: "音楽ダウンロード用途で使われるサービス。" },
      { name: "DoubleDouble", url: "https://doubledouble.top/", description: "音源取得の選択肢として使えます。" },
      { name: "RateYourMusic", url: "https://rateyourmusic.com/", description: "新しい作品を探すためのデータベース。" },
    ],
  },
  {
    id: "gaming",
    title: "Gaming",
    description: "ゲーム本体、エミュレーション、進捗管理を用途別に揃える構成です。",
    icon: Gamepad2,
    resources: [
      { name: "SteamRIP", url: "https://steamrip.com/", description: "PC ゲーム配布で参照されることが多いサイト。", featured: true },
      { name: "FitGirl Repacks", url: "https://fitgirl-repacks.site/", description: "圧縮配布で知られる定番ソース。" },
      { name: "Emulation Wiki", url: "https://emulation.gametechwiki.com/index.php/Main_Page", description: "エミュレーション情報を体系的に確認できます。" },
      { name: "JDownloader", url: "https://jdownloader.org/jdownloader2", description: "大容量リンク管理に向いたダウンロードマネージャー。" },
      { name: "Backloggd", url: "https://www.backloggd.com/", description: "プレイ記録・評価・発見に便利な管理サイト。" },
    ],
  },
  {
    id: "reading",
    title: "Reading",
    description: "書籍、マンガ、コミック、読書管理までまとめて使えるカテゴリです。",
    icon: Library,
    resources: [
      { name: "Anna's Archive", url: "https://annas-archive.li/", description: "書籍探索で利用されることが多い総合アーカイブ。", featured: true },
      { name: "Z-Library", url: "https://z-lib.gd/", description: "電子書籍の定番検索先。" },
      { name: "MangaDex", url: "https://mangadex.org/", description: "マンガ閲覧で広く使われるプラットフォーム。" },
      { name: "GetComics", url: "https://getcomics.org/", description: "コミック向けの配布サイト。" },
      { name: "Koodo", url: "https://www.koodoreader.com/", description: "ローカル読書管理に向く Ebook Reader。" },
    ],
  },
  {
    id: "privacy",
    title: "Privacy",
    description: "プライバシーは秘匿だけでなく、個人データの制御という観点で重要です。",
    icon: Lock,
    resources: [
      { name: "Proton", url: "https://proton.me/mail", description: "個人利用で導入しやすいプライバシー重視メール。", featured: true },
      { name: "SearXNG", url: "https://searx.fmhy.net/", description: "追跡を減らしやすいメタ検索エンジン。" },
      { name: "HaveIBeenPwned", url: "https://haveibeenpwned.com/Passwords", description: "漏えい済みパスワードの確認に使えるサービス。" },
      { name: "Email Aliasing", url: "https://www.reddit.com/r/FREEMEDIAHECKYEAH/wiki/internet-tools/#wiki_.25B7_email_aliasing", description: "登録先ごとにメール識別子を分離する方法。" },
    ],
  },
  {
    id: "windows",
    title: "Windows",
    description: "インストール媒体の取得から初期設定までの導線をまとめています。",
    icon: Monitor,
    resources: [
      { name: "Genuine Installation Media", url: "https://massgrave.dev/genuine-installation-media", description: "公式ベースのインストール媒体取得手順。", featured: true },
      { name: "Clean Install Windows Guide", url: "https://massgrave.dev/clean_install_windows", description: "クリーンインストールの順序を確認できます。" },
      { name: "Microsoft Activation Scripts", url: "https://rentry.co/FMHYB64#mas", description: "導入後の設定手順で参照されるガイド。" },
      { name: "Windows Install / Debloat Guide", url: "https://wispydocs.pages.dev/windows/", description: "不要機能の整理と最適化の参考ガイド。" },
    ],
  },
  {
    id: "torrenting",
    title: "Torrenting",
    description: "VPN とクライアント設定をセットで行うのが基本です。",
    icon: Download,
    resources: [
      { name: "VPN Guide", url: "https://www.reddit.com/r/FREEMEDIAHECKYEAH/wiki/adblock-vpn-privacy#wiki_.25BA_vpn", description: "国や回線条件に応じた VPN 選定の基準。", featured: true },
      { name: "Bind your VPN", url: "https://wispydocs.pages.dev/torrenting/", description: "VPN 切断時に通信が漏れないようクライアントを連携します。" },
      { name: "Remote Torrenting Services", url: "https://www.reddit.com/r/FREEMEDIAHECKYEAH/wiki/torrent#wiki_.25B7_remote_torrenting", description: "ローカル回線を使わない選択肢として利用可能。" },
      { name: "Port Forwarding", url: "https://wispydocs.pages.dev/torrenting/#port-forwarding", description: "接続性改善に役立つ設定解説。" },
    ],
  },
  {
    id: "mobile",
    title: "Android / iOS",
    description: "モバイルは更新経路と署名の確認がしやすい配布元を優先します。",
    icon: Smartphone,
    resources: [
      { name: "Mobilism", url: "https://forum.mobilism.org/viewforum.php?f=398", description: "Android 向け配布の情報源。" },
      { name: "APKMirror", url: "https://www.apkmirror.com/", description: "Android の正規 APK 配布で使われる定番。", featured: true },
      { name: "Droid-ify", url: "https://droidify.eu.org/", description: "FOSS アプリを探しやすいクライアント。" },
      { name: "Obtainium", url: "https://github.com/ImranR98/Obtainium/", description: "GitHub などから更新を追跡できる Android ツール。" },
      { name: "SideStore", url: "https://sidestore.io/", description: "iOS 向けサイドロードアプリ。" },
      { name: "Sideloadly", url: "https://sideloadly.io/", description: "iOS アプリのサイドロード補助ツール。" },
    ],
  },
];

const safetyTips = [
  "不明なファイルは実行前に VirusTotal で確認する。",
  "同じパスワードの使い回しを避け、サービスごとに分離する。",
  "複数の広告ブロッカーを重ねて入れず、主軸を 1 つにする。",
  "VPN を使う場合はクライアント側でバインド設定まで行う。",
  "個人情報や機密ファイルを安易にクラウドへアップロードしない。",
];

export default function BeginnersGuidePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
          初期設定で失敗しないための手順と、カテゴリ別に選べる実用リソースをまとめています。
          各リンクはすべて実際の配布・案内ページに直接アクセスできます。
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-12">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <a
              key={step.id}
              href={step.jumpTo}
              className="group p-5 rounded-2xl border border-border bg-card hover:bg-card-hover transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2.5 rounded-xl bg-gradient-to-br ${step.color} text-white shrink-0`}>
                  <Icon size={20} />
                </div>
                <div className="min-w-0">
                  <h2 className="text-base font-bold mb-1">{step.title}</h2>
                  <p className="text-sm text-muted leading-relaxed mb-2">{step.description}</p>
                  <p className="text-xs text-foreground/90 leading-relaxed">{step.recommendation}</p>
                  <span className="mt-2 inline-flex items-center gap-1 text-xs text-accent font-medium">
                    対応セクションへ移動
                    <ChevronRight size={14} />
                  </span>
                </div>
              </div>
            </a>
          );
        })}
      </div>

      <section id="resource-sections" className="mb-16 scroll-mt-20">
        <h2 className="text-2xl font-bold mb-2">カテゴリ別おすすめリソース</h2>
        <p className="text-sm text-muted mb-6">用途ごとに最初の導入先を選びやすいよう、主要カテゴリを整理しています。</p>
        <div className="space-y-6">
          {guideSections.map((section, i) => {
            const Icon = section.icon;
            return (
              <article
                key={section.id}
                id={section.id}
                className="p-5 rounded-2xl border border-border bg-card animate-fade-in scroll-mt-20"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-accent/10 text-accent shrink-0">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{section.title}</h3>
                    <p className="text-sm text-muted leading-relaxed mt-1">{section.description}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                  {section.resources.map((resource) => (
                    <a
                      key={`${section.id}-${resource.name}`}
                      href={resource.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group p-4 rounded-xl border border-border bg-background hover:bg-card-hover hover:border-accent/30 transition-all"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="font-semibold text-sm truncate">{resource.name}</span>
                        <div className="flex items-center gap-1 shrink-0">
                          {resource.featured && <Star size={14} className="text-amber-500" />}
                          <ExternalLink size={14} className="text-muted group-hover:text-accent transition-colors" />
                        </div>
                      </div>
                      <p className="text-xs text-muted leading-relaxed">{resource.description}</p>
                    </a>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section id="security" className="mb-16 scroll-mt-20">
        <h2 className="text-2xl font-bold mb-4">運用時の基本ルール</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {safetyTips.map((tip, i) => (
            <div
              key={tip}
              className="p-4 rounded-xl border border-border bg-card text-sm text-muted leading-relaxed animate-fade-in"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              {tip}
            </div>
          ))}
        </div>
      </section>

      <section id="all-categories" className="mb-16 scroll-mt-20">
        <div className="flex items-center gap-2 mb-6">
          <Layers size={20} className="text-accent" />
          <h2 className="text-2xl font-bold">全{categories.length}カテゴリ</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
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
      </section>

      <div className="text-center py-8 border-t border-border">
        <p className="text-sm text-muted mb-4">準備ができたら、検索から目的のリソースを探してみましょう。</p>
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
