import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");
const DATA_DIR = path.join(ROOT_DIR, "src", "data");
const RESOURCES_DIR = path.join(DATA_DIR, "resources");
const RAW_BASE_URL = "https://raw.githubusercontent.com/fmhy/edit/main/docs";

const FILES = [
  "ai.md",
  "audio.md",
  "developer-tools.md",
  "downloading.md",
  "educational.md",
  "file-tools.md",
  "gaming.md",
  "gaming-tools.md",
  "image-tools.md",
  "internet-tools.md",
  "linux-macos.md",
  "misc.md",
  "mobile.md",
  "non-english.md",
  "privacy.md",
  "reading.md",
  "social-media-tools.md",
  "storage.md",
  "system-tools.md",
  "text-tools.md",
  "torrenting.md",
  "video.md",
  "video-tools.md",
  "unsafe.md",
  "beginners-guide.md",
  "feedback.md",
];

const CATEGORY_META = {
  "ai": { titleJa: "AI・人工知能", icon: "🤖", color: "from-violet-500 to-purple-600", description: "AIチャットボット、画像生成、音声合成などのAIツール" },
  "audio": { titleJa: "音楽 / オーディオ", icon: "🎵", color: "from-pink-500 to-rose-600", description: "音楽ストリーミング、ポッドキャスト、ラジオ、音楽ダウンロード" },
  "developer-tools": { titleJa: "開発者ツール", icon: "💻", color: "from-cyan-500 to-blue-600", description: "プログラミング、API、IDE、開発リソース" },
  "downloading": { titleJa: "ダウンロード", icon: "📥", color: "from-green-500 to-emerald-600", description: "直接ダウンロードリンク、ダウンロードマネージャー" },
  "educational": { titleJa: "教育 / 学習", icon: "📚", color: "from-amber-500 to-orange-600", description: "オンラインコース、語学学習、教育リソース" },
  "file-tools": { titleJa: "ファイルツール", icon: "📁", color: "from-slate-500 to-gray-600", description: "ファイル管理、圧縮、変換ツール" },
  "gaming": { titleJa: "ゲーム", icon: "🎮", color: "from-red-500 to-rose-600", description: "ゲームダウンロード、ROM、エミュレーター" },
  "gaming-tools": { titleJa: "ゲームツール", icon: "🕹️", color: "from-orange-500 to-red-600", description: "ゲームMOD、最適化、録画ツール" },
  "image-tools": { titleJa: "画像ツール", icon: "🖼️", color: "from-teal-500 to-cyan-600", description: "画像編集、AI画像生成、スクリーンショット" },
  "internet-tools": { titleJa: "インターネットツール", icon: "🌐", color: "from-blue-500 to-indigo-600", description: "ブラウザ、拡張機能、Webツール" },
  "linux-macos": { titleJa: "Linux / macOS", icon: "🐧", color: "from-yellow-500 to-amber-600", description: "Linux・macOS向けソフトウェアとツール" },
  "misc": { titleJa: "その他", icon: "🔮", color: "from-fuchsia-500 to-pink-600", description: "地図、ショッピング、旅行、その他便利ツール" },
  "mobile": { titleJa: "モバイル", icon: "📱", color: "from-lime-500 to-green-600", description: "Android・iOSアプリ、モバイルツール" },
  "non-english": { titleJa: "多言語リソース", icon: "🌍", color: "from-indigo-500 to-violet-600", description: "英語以外の各言語向けリソース" },
  "privacy": { titleJa: "プライバシー / セキュリティ", icon: "🛡️", color: "from-emerald-500 to-teal-600", description: "VPN、広告ブロック、プライバシー保護ツール" },
  "reading": { titleJa: "読書 / 書籍", icon: "📖", color: "from-stone-500 to-neutral-600", description: "電子書籍、マンガ、コミック、学術論文" },
  "social-media-tools": { titleJa: "SNSツール", icon: "💬", color: "from-sky-500 to-blue-600", description: "SNS管理、YouTube、Reddit、Twitter関連ツール" },
  "storage": { titleJa: "ストレージ", icon: "☁️", color: "from-gray-500 to-slate-600", description: "クラウドストレージ、ファイル共有、バックアップ" },
  "system-tools": { titleJa: "システムツール", icon: "⚙️", color: "from-zinc-500 to-gray-600", description: "Windows設定、ハードウェア、システム最適化" },
  "text-tools": { titleJa: "テキストツール", icon: "📝", color: "from-rose-500 to-pink-600", description: "テキスト編集、PDF、ライティングツール" },
  "torrenting": { titleJa: "トレント", icon: "🔄", color: "from-purple-500 to-violet-600", description: "トレントクライアント、トラッカー、関連ツール" },
  "video": { titleJa: "動画 / 映像", icon: "🎬", color: "from-red-500 to-orange-600", description: "動画ストリーミング、映画、TV、アニメ" },
  "video-tools": { titleJa: "動画ツール", icon: "🎞️", color: "from-amber-500 to-yellow-600", description: "動画編集、変換、ダウンロードツール" },
  "unsafe": { titleJa: "安全でないサイト", icon: "⚠️", color: "from-red-600 to-red-800", description: "ブラックリスト入りの危険なサイト一覧" },
};

const COMMUNITY_TAGS = ["Discord", "GitHub", "Subreddit", "Telegram"];

const WHOLE_TITLE_TRANSLATIONS = {
  "ad blocking": "広告ブロック",
  "ai chatbots": "AIチャットボット",
  "search engines": "検索エンジン",
  "video tools": "動画ツール",
  "image tools": "画像ツール",
  "audio tools": "音声ツール",
  "privacy tools": "プライバシーツール",
};

const COMPLETE_TITLE_MAP = {
   "3D Modeling Apps": "3Dモデリングアプリ",
   "3D Printing": "3Dプリンティング",
   "3DS / DS Homebrew": "3DS / DS自作ソフト",
   "4chan Archives": "4chanアーカイブ",
   "ASCII Art": "ASCIIアート",
   "Abandonware / Retro": "レトロ / 放棄ソフト",
   "Academic Papers": "学術論文",
   "Aerospace Engineering": "航空宇宙工学",
   "Aggregators": "アグリゲーター",
   "Album Artwork": "アルバムアートワーク",
   "Ambient / Relaxation": "環境音 / リラクゼーション",
   "Android Adblocking": "Android広告ブロック",
   "Android Code Editors": "Androidコードエディタ",
   "Android Live TV": "AndroidライブTV",
   "Android Podcasts / Radio": "Androidポッドキャスト / ラジオ",
   "Android Relaxation": "Androidリラクゼーション",
   "Android TV / Firestick": "Android TV / Firestick",
   "Android Utilities": "Androidユーティリティ",
   "Android YouTube Apps": "Android YouTubeアプリ",
   "Android on Linux": "Linux上のAndroid",
   "Android on Windows": "Windows上のAndroid",
   "Animation": "アニメーション",
   "Anti Censorship": "検閲回避",
   "App / Site Mockups": "アプリ / サイトモックアップ",
   "App Launchers": "アプリランチャー",
   "App Themes": "アプリテーマ",
   "Apps": "アプリ",
   "Archive Services": "アーカイブサービス",
   "Archiving / Compression": "アーカイブ / 圧縮",
   "Art / Editing": "アート / 編集",
   "Art / Illustrations": "アート / イラスト",
   "Asset Creation": "アセット作成",
   "Assistance / Charity": "支援 / チャリティ",
   "Astronomy": "天文学",
   "Biology": "生物学",
   "Bookmark Managers": "ブックマークマネージャー",
   "C Languages": "C言語系",
   "CAD Engineering": "CADエンジニアリング",
   "CLI Cheat Sheets": "CLIチートシート",
   "CSS": "CSS",
   "Calculators": "電卓",
   "Calendar / Upcoming": "カレンダー / 予定",
   "Calendars / Events": "カレンダー / イベント",
   "Calibre Libraries": "Calibreライブラリ",
   "Cantonese": "広東語",
   "Cartoon Streaming": "カートゥーンストリーミング",
   "Chat / Forums": "チャット / フォーラム",
   "Chemistry": "化学",
   "Chemistry Lessons": "化学レッスン",
   "Chess": "チェス",
   "Chinese": "中国語",
   "Classics / Public Domain": "クラシック / パブリックドメイン",
   "Climate / Weather": "気候 / 天気",
   "Clipboard Managers": "クリップボードマネージャー",
   "Coding Assistants": "コーディングアシスタント",
   "Collaboration Platforms": "コラボレーションプラットフォーム",
   "Color Pickers": "カラーピッカー",
   "Color Schemes": "カラースキーム",
   "Comics": "コミック",
   "Concerts / Live Shows": "コンサート / ライブ",
   "Content Removers": "コンテンツ削除ツール",
   "Crosswords": "クロスワード",
   "Crypto / Bitcoin": "暗号通貨 / ビットコイン",
   "Curated Recommendations": "キュレーション",
   "Custom New Tab Pages": "カスタム新規タブ",
   "Customization": "カスタマイズ",
   "Cybersecurity": "サイバーセキュリティ",
   "Cybersecurity Indexes": "サイバーセキュリティインデックス",
   "DLC Unlock / DRM Bypass": "DLCアンロック / DRM回避",
   "DNS Filters": "DNSフィルター",
   "Data Automation": "データ自動化",
   "Data Breach Monitoring": "データ漏洩監視",
   "Data Science": "データサイエンス",
   "Data Structures": "データ構造",
   "Date & Time": "日付 / 時刻",
   "Decomps / Ports": "デコンパイル / 移植",
   "Design Apps": "デザインアプリ",
   "Design Resources": "デザインリソース",
   "Desktop Environment": "デスクトップ環境",
   "Detoxing / Sobriety": "デトックス / 禁酒",
   "Developer Utilities": "開発者ユーティリティ",
   "Dictionaries / Thesaurus": "辞書 / 類語辞典",
   "Dictionaries / Translation": "辞書 / 翻訳",
   "Digital Art Collections": "デジタルアートコレクション",
   "Digital Brushes": "デジタルブラシ",
   "Disc Utilities": "ディスクユーティリティ",
   "Discord Bots": "Discordボット",
   "Documents / Articles": "ドキュメント / 記事",
   "Down Site Checkers": "サイトダウンチェッカー",
   "Download Subtitles": "字幕ダウンロード",
   "Downloading": "ダウンロード",
   "Drama Streaming": "ドラマストリーミング",
   "Drinks": "ドリンク",
   "Dungeons & Dragons": "ダンジョンズ＆ドラゴンズ",
   "Dynamic DNS Services / Subdomains": "ダイナミックDNS / サブドメイン",
   "Dynamic Page Hosting": "動的ページホスティング",
   "Ebook Readers": "電子書籍リーダー",
   "Editing Software": "編集ソフトウェア",
   "Effects / Enhancements": "エフェクト / 拡張",
   "Electronics": "電子工学",
   "Email Aliasing": "メールエイリアス",
   "Embed Frontends": "埋め込みフロントエンド",
   "Emoji Indexes": "絵文字インデックス",
   "EmulatorJS / NeptunJS": "EmulatorJS / NeptunJS",
   "Emulators on Android": "Android用エミュレーター",
   "Encode / Decode": "エンコード / デコード",
   "Encrypted Messengers": "暗号化メッセンジャー",
   "Encryption / Certificates": "暗号化 / 証明書",
   "Encyclopedias": "百科事典",
   "Engineering": "工学",
   "English": "英語",
   "Esoteric / Cultural": "秘教 / 文化",
   "European": "ヨーロッパ言語",
   "FOSS APKs": "FOSS APK",
   "FOSS Sites": "FOSSサイト",
   "Fanfiction / Stories": "ファンフィクション / 小説",
   "Film Archives": "映画アーカイブ",
   "Finance / Savings": "財務 / 節約",
   "Fingerprinting / Tracking": "フィンガープリント / トラッキング",
   "Flights": "フライト",
   "Font Customization": "フォントカスタマイズ",
   "Formatting / Deletion": "フォーマット / 削除",
   "Free Assets": "無料アセット",
   "Free DNS Resolvers": "無料DNSリゾルバー",
   "Free Fonts": "無料フォント",
   "Free VPN Configs": "無料VPN設定",
   "Free w/ Ads": "広告付き無料",
   "Freeware Plugins": "フリーウェアプラグイン",
   "Freeware Sites": "フリーウェアサイト",
   "Genre Specific Ripping": "ジャンル別リッピング",
   "Genre Specific Streaming": "ジャンル別ストリーミング",
   "GeoGuessr": "GeoGuessr",
   "Geography / Sociology": "地理学 / 社会学",
   "Geography Maps": "地理マップ",
   "Geology Maps": "地質マップ",
   "Geometry Dash Demon Lists": "Geometry Dashデーモンリスト",
   "German": "ドイツ語",
   "Git Gud": "Git Gud",
   "Git Projects": "Gitプロジェクト",
   "Grammar Check": "文法チェック",
   "Great Firewall": "グレートファイアウォール",
   "HRT / Trans Health": "HRT / トランスヘルス",
   "HTML": "HTML",
   "Hackintosh": "Hackintosh",
   "Hardware Monitors": "ハードウェアモニター",
   "Historic Maps": "歴史地図",
   "Icons / Avatars": "アイコン / アバター",
   "Incremental / Idle": "インクリメンタル / 放置ゲーム",
   "Indexers": "インデクサー",
   "Infrastructure Maps": "インフラマップ",
   "Interactive": "インタラクティブ",
   "Interesting": "興味深いリソース",
   "JEE / NEET": "JEE / NEET",
   "Japanese": "日本語",
   "Java / Kotlin": "Java / Kotlin",
   "JavaScript": "JavaScript",
   "Korean": "韓国語",
   "Language Exchange": "言語交換",
   "Launchers": "ランチャー",
   "Light Novels": "ライトノベル",
   "Link in Bio": "リンクインバイオ",
   "Linux System": "Linuxシステム",
   "Linux Themes": "Linuxテーマ",
   "Linux on Android": "Android上のLinux",
   "Live Polling": "ライブ投票",
   "Live Sports": "ライブスポーツ",
   "Live Streaming": "ライブストリーミング",
   "Live TV": "ライブTV",
   "Live Webcams": "ライブWebカメラ",
   "Lofi Radio": "Lo-Fiラジオ",
   "Lyric Sites": "歌詞サイト",
   "MOD APK": "MOD APK",
   "Manuals": "マニュアル",
   "Map Creators / Editors": "マップ作成 / 編集",
   "Maps / Location": "地図 / 位置情報",
   "Markdown Editors": "Markdownエディタ",
   "Med School": "医学部",
   "Mental Health": "メンタルヘルス",
   "Mind Mapping": "マインドマッピング",
   "Minesweeper": "マインスイーパー",
   "Mod / Resource Pack Indexes": "MOD / リソースパックインデックス",
   "Mods / Data Packs": "MOD / データパック",
   "Mouse / Keyboard": "マウス / キーボード",
   "Multi-Language": "多言語",
   "Multiplayer Fixes": "マルチプレイヤー修正",
   "Multiplayer Mods": "マルチプレイヤーMOD",
   "Multiplayer Servers": "マルチプレイヤーサーバー",
   "Multireddits": "マルチReddit",
   "Mythology / Folklore": "神話 / 民俗学",
   "Navigation / Transport": "ナビゲーション / 交通",
   "Nintendo ROMs": "Nintendo ROM",
   "Note-Taking": "ノートアプリ",
   "Notifications / Widgets": "通知 / ウィジェット",
   "Number / SMS": "電話番号 / SMS",
   "Nutritional Health": "栄養健康",
   "OSINT Collections": "OSINTコレクション",
   "Office Suites": "オフィススイート",
   "Offline Galleries": "オフラインギャラリー",
   "Offline PDF Toolkits": "オフラインPDFツール",
   "Online Editors": "オンラインエディタ",
   "Online Galleries": "オンラインギャラリー",
   "Online PDF Toolkits": "オンラインPDFツール",
   "Online Processing": "オンライン処理",
   "Online Toolkits": "オンラインツール",
   "Open Source / Freeware": "オープンソース / フリーウェア",
   "Operating Systems": "オペレーティングシステム",
   "Optimization": "最適化",
   "P2P Transfer": "P2P転送",
   "PHP": "PHP",
   "Painting / Drawing": "ペイント / ドローイング",
   "Palette Generators": "パレット生成",
   "Party / Multiplayer": "パーティー / マルチプレイヤー",
   "Pastebins": "Pastebin",
   "Paywall Bypass": "ペイウォール回避",
   "Pen Testing": "ペネトレーションテスト",
   "Periodic Tables": "周期表",
   "Philosophy": "哲学",
   "Photo Forensics / Metadata": "写真フォレンジック / メタデータ",
   "Physical Health": "身体的健康",
   "Physics": "物理学",
   "Pixel Art": "ピクセルアート",
   "Platformer": "プラットフォーマー",
   "Players / Frontends": "プレーヤー / フロントエンド",
   "Playstation Homebrew": "PlayStation自作ソフト",
   "Playstation ROMs": "PlayStation ROM",
   "Podcast Streaming": "ポッドキャストストリーミング",
   "Poll Sites": "投票サイト",
   "Porn Quitting": "ポルノ断ち",
   "Premium Only Launchers": "プレミアム専用ランチャー",
   "Presentation Templates": "プレゼンテーションテンプレート",
   "Price Tracking": "価格追跡",
   "Processing / Encoding": "処理 / エンコーディング",
   "Productivity / App Blockers": "生産性 / アプリブロッカー",
   "Productivity / Calendars": "生産性 / カレンダー",
   "Programming Languages": "プログラミング言語",
   "Proxy Sites": "プロキシサイト",
   "Python": "Python",
   "RSS Readers": "RSSリーダー",
   "Racing": "レーシング",
   "Random Generators": "ランダム生成",
   "Recipe Sites": "レシピサイト",
   "Repacks": "リパック",
   "Reverse Engineering": "リバースエンジニアリング",
   "Reviews / Ratings": "レビュー / 評価",
   "Ricing": "ライシング",
   "Rubik's Cube": "ルービックキューブ",
   "Ruby": "Ruby",
   "Rust": "Rust",
   "SQL": "SQL",
   "Safety Sites": "安全サイト",
   "Scene / DDL": "Scene / DDL",
   "Screen Recorders": "画面録画",
   "Screenshot Apps": "スクリーンショットアプリ",
   "Selectively Blocked": "選択的ブロック",
   "Shopping": "ショッピング",
   "Site Analytics": "サイト分析",
   "Site Discovery": "サイト発見",
   "Social Media": "ソーシャルメディア",
   "Song Identification": "楽曲認識",
   "Sound Effects": "効果音",
   "South Asian": "南アジア言語",
   "Spanish": "スペイン語",
   "Spatial Audio": "空間オーディオ",
   "Speed / Performance": "速度 / パフォーマンス",
   "Sports Streaming": "スポーツストリーミング",
   "Static Hosting": "静的ホスティング",
   "Steam / Epic": "Steam / Epic",
   "Stock / News": "株式 / ニュース",
   "Streaming Sites": "ストリーミングサイト",
   "Sudoku": "数独",
   "Switch Homebrew": "Switch自作ソフト",
   "Switch ROMs": "Switch ROM",
   "System Audio": "システムオーディオ",
   "Tab Managers": "タブマネージャー",
   "Task Automation": "タスク自動化",
   "Telegram Bots": "Telegramボット",
   "Temporary Email": "一時メール",
   "Text Customization": "テキストカスタマイズ",
   "Text-to-Speech": "テキスト読み上げ",
   "Textures / Patterns": "テクスチャ / パターン",
   "Torrent Clients": "トレントクライアント",
   "Torrent Search": "トレント検索",
   "Tracing / Sketching": "トレーシング / スケッチ",
   "Translators": "翻訳ツール",
   "Travel": "旅行",
   "Typing Lessons": "タイピング練習",
   "UI / UX": "UI / UX",
   "URL Shorteners": "URL短縮",
   "USB / Bootable": "USB / ブータブル",
   "Unsafe Sites": "危険なサイト",
   "Unsafe Software": "危険なソフトウェア",
   "Upscale / Restore": "アップスケール / 復元",
   "Usenet": "Usenet",
   "Utilities": "ユーティリティ",
   "Video Editors": "動画エディタ",
   "Video File Hosts": "動画ファイルホスト",
   "Virtual Machines": "仮想マシン",
   "Wallpapers": "壁紙",
   "Warez Scripts": "Warezスクリプト",
   "Web Archives": "Webアーカイブ",
   "Web Scraping": "Webスクレイピング",
   "Wiki Indexes": "Wikiインデックス",
   "Windows Debloating": "Windowsデブロート",
   "Windows ISOs": "Windows ISO",
   "Windows Updates": "Windows更新",
   "Writing Prompts": "ライティングプロンプト",
   "YouTube Apps": "YouTubeアプリ",
   "YouTube Frontends": "YouTubeフロントエンド",
   "Android TV / Firestick": "Android TV / Firestick",
   "CSS": "CSS",
   "RPG": "RPG",
   "Downloading / Baixar": "ダウンロード / Baixar",
   "Downloading / Descargar": "ダウンロード / Descargar",
   "Downloading / Herunterladen": "ダウンロード / Herunterladen",
   "Downloading / Mengunduh": "ダウンロード / Mengunduh",
   "Downloading / Pobieranie": "ダウンロード / Pobieranie",
   "Downloading / Scaricare": "ダウンロード / Scaricare",
   "EmulatorJS / NeptunJS": "EmulatorJS / NeptunJS",
   "FOSS APK": "FOSS APK",
   "GeoGuessr": "GeoGuessr",
   "Git Gud": "Git Gud",
   "HTML": "HTML",
   "Hackintosh": "Hackintosh",
   "JEE / NEET": "JEE / NEET",
   "Java / Kotlin": "Java / Kotlin",
   "JavaScript": "JavaScript",
   "MOD APK": "MOD APK",
   "Nintendo ROM": "Nintendo ROM",
   "PHP": "PHP",
   "Pastebin": "Pastebin",
   "PlayStation ROM": "PlayStation ROM",
   "Productivity / Time Tracking": "生産性 / 時間管理",
   "Providers": "プロバイダー",
   "Proxy Lists": "プロキシリスト",
   "Proxy Servers": "プロキシサーバー",
   "Public Domain": "パブリックドメイン",
   "Python": "Python",
   "Quotes / Poetry": "引用 / 詩",
   "ROM Resources": "ROMリソース",
   "RPG Worldbuilding": "RPGワールドビルディング",
   "RPGs": "RPG",
   "RSS Feed Generators": "RSSフィードジェネレーター",
   "Radio Directories": "ラジオディレクトリ",
   "Railway Maps": "鉄道地図",
   "Random": "ランダム",
   "Raspberry Pi": "Raspberry Pi",
   "React": "React",
   "Recipes": "レシピ",
   "Reddit Alternatives": "Reddit代替",
   "Redirect Bypass": "リダイレクト回避",
   "Remakes / Recreations": "リメイク / 再制作",
   "Remote Desktop": "リモートデスクトップ",
   "Remote Jobs": "リモートジョブ",
   "Resume / Portfolio": "履歴書 / ポートフォリオ",
   "Revival Projects": "リバイバルプロジェクト",
   "Root / Flash": "ルート / フラッシュ",
   "Rubiks Cube": "ルービックキューブ",
   "SAT Testing": "SAT試験",
   "SFX / Loops": "SFX / ループ",
   "SMS Verification Sites": "SMS認証サイト",
   "STEM Resources": "STEMリソース",
   "SVG Icons": "SVGアイコン",
   "Satellite / Earth Data": "衛星 / 地球データ",
   "Science News": "科学ニュース",
   "Self-Hosted": "セルフホスト",
   "Self-Hosted Wiki Alts": "セルフホストWiki代替",
   "Server / Bot Indexes": "サーバー / ボットインデックス",
   "Server / Selfhosting": "サーバー / セルフホスティング",
   "Sexual Health": "性的健康",
   "Shooter": "シューター",
   "Sign Languages": "手話",
   "Simulation": "シミュレーション",
   "Single Server": "シングルサーバー",
   "Site Legitimacy Check": "サイト正当性チェック",
   "Skills / Hobbies / DIY": "スキル / 趣味 / DIY",
   "Software Sites": "ソフトウェアサイト",
   "Song / Artist Discovery": "曲 / アーティスト発見",
   "Spacecraft": "宇宙船",
   "Spectrum Analyzers": "スペクトラムアナライザー",
   "Sports Replays": "スポーツリプレイ",
   "Spreadsheet Editors": "スプレッドシートエディタ",
   "Startup": "スタートアップ",
   "Static Page Hosting": "静的ページホスティング",
   "Steam Deck": "Steam Deck",
   "Strategy": "ストラテジー",
   "Stream Aggregators": "ストリームアグリゲーター",
   "Stream Sync": "ストリーム同期",
   "Streaming": "ストリーミング",
   "Streaming / Menyiarkan": "ストリーミング / Menyiarkan",
   "Streaming / Nanonood": "ストリーミング / Nanonood",
   "Streaming / Streamear": "ストリーミング / Streamear",
   "Streaming / Suoratoisto": "ストリーミング / Suoratoisto",
   "Streaming Apps": "ストリーミングアプリ",
   "Study / Research": "学習 / 研究",
   "Subdomains Services": "サブドメインサービス",
   "Subreddit Discovery": "Subreddit発見",
   "Survival": "サバイバル",
   "System Tweaks": "システムチューニング",
   "TV Streaming": "TVストリーミング",
   "Tech Jobs": "テック求人",
   "Tech News": "テックニュース",
   "Telegram Channels": "Telegramチャンネル",
   "Telegram eBook Download": "Telegram電子書籍ダウンロード",
   "Temp Mail": "テンポラリーメール",
   "Terminal / CLI": "ターミナル / CLI",
   "Tetris": "テトリス",
   "Textbooks": "教科書",
   "To Do Lists": "ToDoリスト",
   "To-Do Apps": "ToDoアプリ",
   "Toys / Collectibles": "おもちゃ / コレクティブル",
   "Trivia / Guessing": "トリビア / 推測",
   "Twitch Adblockers": "Twitch広告ブロッカー",
   "Twitch Players": "Twitchプレーヤー",
   "Twitter/X Archiving": "Twitter/Xアーカイブ",
   "Twitter/X Customization": "Twitter/Xカスタマイズ",
   "UI / UX": "UI / UX",
   "USB / Bootloaders": "USB / ブートローダー",
   "Udemy Coupons": "Udemyクーポン",
   "Unicode Characters": "Unicode文字",
   "Untouched APKs": "未改変APK",
   "Userscripts": "ユーザースクリプト",
   "VFX Sites": "VFXサイト",
   "VPN Server": "VPNサーバー",
   "Virtual Reality": "仮想現実",
   "Virtual Tours": "バーチャルツアー",
   "Voice Change / Clone": "ボイスチェンジ / クローン",
   "Voice Removal / Separation": "ボイス除去 / 分離",
   "Weather Apps": "天気アプリ",
   "Web / App Builders": "Web / アプリビルダー",
   "Web Development": "Web開発",
   "Web Scraping / Crawling": "Webスクレイピング / クローリング",
   "Website Builders": "Webサイトビルダー",
   "Wii U / Wii Homebrew": "Wii U / Wii自作ソフト",
   "Window Managers": "ウィンドウマネージャー",
   "Windows Activation": "Windows認証",
   "Windows Repair": "Windows修復",
   "Workout / Exercise": "ワークアウト / 運動",
   "Xbox Homebrew": "Xbox自作ソフト",
   "YouTube Archiving": "YouTubeアーカイブ",
   "YouTube Channels": "YouTubeチャンネル",
   "YouTube Customization": "YouTubeカスタマイズ",
   "iOS Adblocking": "iOS広告ブロック",
   "iOS Jailbreaking": "iOSジェイルブレイク",
   "iOS Podcasts / Radio": "iOSポッドキャスト / ラジオ",
   "iOS Relaxation": "iOSリラクゼーション",
   "iOS Sideloading": "iOSサイドローディング",
   "iOS YouTube Apps": "iOS YouTubeアプリ",
   "Official Model Sites": "公式モデルサイト",
   "Multiple Model Sites": "マルチモデルサイト",
   "Specialized Chatbots": "特化型チャットボット",
   "Local AI Frontends": "ローカルAIフロントエンド",
   "Self-Hosting Tools": "セルフホスティングツール",
   "Roleplaying Chatbots": "ロールプレイチャットボット",
   "AI Tools": "AIツール",
   "AI Prompts": "AIプロンプト",
   "AI Indexes": "AIインデックス",
   "AI Benchmarks": "AIベンチマーク",
   "Specialized Benchmarks": "特化型ベンチマーク",
   "Coding Benchmarks": "コーディングベンチマーク",
   "AI Writing Tools": "AIライティングツール",
   "Video Generation": "動画生成",
   "Image Generation": "画像生成",
   "Local Frontends": "ローカルフロントエンド",
   "Guides / Tools": "ガイド / ツール",
   "Image Restoration": "画像復元",
   "Audio Generation": "音声生成",
   "Text to Speech": "テキスト読み上げ",
   "Voice Cloning": "ボイスクローン",
   "Voice Change / Separation": "ボイスチェンジ / 分離",
   "Audio Streaming": "音楽ストリーミング",
   "Audio Downloading": "音楽ダウンロード",
   "Audio Ripping": "音声リッピング",
   "Audio Torrenting": "音楽トレント",
   "Media Servers": "メディアサーバー",
   "Audio Players": "音楽プレーヤー",
   "Audio Editors / Recorders": "音声編集 / 録音",
   "Audio Synthesizers": "音声シンセサイザー",
   "Song Discovery": "音楽発見",
   "Ambient Sound": "環境音",
   "Podcasts / Radio": "ポッドキャスト / ラジオ",
   "General": "一般",
   "Adblock Filters": "広告ブロックフィルター",
   "DNS Adblocking": "DNS広告ブロック",
   "Antivirus": "アンチウイルス",
   "File Scanners": "ファイルスキャナー",
   "Privacy Extensions": "プライバシー拡張機能",
   "Password Managers": "パスワードマネージャー",
   "Encrypted Messaging": "暗号化メッセージ",
   "Email Privacy": "メールプライバシー",
   "Proxy Sites": "プロキシサイト",
   "VPN": "VPN",
   "DNS": "DNS",
   "Anime Streaming": "アニメストリーミング",
   "Live TV / Sports": "ライブTV / スポーツ",
   "Cartoons": "カートゥーン",
   "Video Downloading": "動画ダウンロード",
   "Video Torrenting": "動画トレント",
   "Anime Downloading": "アニメダウンロード",
   "Anime Torrenting": "アニメトレント",
   "Tracking / Discovery": "トラッキング / 発見",
   "Download Sites": "ダウンロードサイト",
   "ROM Sites": "ROMサイト",
   "Emulators": "エミュレーター",
   "Browser Games": "ブラウザゲーム",
   "Game Mods": "ゲームMOD",
   "Game Launchers": "ゲームランチャー",
   "Game Libraries": "ゲームライブラリ",
   "Game Engines": "ゲームエンジン",
   "Game Deals": "ゲームセール",
   "API Tools": "APIツール",
   "Database Tools": "データベースツール",
   "Git Tools": "Gitツール",
   "IDE / Code Editors": "IDE / コードエディタ",
   "Terminal / Shell": "ターミナル / シェル",
   "Package Managers": "パッケージマネージャー",
   "Web Frameworks": "Webフレームワーク",
   "Static Site Generators": "静的サイトジェネレーター",
   "Hosting": "ホスティング",
   "Domain Names": "ドメイン名",
   "Deployment": "デプロイ",
   "CI/CD": "CI/CD",
   "Testing": "テスト",
   "Monitoring": "モニタリング",
   "Documentation": "ドキュメンテーション",
   "Code Snippets": "コードスニペット",
   "Design / UI": "デザイン / UI",
   "Fonts": "フォント",
   "Icons": "アイコン",
   "Color": "カラー",
   "Color Palettes": "カラーパレット",
   "CSS Tools": "CSSツール",
   "CSS Frameworks": "CSSフレームワーク",
   "Regex": "正規表現",
   "Ebook Sites": "電子書籍サイト",
   "Audiobooks": "オーディオブック",
   "Manga / Comics": "漫画 / コミック",
   "Magazines": "雑誌",
   "Academic / Educational": "学術 / 教育",
   "Newspapers": "新聞",
   "Android Apps": "Androidアプリ",
   "iOS Apps": "iOSアプリ",
   "Android Tools": "Androidツール",
   "iOS Tools": "iOSツール",
   "APK Sites": "APKサイト",
   "Android Emulators": "Androidエミュレーター",
   "Custom ROMs": "カスタムROM",
   "Modded APKs": "MOD APK",
   "Courses / Tutorials": "コース / チュートリアル",
   "Language Learning": "語学学習",
   "Science": "科学",
   "Math": "数学",
   "History": "歴史",
   "Programming": "プログラミング",
   "Computer Science": "コンピュータサイエンス",
   "Windows Tools": "Windowsツール",
   "Hardware Monitoring": "ハードウェアモニタリング",
   "Disk Tools": "ディスクツール",
   "System Optimization": "システム最適化",
   "System Cleaners": "システムクリーナー",
   "Backup / Recovery": "バックアップ / リカバリー",
   "File Managers": "ファイルマネージャー",
   "File Conversion": "ファイル変換",
   "File Sharing": "ファイル共有",
   "File Hosting": "ファイルホスティング",
   "Compression": "圧縮",
   "Data Recovery": "データ復旧",
   "Web Browsers": "Webブラウザ",
   "Browser Extensions": "ブラウザ拡張機能",
   "Download Managers": "ダウンロードマネージャー",
   "Email Clients": "メールクライアント",
   "Search": "検索",
   "Bookmarks": "ブックマーク",
   "RSS": "RSS",
   "Proxy / VPN": "プロキシ / VPN",
   "Text Editors": "テキストエディタ",
   "Note Taking": "ノートアプリ",
   "Markdown": "Markdown",
   "PDF Tools": "PDFツール",
   "Writing Tools": "ライティングツール",
   "Translation Tools": "翻訳ツール",
   "OCR": "OCR",
   "Image Editors": "画像エディタ",
   "Image Viewers": "画像ビューア",
   "Screenshot Tools": "スクリーンショットツール",
   "Photo Management": "写真管理",
   "Image Hosting": "画像ホスティング",
   "Image Converters": "画像コンバーター",
   "YouTube Tools": "YouTubeツール",
   "Reddit Tools": "Redditツール",
   "Twitter Tools": "Twitterツール",
   "Discord Tools": "Discordツール",
   "Twitch Tools": "Twitchツール",
   "Cloud Storage": "クラウドストレージ",
   "File Sync": "ファイル同期",
   "Self-Hosted Storage": "セルフホストストレージ",
   "Video Editors": "動画エディタ",
   "Video Converters": "動画コンバーター",
   "Video Players": "動画プレーヤー",
   "Screen Recording": "画面録画",
   "Video Downloaders": "動画ダウンローダー",
   "Torrent Sites": "トレントサイト",
   "Torrent Tools": "トレントツール",
   "Indexes": "インデックス",
   "Guides": "ガイド",
   "Resources": "リソース",
   "Alternatives": "代替ツール",
   "Comparison": "比較",
   "Free Alternatives": "無料代替ツール",
};

const WORD_TRANSLATIONS = {
  tools: "ツール",
  tool: "ツール",
  chatbot: "チャットボット",
  chatbots: "チャットボット",
  search: "検索",
  engine: "エンジン",
  engines: "エンジン",
  video: "動画",
  videos: "動画",
  image: "画像",
  images: "画像",
  audio: "音声",
  music: "音楽",
  privacy: "プライバシー",
  security: "セキュリティ",
  vpn: "VPN",
  browser: "ブラウザ",
  browsers: "ブラウザ",
  extension: "拡張機能",
  extensions: "拡張機能",
  file: "ファイル",
  files: "ファイル",
  text: "テキスト",
  gaming: "ゲーム",
  games: "ゲーム",
  game: "ゲーム",
  downloader: "ダウンローダー",
  downloaders: "ダウンローダー",
  converter: "変換",
  converters: "変換",
  storage: "ストレージ",
  cloud: "クラウド",
  mobile: "モバイル",
  linux: "Linux",
  macos: "macOS",
  windows: "Windows",
  torrent: "トレント",
  torrenting: "トレント",
  clients: "クライアント",
  client: "クライアント",
  trackers: "トラッカー",
  tracker: "トラッカー",
  guide: "ガイド",
  guides: "ガイド",
  beginner: "初心者",
  beginners: "初心者",
  educational: "教育",
  education: "教育",
  learning: "学習",
  social: "SNS",
  media: "メディア",
  internet: "インターネット",
  reading: "読書",
  books: "書籍",
  manga: "マンガ",
  anime: "アニメ",
};

function cleanInlineMarkdown(text) {
  return text
    .replace(/\*\*/g, "")
    .replace(/`/g, "")
    .trim();
}

function cleanDescription(desc) {
  let cleaned = cleanInlineMarkdown(desc || "");

  cleaned = cleaned.replace(/,\s*\[\d+\]\([^)]+\)/g, "");
  cleaned = cleaned.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
  cleaned = cleaned.replace(/\*\*([^*]+)\*\*/g, "$1");

  cleaned = cleaned.replace(/\s*\/\s*/g, " / ");
  cleaned = cleaned.replace(/(?:\s*\/\s*){2,}/g, " / ");
  cleaned = cleaned.replace(/(?:\s*\/\s*)+$/g, "");
  cleaned = cleaned.replace(/^\s*\/\s*/g, "");

  cleaned = cleaned.replace(/\s{2,}/g, " ");
  cleaned = cleaned.replace(/\s+([,.!?:;])/g, "$1");
  cleaned = cleaned.trim();

  return cleaned;
}

function translateNote(note) {
  if (!note) return note;

  let ja = note;
  ja = ja.replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, "$1");
  ja = ja.replace(/we\s+(?:highly\s+)?recommend\s+using\s+an?\s+adblocker/gi, "広告ブロッカーの使用を強く推奨します");
  ja = ja.replace(/don't run multiple general adblockers \(e\.g\.,[^)]+\) simultaneously to avoid breakage/gi, "複数の一般的な広告ブロッカーを同時に使用すると不具合の原因になるため避けてください");
  ja = ja.replace(/It's never a good idea to upload anything personal/gi, "個人情報のアップロードは避けてください");
  ja = ja.replace(/Requires? Sign-?Up/gi, "サインアップ必要");
  ja = ja.replace(/No Sign-?Up/gi, "サインアップ不要");
  ja = ja.replace(/use.*?at your own risk/gi, "自己責任でご利用ください");
  ja = ja.replace(/Keep in mind/gi, "ご注意ください");
  ja = ja.replace(/Remember to/gi, "忘れずに");
  ja = ja.replace(/Always check/gi, "必ず確認してください");
  ja = ja.replace(/Always/gi, "常に");
  ja = ja.replace(/We (?:highly )?recommend/gi, "推奨します");
  ja = ja.replace(/Don't forget to/gi, "忘れずに");
  ja = ja.replace(/avoid breakage/gi, "不具合を避ける");
  ja = ja.replace(/adblockers?/gi, "広告ブロッカー");
  ja = ja.replace(/\s{2,}/g, " ").trim();

  return ja;
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function normalizeSubcategoryTitle(rawTitle) {
  const title = cleanInlineMarkdown(rawTitle)
    .replace(/^▷\s*/, "")
    .replace(/^\[(.*?)\]\((.*?)\)$/, "$1")
    .trim();

  if (!title) return "";

  const complete = COMPLETE_TITLE_MAP[title];
  if (complete) return complete;

  const whole = WHOLE_TITLE_TRANSLATIONS[title.toLowerCase()];
  if (whole) return whole;

  const parts = title.split(/(\s+|\/|&|-|\(|\)|,)/);
  let translatedCount = 0;
  const translated = parts
    .map((part) => {
      if (!part || /^(\s+|\/|&|-|\(|\)|,)$/.test(part)) {
        return part;
      }
      const lower = part.toLowerCase();
      const mapped = WORD_TRANSLATIONS[lower];
      if (mapped) {
        translatedCount += 1;
        return mapped;
      }
      return part;
    })
    .join("");

  return translatedCount > 0 ? translated.trim() : title;
}

function extractDescriptionAndTags(descriptionRaw) {
  let description = descriptionRaw || "";
  const tags = [];

  description = description.replace(/\[(Discord|GitHub|Subreddit|Telegram)\]\((https?:\/\/[^)]+)\)/gi, (_, tag) => {
    const normalized = COMMUNITY_TAGS.find((v) => v.toLowerCase() === String(tag).toLowerCase());
    if (normalized && !tags.includes(normalized)) {
      tags.push(normalized);
    }
    return "";
  });

  description = cleanDescription(description)
    .replace(/\s*[|,]\s*$/g, "")
    .replace(/^\s*[|,]\s*/g, "")
    .trim();

  return { description, tags };
}

function parseResourceLine(line) {
  const trimmed = line.trim();
  if (!trimmed.startsWith("* ")) return null;
  if (trimmed.includes("↪️")) return null;

  const noteMatch = trimmed.match(/^\*\s+\*\*Note\*\*\s*(?:-|:)\s*(.+)$/i);
  if (noteMatch) {
    return { type: "note", note: translateNote(cleanInlineMarkdown(noteMatch[1])) };
  }

  let content = trimmed.slice(2).trim();
  const starred = content.includes("⭐");
  const indexResource = content.includes("🌐");

  content = content.replace(/[⭐🌐]/gu, "").trim();

  const dashIndex = content.indexOf(" - ");
  const leftPart = dashIndex >= 0 ? content.slice(0, dashIndex).trim() : content;
  const rightPart = dashIndex >= 0 ? content.slice(dashIndex + 3).trim() : "";

  const links = [...leftPart.matchAll(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g)];
  if (links.length === 0) return null;

  const [first, ...remainingLinks] = links;
  const hasNumericMirrors =
    remainingLinks.length > 0 &&
    remainingLinks.every((entry) => /^\d+$/.test(cleanInlineMarkdown(entry[1])));

  const { description, tags: communityTags } = extractDescriptionAndTags(rightPart);
  const baseTags = [];
  if (indexResource) baseTags.push("index");
  for (const tag of communityTags) {
    if (!baseTags.includes(tag)) baseTags.push(tag);
  }

  const createResource = (name, url, options = {}) => {
    const resource = {
      name,
      url,
      description,
    };

    if (options.starred) {
      resource.starred = true;
    }

    if (baseTags.length > 0) {
      resource.tags = baseTags;
    }

    if (options.mirrors && options.mirrors.length > 0) {
      resource.mirrors = options.mirrors;
    }

    return resource;
  };

  if (hasNumericMirrors) {
    const mirrors = remainingLinks.map((m) => m[2].trim());
    return {
      type: "resources",
      resources: [
        createResource(cleanInlineMarkdown(first[1]), first[2].trim(), {
          starred,
          mirrors,
        }),
      ],
    };
  }

  const resources = links.map((entry, index) =>
    createResource(cleanInlineMarkdown(entry[1]), entry[2].trim(), {
      starred: starred && index === 0,
    })
  );

  return { type: "resources", resources };
}

function parseMarkdownToCategory(categoryId, markdown) {
  const meta = CATEGORY_META[categoryId];
  if (!meta) return null;

  const lines = markdown.split(/\r?\n/);
  const subcategories = [];

  let currentSubcategory = null;
  let subcategoryCounter = 0;

  const pushCurrentSubcategory = () => {
    if (!currentSubcategory) return;
    if (currentSubcategory.resources.length === 0) return;
    subcategories.push(currentSubcategory);
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line === "***") continue;

    if (/^#\s+►\s+\[.*?\]\(.*?\)\s*$/.test(line)) {
      continue;
    }

    const subMatch = line.match(/^#{2,3}\s+(?:▷\s+)?(.+)$/);
    if (subMatch) {
      pushCurrentSubcategory();

      const originalTitle = cleanInlineMarkdown(subMatch[1]);
      const translatedTitle = normalizeSubcategoryTitle(originalTitle);
      const subSlug = slugify(originalTitle) || `section-${subcategoryCounter + 1}`;
      subcategoryCounter += 1;

      currentSubcategory = {
        id: `${categoryId}-${subSlug}`,
        title: translatedTitle,
        resources: [],
      };
      continue;
    }

    const canParseStandaloneLinks =
      !line.startsWith("* ") &&
      /^\[[^\]]+\]\(https?:\/\//.test(line) &&
      !/back to wiki index/i.test(line);

    if (!line.startsWith("* ") && !canParseStandaloneLinks) continue;

    if (!currentSubcategory) {
      currentSubcategory = {
        id: `${categoryId}-general`,
        title: normalizeSubcategoryTitle("General"),
        resources: [],
      };
    }

    const parsed = parseResourceLine(line.startsWith("* ") ? line : `* ${line}`);
    if (!parsed) continue;

    if (parsed.type === "note") {
      if (currentSubcategory.note) {
        currentSubcategory.note += ` ${parsed.note}`;
      } else {
        currentSubcategory.note = parsed.note;
      }
      continue;
    }

    currentSubcategory.resources.push(...parsed.resources);
  }

  pushCurrentSubcategory();

  if (subcategories.length === 0) return null;

  const totalResources = subcategories.reduce((sum, sub) => sum + sub.resources.length, 0);
  if (totalResources === 0) return null;

  return {
    id: categoryId,
    slug: categoryId,
    title: meta.titleJa,
    description: meta.description,
    icon: meta.icon,
    color: meta.color,
    subcategories,
  };
}

function toCamelCase(value) {
  return value.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

function buildIndexTs(categoryIds) {
  const importLines = categoryIds
    .map((id) => `import ${toCamelCase(id)}Data from "./resources/${id}.json";`)
    .join("\n");

  const categoryRefs = categoryIds
    .map((id) => `${toCamelCase(id)}Data as Category`)
    .join(",\n  ");

  return `import { Category } from "@/lib/types";\n${importLines}\n\nexport const categories: Category[] = [\n  ${categoryRefs},\n];\n`;
}

async function fetchMarkdown(fileName) {
  const url = `${RAW_BASE_URL}/${fileName}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${fileName}: ${response.status} ${response.statusText}`);
  }
  return response.text();
}

async function main() {
  await mkdir(RESOURCES_DIR, { recursive: true });

  const fetched = [];
  for (const file of FILES) {
    const content = await fetchMarkdown(file);
    fetched.push({ file, content });
  }

  const mainCategoryIds = FILES
    .map((file) => file.replace(/\.md$/, ""))
    .filter((id) => id !== "beginners-guide" && id !== "feedback");

  const generatedCategories = [];

  for (const id of mainCategoryIds) {
    const source = fetched.find((entry) => entry.file === `${id}.md`);
    if (!source) continue;

    const category = parseMarkdownToCategory(id, source.content);
    if (!category) continue;

    const outputPath = path.join(RESOURCES_DIR, `${id}.json`);
    await writeFile(outputPath, `${JSON.stringify(category, null, 2)}\n`, "utf8");
    generatedCategories.push(id);
  }

  const categoryMetaOutput = {};
  for (const id of generatedCategories) {
    categoryMetaOutput[id] = {
      id,
      slug: id,
      titleJa: CATEGORY_META[id].titleJa,
      icon: CATEGORY_META[id].icon,
      color: CATEGORY_META[id].color,
      description: CATEGORY_META[id].description,
      sourceFile: `${id}.md`,
    };
  }

  await writeFile(
    path.join(DATA_DIR, "category-meta.json"),
    `${JSON.stringify(categoryMetaOutput, null, 2)}\n`,
    "utf8"
  );

  const indexTs = buildIndexTs(generatedCategories);
  await writeFile(path.join(DATA_DIR, "index.ts"), indexTs, "utf8");

  console.log(`Fetched ${fetched.length} markdown files.`);
  console.log(`Generated ${generatedCategories.length} category JSON files.`);
  console.log("Wrote src/data/category-meta.json and src/data/index.ts");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
