import { Category } from "@/lib/types";

export const categories: Category[] = [
  {
    id: "privacy",
    slug: "privacy",
    title: "広告ブロック / プライバシー",
    description: "広告やトラッカーをブロックし、プライバシーを守る方法を学びましょう。",
    icon: "🛡️",
    color: "from-emerald-500 to-teal-600",
    subcategories: [
      {
        id: "adblocking",
        title: "広告ブロック",
        note: "多くのサイトには広告やポップアップが含まれているため、広告ブロッカーの使用を強くお勧めします。複数の汎用広告ブロッカーを同時に使用しないでください。",
        resources: [
          { name: "uBlock Origin", url: "https://github.com/gorhill/uBlock", description: "最も人気のある広告ブロッカー拡張機能。軽量で高性能。", starred: true, tags: ["拡張機能", "必須"] },
          { name: "uBO Lite", url: "https://github.com/uBlockOrigin/uBOL-home", description: "Manifest V3対応の軽量版uBlock Origin。", tags: ["拡張機能", "MV3"] },
          { name: "AdGuard", url: "https://github.com/AdguardTeam/AdguardBrowserExtension", description: "高機能な広告ブロッカー。ブラウザ拡張機能とスタンドアロン版あり。", starred: true, tags: ["拡張機能", "アプリ"] },
          { name: "SponsorBlock", url: "https://sponsor.ajay.app/", description: "YouTubeのスポンサー広告をスキップする拡張機能。", starred: true, tags: ["YouTube", "拡張機能"] },
          { name: "Disblock Origin", url: "https://codeberg.org/AllPurposeMat/Disblock-Origin", description: "DiscordのNitro/Boost広告を非表示にする。", tags: ["Discord"] },
          { name: "PopUpOFF", url: "https://popupoff.org/", description: "強力なポップアップブロッカー。", tags: ["拡張機能"] },
          { name: "BehindTheOverlay", url: "https://github.com/NicolaeNMV/BehindTheOverlay", description: "ウェブサイトのオーバーレイを非表示にする。", tags: ["拡張機能"] },
        ]
      },
      {
        id: "adblock-filters",
        title: "広告ブロックフィルター",
        note: "サードパーティのフィルターリストを試す前に、uBOの設定で追加フィルターを確認してください。",
        resources: [
          { name: "Hagezi Blocklists", url: "https://github.com/hagezi/dns-blocklists", description: "包括的なブロックリストコレクション。", starred: true, tags: ["フィルター"] },
          { name: "FilterLists", url: "https://filterlists.com/", description: "フィルター/ホストリストのディレクトリ。", tags: ["ディレクトリ"] },
          { name: "LegitimateURLShortener", url: "https://raw.githubusercontent.com/DandelionSprout/adfilt/refs/heads/master/LegitimateURLShortener.txt", description: "URLクエリパラメータのクリーニングルール。", starred: true, tags: ["フィルター"] },
          { name: "Huge AI Blocklist", url: "https://github.com/laylavish/uBlockOrigin-HUGE-AI-Blocklist", description: "検索エンジンからAI生成画像を除去する。", tags: ["AI", "フィルター"] },
        ]
      },
      {
        id: "dns-adblocking",
        title: "DNS広告ブロック",
        note: "ブラウザ広告のブロックが目的なら、uBlock Originの使用が最善です。",
        resources: [
          { name: "Pi-Hole", url: "https://pi-hole.net/", description: "セルフホスト型DNS広告ブロック。Raspberry Piで人気。", starred: true, tags: ["セルフホスト", "DNS"] },
          { name: "AdGuard Home", url: "https://adguard.com/en/adguard-home/overview.html", description: "セルフホスト型DNS広告ブロック。WebUIで簡単管理。", starred: true, tags: ["セルフホスト", "DNS"] },
          { name: "NextDNS", url: "https://nextdns.io", description: "カスタマイズ可能なDNS広告ブロックサービス。", tags: ["クラウド", "DNS"] },
          { name: "Mullvad DNS", url: "https://mullvad.net/en/help/dns-over-https-and-dns-over-tls/", description: "DNS広告ブロック/フィルタリング。プライバシー重視。", starred: true, tags: ["DNS", "プライバシー"] },
        ]
      },
      {
        id: "antivirus",
        title: "アンチウイルス / マルウェア対策",
        note: "Windows Defenderのリアルタイム保護を有効にしておくことをお勧めします。",
        resources: [
          { name: "Malwarebytes", url: "https://www.malwarebytes.com/", description: "高性能なアンチウイルス/マルウェア対策ソフト。", starred: true, tags: ["アンチウイルス"] },
          { name: "VirusTotal", url: "https://www.virustotal.com/", description: "オンラインファイルスキャナー。複数のエンジンでチェック。", starred: true, tags: ["スキャナー", "オンライン"] },
          { name: "Sandboxie Plus", url: "https://sandboxie-plus.com/", description: "サンドボックス環境でアプリを安全に実行。", tags: ["サンドボックス"] },
          { name: "AdwCleaner", url: "https://www.malwarebytes.com/adwcleaner/", description: "アドウェア専用の除去ツール。", starred: true, tags: ["アドウェア"] },
        ]
      },
      {
        id: "vpn",
        title: "VPN",
        note: "プライバシーや速度を重視するなら、有料VPNの使用をお勧めします。無料VPNはウェブサイトのブロック解除に便利です。",
        resources: [
          { name: "Proton VPN", url: "https://protonvpn.com", description: "無料プランあり。無制限帯域。高いプライバシー保護。", starred: true, tags: ["無料", "プライバシー"] },
          { name: "WARP", url: "https://one.one.one.one/", description: "Cloudflareの無料VPN。無制限。高速。", starred: true, tags: ["無料", "高速"] },
          { name: "Windscribe", url: "https://windscribe.com", description: "月10GB無料。使いやすいインターフェース。", starred: true, tags: ["無料", "10GB"] },
          { name: "Mullvad VPN", url: "https://mullvad.net/", description: "有料。ノーログポリシー。高いプライバシー保護。", tags: ["有料", "プライバシー"] },
          { name: "AirVPN", url: "https://airvpn.org/", description: "有料。高度な設定が可能。", tags: ["有料"] },
          { name: "RiseupVPN", url: "https://riseup.net/en/vpn", description: "無料。無制限。オープンソース。", starred: true, tags: ["無料", "オープンソース"] },
        ]
      },
      {
        id: "privacy-tools",
        title: "プライバシーツール",
        resources: [
          { name: "Privacy Guides", url: "https://www.privacyguides.org/", description: "プライバシーに関する包括的なガイド。", starred: true, tags: ["ガイド"] },
          { name: "Tor Browser", url: "https://www.torproject.org/", description: "オニオンルーティングによる匿名ブラウザ。", starred: true, tags: ["ブラウザ", "匿名"] },
          { name: "Tails", url: "https://tails.net/", description: "プライバシー重視のオペレーティングシステム。", tags: ["OS"] },
          { name: "SimpleX", url: "https://simplex.chat/", description: "暗号化されたプライベートメッセンジャー。", starred: true, tags: ["メッセンジャー"] },
          { name: "Signal", url: "https://signal.org/", description: "エンドツーエンド暗号化メッセンジャー。", starred: true, tags: ["メッセンジャー"] },
          { name: "Proton Mail", url: "https://proton.me/mail", description: "暗号化メールサービス。1GB無料。", starred: true, tags: ["メール", "暗号化"] },
        ]
      }
    ]
  },
  {
    id: "ai",
    slug: "ai",
    title: "人工知能（AI）",
    description: "AIとマシンラーニングの世界を探索しましょう。チャットボット、画像生成、動画生成など。",
    icon: "🤖",
    color: "from-violet-500 to-purple-600",
    subcategories: [
      {
        id: "ai-chatbots",
        title: "AIチャットボット",
        note: "クラウドベースのAIに個人情報や機密情報をアップロードしないでください。プライバシーが必要な場合は、ローカルでLLMを実行することをお勧めします。",
        resources: [
          { name: "AI Studio (Gemini)", url: "https://aistudio.google.com/app/prompts/new_chat", description: "Google Gemini 3 Pro Preview。1日11回。要サインアップ。", starred: true, tags: ["Google", "Gemini"] },
          { name: "Grok", url: "https://grok.com/", description: "Grok 4 Fast（1日96回）。xAIのチャットボット。", starred: true, tags: ["xAI"] },
          { name: "ChatGPT", url: "https://chatgpt.com/", description: "OpenAIのGPT-5.2 Instant。世界で最も有名なAIチャットボット。", tags: ["OpenAI"] },
          { name: "DeepSeek", url: "https://chat.deepseek.com/", description: "DeepSeek-V3.2。要サインアップ。無制限。", starred: true, tags: ["中国", "無制限"] },
          { name: "Claude", url: "https://claude.ai/", description: "Anthropic Claude 4.5 Sonnet。Googleログイン必須。", tags: ["Anthropic"] },
          { name: "Microsoft Copilot", url: "https://copilot.microsoft.com", description: "GPT-5.1。無制限。", starred: true, tags: ["Microsoft", "無制限"] },
          { name: "Qwen", url: "https://chat.qwen.ai/", description: "Alibaba Qwen3-Max。無制限。", tags: ["Alibaba", "無制限"] },
          { name: "Mistral", url: "https://chat.mistral.ai", description: "Mistral Large 3。フランス発のAI。", tags: ["フランス"] },
        ]
      },
      {
        id: "ai-search",
        title: "AI検索エンジン",
        resources: [
          { name: "Perplexity", url: "https://www.perplexity.ai/", description: "AIベースの検索エンジン。ソース付き回答。", starred: true, tags: ["検索"] },
          { name: "Arena", url: "https://arena.ai/?mode=direct&chat-modality=search", description: "AI検索エンジン。サインアップ不要。", starred: true, tags: ["検索", "サインアップ不要"] },
          { name: "Google AI Mode", url: "https://google.com/aimode", description: "GoogleのAI検索モード。", tags: ["Google", "検索"] },
          { name: "NotebookLM", url: "https://notebooklm.google/", description: "ドキュメントチャットボット/ノート取り。", starred: true, tags: ["Google", "ドキュメント"] },
        ]
      },
      {
        id: "image-generation",
        title: "画像生成",
        resources: [
          { name: "Gemini", url: "https://gemini.google.com/", description: "Nano Banana（1日100枚）。Googleログイン必須。", starred: true, tags: ["Google", "無料"] },
          { name: "Bing Create", url: "https://www.bing.com/images/create", description: "DALL-E-3 / GPT-4o。無制限。要サインアップ。", starred: true, tags: ["Microsoft", "無制限"] },
          { name: "Perchance", url: "https://perchance.org/ai-photo-generator", description: "サインアップ不要。無制限。一部NSFW。", starred: true, tags: ["サインアップ不要", "無制限"] },
          { name: "Grok Imagine", url: "https://grok.com/imagine", description: "xAIの画像生成。トラフィックベース。", starred: true, tags: ["xAI"] },
          { name: "ImageFX", url: "https://labs.google/fx/tools/image-fx", description: "Google Imagen 4。無制限。地域制限あり。", tags: ["Google"] },
          { name: "ComfyUI", url: "https://www.comfy.org/", description: "ローカル画像生成フロントエンド。ノードベース。", starred: true, tags: ["ローカル", "オープンソース"] },
        ]
      },
      {
        id: "video-generation",
        title: "動画生成",
        resources: [
          { name: "Sora", url: "https://openai.com/index/sora/", description: "OpenAIの動画生成AI。1日6回。", tags: ["OpenAI"] },
          { name: "Vheer", url: "https://vheer.com/", description: "無制限。サインアップ不要。", tags: ["サインアップ不要", "無制限"] },
          { name: "Wan AI", url: "https://wan.video/", description: "Wan 2.6。画像から動画生成可能。", tags: ["中国"] },
          { name: "PixVerse", url: "https://pixverse.ai/", description: "1日3回。使いやすいインターフェース。", tags: ["無料"] },
        ]
      },
      {
        id: "local-ai",
        title: "ローカルAI",
        resources: [
          { name: "Ollama", url: "https://ollama.com/", description: "ローカルでLLMを簡単に実行。コマンドライン。", starred: true, tags: ["ローカル", "CLI"] },
          { name: "LM Studio", url: "https://lmstudio.ai/", description: "GUIでローカルLLMを管理・実行。", starred: true, tags: ["ローカル", "GUI"] },
          { name: "Jan", url: "https://jan.ai/", description: "セルフホスト型AIフロントエンド。", starred: true, tags: ["ローカル", "GUI"] },
          { name: "Open WebUI", url: "https://openwebui.com/", description: "セルフホスト型Webインターフェース。", starred: true, tags: ["ローカル", "Web"] },
          { name: "GPT4All", url: "https://www.nomic.ai/gpt4all", description: "ローカルで動くAIチャットボット。", tags: ["ローカル"] },
        ]
      }
    ]
  },
  {
    id: "video",
    slug: "video",
    title: "動画 / 映画 / アニメ",
    description: "映画、テレビ、アニメのストリーミング、ダウンロード、トレントを楽しもう。",
    icon: "🎬",
    color: "from-red-500 to-rose-600",
    subcategories: [
      {
        id: "streaming-sites",
        title: "ストリーミングサイト",
        note: "広告ブロッカーをインストールし、サインアップ時は使い捨てメールを使用してください。",
        resources: [
          { name: "Cineby", url: "https://www.cineby.gd/", description: "映画/TV/アニメ。自動次話再生。", starred: true, tags: ["映画", "TV", "アニメ"] },
          { name: "Rive", url: "https://rivestream.org/", description: "映画/TV/アニメ。自動次話再生。複数ミラー。", starred: true, tags: ["映画", "TV", "アニメ"] },
          { name: "P-Stream", url: "https://pstream.mov/", description: "映画/TV/アニメ。デスクトップアプリあり。", starred: true, tags: ["映画", "TV", "アニメ"] },
          { name: "FlickyStream", url: "https://flickystream.ru/", description: "映画/TV/アニメ。自動次話再生。", starred: true, tags: ["映画", "TV", "アニメ"] },
          { name: "Flixer", url: "https://flixer.sh", description: "映画/TV/アニメ。自動次話再生。アグリゲーター。", starred: true, tags: ["映画", "TV", "アニメ"] },
          { name: "Filmex", url: "https://filmex.to/", description: "映画/TV/アニメ。自動次話再生。4K対応。", starred: true, tags: ["映画", "TV", "4K"] },
          { name: "Tubi", url: "https://tubitv.com", description: "無料（広告あり）。映画/TV。720p。合法。", starred: true, tags: ["合法", "広告あり"] },
        ]
      },
      {
        id: "anime-streaming",
        title: "アニメストリーミング",
        resources: [
          { name: "AnimeKai", url: "https://animekai.to/home", description: "字幕/吹替。自動次話再生。", starred: true, tags: ["字幕", "吹替"] },
          { name: "HiAnime", url: "https://hianime.to/", description: "字幕/吹替。自動次話再生。人気サイト。", starred: true, tags: ["字幕", "吹替"] },
          { name: "Miruro", url: "https://www.miruro.com/", description: "字幕/吹替。自動次話再生。美しいUI。", starred: true, tags: ["字幕", "吹替"] },
          { name: "animepahe", url: "https://animepahe.si/", description: "字幕/吹替。軽量。低帯域幅向け。", starred: true, tags: ["字幕", "軽量"] },
          { name: "KickAssAnime", url: "https://kaa.to/", description: "字幕/吹替。自動次話再生。", starred: true, tags: ["字幕", "吹替"] },
        ]
      },
      {
        id: "video-platforms",
        title: "動画プラットフォーム",
        resources: [
          { name: "YouTube", url: "https://www.youtube.com/", description: "世界最大の動画プラットフォーム。", starred: true, tags: ["プラットフォーム"] },
          { name: "BiliBili", url: "https://www.bilibili.com/", description: "中国の動画プラットフォーム。アニメコンテンツ豊富。", starred: true, tags: ["中国", "アニメ"] },
          { name: "Niconico", url: "https://www.nicovideo.jp/", description: "日本の動画プラットフォーム。コメント機能が特徴。", starred: true, tags: ["日本"] },
          { name: "Dailymotion", url: "https://www.dailymotion.com/", description: "フランスの動画プラットフォーム。", starred: true, tags: ["フランス"] },
        ]
      }
    ]
  },
  {
    id: "audio",
    slug: "audio",
    title: "音楽 / ポッドキャスト / ラジオ",
    description: "音楽のストリーミング、ダウンロード、ポッドキャスト、ラジオを楽しもう。",
    icon: "🎵",
    color: "from-pink-500 to-fuchsia-600",
    subcategories: [
      {
        id: "music-streaming",
        title: "音楽ストリーミング",
        resources: [
          { name: "Spotify", url: "https://www.spotify.com/", description: "世界最大の音楽ストリーミング。無料プランあり。", starred: true, tags: ["ストリーミング"] },
          { name: "YouTube Music", url: "https://music.youtube.com/", description: "YouTubeの音楽ストリーミングサービス。", starred: true, tags: ["Google"] },
          { name: "SoundCloud", url: "https://soundcloud.com/", description: "インディーズ音楽プラットフォーム。", tags: ["インディーズ"] },
          { name: "Deezer", url: "https://www.deezer.com/", description: "音楽ストリーミング。歌詞表示対応。", tags: ["ストリーミング"] },
        ]
      },
      {
        id: "music-download",
        title: "音楽ダウンロード",
        resources: [
          { name: "DoubleDouble", url: "https://doubledouble.top/", description: "FLAC/MP3ダウンロード。高音質。", starred: true, tags: ["FLAC", "MP3"] },
          { name: "Free MP3 Download", url: "https://free-mp3-download.net/", description: "MP3/FLAC無料ダウンロード。", tags: ["MP3", "FLAC"] },
        ]
      },
      {
        id: "podcast",
        title: "ポッドキャスト",
        resources: [
          { name: "Apple Podcasts", url: "https://www.apple.com/apple-podcasts/", description: "Appleのポッドキャストプラットフォーム。", tags: ["Apple"] },
          { name: "Pocket Casts", url: "https://pocketcasts.com/", description: "クロスプラットフォーム対応ポッドキャストアプリ。", starred: true, tags: ["アプリ"] },
        ]
      }
    ]
  },
  {
    id: "gaming",
    slug: "gaming",
    title: "ゲーム / エミュレーション",
    description: "ゲームのダウンロード、プレイ、レトロゲームのエミュレーション。",
    icon: "🎮",
    color: "from-green-500 to-emerald-600",
    subcategories: [
      {
        id: "game-download",
        title: "ゲームダウンロード",
        resources: [
          { name: "FitGirl Repacks", url: "https://fitgirl-repacks.site/", description: "高圧縮ゲームリパック。信頼性が高い。", starred: true, tags: ["リパック"] },
          { name: "DODI Repacks", url: "https://dodi-repacks.site/", description: "ゲームリパック。高速インストール。", starred: true, tags: ["リパック"] },
          { name: "SteamRIP", url: "https://steamrip.com/", description: "Steamゲームの事前インストール済みダウンロード。", starred: true, tags: ["Steam"] },
          { name: "GOG Games", url: "https://gog-games.to/", description: "DRMフリーゲームのダウンロード。", starred: true, tags: ["DRMフリー"] },
        ]
      },
      {
        id: "emulation",
        title: "エミュレーション",
        resources: [
          { name: "RetroArch", url: "https://www.retroarch.com/", description: "マルチシステムエミュレータフロントエンド。", starred: true, tags: ["マルチ", "フロントエンド"] },
          { name: "Ryujinx", url: "https://github.com/ryujinx-mirror/ryujinx", description: "Nintendo Switchエミュレーター。", starred: true, tags: ["Switch"] },
          { name: "PCSX2", url: "https://pcsx2.net/", description: "PlayStation 2エミュレーター。", starred: true, tags: ["PS2"] },
          { name: "Dolphin", url: "https://dolphin-emu.org/", description: "GameCube/Wiiエミュレーター。", starred: true, tags: ["GameCube", "Wii"] },
          { name: "RPCS3", url: "https://rpcs3.net/", description: "PlayStation 3エミュレーター。", tags: ["PS3"] },
        ]
      },
      {
        id: "free-games",
        title: "無料ゲーム",
        resources: [
          { name: "Epic Games Store", url: "https://store.epicgames.com/free-games", description: "毎週無料ゲーム配布。", starred: true, tags: ["無料", "週替わり"] },
          { name: "r/FreeGameFindings", url: "https://www.reddit.com/r/FreeGameFindings/", description: "無料ゲーム情報のRedditコミュニティ。", starred: true, tags: ["Reddit", "情報"] },
        ]
      }
    ]
  },
  {
    id: "reading",
    slug: "reading",
    title: "読書 / 漫画 / コミック",
    description: "本、漫画、コミック、ライトノベルなど、あらゆる読み物を見つけよう。",
    icon: "📚",
    color: "from-amber-500 to-orange-600",
    subcategories: [
      {
        id: "ebooks",
        title: "電子書籍",
        resources: [
          { name: "Anna's Archive", url: "https://annas-archive.org/", description: "世界最大のオープンライブラリ。あらゆる本を検索。", starred: true, tags: ["ライブラリ", "検索"] },
          { name: "Z-Library", url: "https://z-lib.gs/", description: "巨大な電子書籍ライブラリ。", starred: true, tags: ["ライブラリ"] },
          { name: "Library Genesis", url: "https://libgen.is/", description: "学術書籍・論文のアーカイブ。", starred: true, tags: ["学術", "ライブラリ"] },
          { name: "Project Gutenberg", url: "https://www.gutenberg.org/", description: "パブリックドメインの電子書籍。無料。合法。", starred: true, tags: ["合法", "無料"] },
          { name: "Internet Archive Books", url: "https://archive.org/details/texts", description: "Internet Archiveの書籍コレクション。", tags: ["アーカイブ"] },
        ]
      },
      {
        id: "manga",
        title: "漫画",
        resources: [
          { name: "MangaDex", url: "https://mangadex.org/", description: "最大のマンガリーダー。多言語対応。広告なし。", starred: true, tags: ["マンガ", "多言語"] },
          { name: "MangaSee", url: "https://mangasee123.com/", description: "高品質マンガリーダー。公式翻訳。", starred: true, tags: ["マンガ", "高品質"] },
          { name: "ComicK", url: "https://comick.io/", description: "高速マンガリーダー。きれいなUI。", starred: true, tags: ["マンガ", "高速"] },
          { name: "Tachiyomi", url: "https://tachiyomi.org/", description: "Androidマンガリーダーアプリ。オープンソース。", starred: true, tags: ["Android", "アプリ"] },
        ]
      },
      {
        id: "comics",
        title: "コミック",
        resources: [
          { name: "ReadComicOnline", url: "https://readcomiconline.li/", description: "アメコミオンラインリーダー。", starred: true, tags: ["アメコミ"] },
          { name: "GetComics", url: "https://getcomics.org/", description: "コミックのダウンロード。", starred: true, tags: ["ダウンロード"] },
        ]
      }
    ]
  },
  {
    id: "downloading",
    slug: "downloading",
    title: "ダウンロード",
    description: "ソフトウェア、映画、音楽、ゲームなどのダウンロード。",
    icon: "💾",
    color: "from-cyan-500 to-blue-600",
    subcategories: [
      {
        id: "download-software",
        title: "ソフトウェアダウンロード",
        resources: [
          { name: "FileCR", url: "https://filecr.com/", description: "ソフトウェア、アプリのダウンロード。", starred: true, tags: ["ソフトウェア"] },
          { name: "RSLOAD", url: "https://rsload.net/", description: "ソフトウェアダウンロード。多言語。", tags: ["ソフトウェア"] },
          { name: "Soft98", url: "https://soft98.ir/", description: "ソフトウェアダウンロード。", tags: ["ソフトウェア"] },
        ]
      },
      {
        id: "download-managers",
        title: "ダウンロードマネージャー",
        resources: [
          { name: "JDownloader 2", url: "https://jdownloader.org/", description: "強力なオープンソースダウンロードマネージャー。", starred: true, tags: ["オープンソース"] },
          { name: "IDM", url: "https://www.internetdownloadmanager.com/", description: "高速ダウンロードマネージャー。", starred: true, tags: ["有料"] },
          { name: "Free Download Manager", url: "https://www.freedownloadmanager.org/", description: "無料のダウンロードマネージャー。トレント対応。", tags: ["無料", "トレント"] },
        ]
      }
    ]
  },
  {
    id: "torrenting",
    slug: "torrenting",
    title: "トレント",
    description: "BitTorrentプロトコルを使ったメディアダウンロード。",
    icon: "🌊",
    color: "from-blue-600 to-indigo-700",
    subcategories: [
      {
        id: "torrent-clients",
        title: "トレントクライアント",
        resources: [
          { name: "qBittorrent", url: "https://www.qbittorrent.org/", description: "オープンソースのトレントクライアント。広告なし。", starred: true, tags: ["オープンソース", "広告なし"] },
          { name: "Deluge", url: "https://deluge-torrent.org/", description: "軽量オープンソーストレントクライアント。", tags: ["オープンソース", "軽量"] },
          { name: "Transmission", url: "https://transmissionbt.com/", description: "シンプルで軽量なトレントクライアント。", tags: ["シンプル", "軽量"] },
        ]
      },
      {
        id: "torrent-sites",
        title: "トレントサイト",
        resources: [
          { name: "1337x", url: "https://1337x.to/", description: "人気トレントサイト。きれいなUI。", starred: true, tags: ["総合"] },
          { name: "RARBG (clone)", url: "https://rargb.to/", description: "RARBGのクローンサイト。", tags: ["総合"] },
          { name: "Nyaa", url: "https://nyaa.si/", description: "アニメ/マンガ専用トレントサイト。", starred: true, tags: ["アニメ", "マンガ"] },
          { name: "RuTracker", url: "https://rutracker.org/", description: "ロシアのトレントフォーラム。幅広いコンテンツ。", starred: true, tags: ["フォーラム"] },
        ]
      }
    ]
  },
  {
    id: "educational",
    slug: "educational",
    title: "教育",
    description: "すべての年齢向け教育コンテンツ。コース、チュートリアル、学習リソース。",
    icon: "🎓",
    color: "from-indigo-500 to-blue-600",
    subcategories: [
      {
        id: "courses",
        title: "オンラインコース",
        resources: [
          { name: "Khan Academy", url: "https://www.khanacademy.org/", description: "無料の教育プラットフォーム。数学、科学など。", starred: true, tags: ["無料", "数学", "科学"] },
          { name: "MIT OpenCourseWare", url: "https://ocw.mit.edu/", description: "MITの無料オンラインコース教材。", starred: true, tags: ["MIT", "無料"] },
          { name: "Coursera", url: "https://www.coursera.org/", description: "大学のオンラインコース。一部無料。", tags: ["大学", "一部無料"] },
          { name: "freeCodeCamp", url: "https://www.freecodecamp.org/", description: "無料のプログラミング学習プラットフォーム。", starred: true, tags: ["プログラミング", "無料"] },
        ]
      },
      {
        id: "languages",
        title: "言語学習",
        resources: [
          { name: "Duolingo", url: "https://www.duolingo.com/", description: "ゲーム感覚で言語学習。無料。", starred: true, tags: ["無料", "ゲーム化"] },
          { name: "Anki", url: "https://apps.ankiweb.net/", description: "フラッシュカードで効率的な暗記。", starred: true, tags: ["フラッシュカード", "無料"] },
        ]
      }
    ]
  },
  {
    id: "mobile",
    slug: "mobile",
    title: "Android / iOS",
    description: "AndroidとiOS向けのアプリ、ツール、リソース。",
    icon: "📱",
    color: "from-lime-500 to-green-600",
    subcategories: [
      {
        id: "android-apps",
        title: "Androidアプリ",
        resources: [
          { name: "F-Droid", url: "https://f-droid.org/", description: "オープンソースAndroidアプリストア。", starred: true, tags: ["オープンソース", "ストア"] },
          { name: "Aurora Store", url: "https://auroraoss.com/", description: "Google Play Storeの代替クライアント。", starred: true, tags: ["代替", "プライバシー"] },
          { name: "ReVanced", url: "https://revanced.app/", description: "YouTubeなどのアプリをパッチ。広告除去。", starred: true, tags: ["YouTube", "パッチ"] },
          { name: "Lucky Patcher", url: "https://www.luckypatchers.com/", description: "アプリのパッチツール。Root推奨。", tags: ["パッチ", "Root"] },
        ]
      },
      {
        id: "ios-apps",
        title: "iOSアプリ",
        resources: [
          { name: "AltStore", url: "https://altstore.io/", description: "サイドロードアプリストア。脱獄不要。", starred: true, tags: ["サイドロード"] },
          { name: "Sideloadly", url: "https://sideloadly.io/", description: "iOSアプリのサイドロードツール。", starred: true, tags: ["サイドロード"] },
        ]
      }
    ]
  },
  {
    id: "linux-macos",
    slug: "linux-macos",
    title: "Linux / macOS",
    description: "LinuxとmacOSのユーザー向けリソース。",
    icon: "🐧",
    color: "from-orange-500 to-red-600",
    subcategories: [
      {
        id: "linux-distros",
        title: "Linuxディストリビューション",
        resources: [
          { name: "Ubuntu", url: "https://ubuntu.com/", description: "最も人気のあるLinuxディストリビューション。初心者向け。", starred: true, tags: ["初心者向け"] },
          { name: "Fedora", url: "https://fedoraproject.org/", description: "最新技術を採用。Red Hat系。", starred: true, tags: ["最新"] },
          { name: "Arch Linux", url: "https://archlinux.org/", description: "カスタマイズ性が高い。上級者向け。", starred: true, tags: ["上級者向け"] },
          { name: "Linux Mint", url: "https://linuxmint.com/", description: "Windowsからの移行に最適。使いやすい。", starred: true, tags: ["初心者向け"] },
        ]
      },
      {
        id: "macos-tools",
        title: "macOSツール",
        resources: [
          { name: "Homebrew", url: "https://brew.sh/", description: "macOS用パッケージマネージャー。必須ツール。", starred: true, tags: ["パッケージマネージャー"] },
          { name: "Rectangle", url: "https://rectangleapp.com/", description: "ウィンドウ管理ツール。無料。", starred: true, tags: ["ウィンドウ管理", "無料"] },
        ]
      }
    ]
  },
  {
    id: "misc",
    slug: "misc",
    title: "その他",
    description: "食べ物、旅行、ニュース、ショッピング、楽しいサイトなど。",
    icon: "🌟",
    color: "from-slate-500 to-gray-600",
    subcategories: [
      {
        id: "useful-sites",
        title: "便利なサイト",
        resources: [
          { name: "12ft.io", url: "https://12ft.io/", description: "ペイウォールを回避してニュース記事を読む。", starred: true, tags: ["ペイウォール回避"] },
          { name: "Wayback Machine", url: "https://web.archive.org/", description: "ウェブサイトのアーカイブ。過去のページを閲覧。", starred: true, tags: ["アーカイブ"] },
          { name: "AlternativeTo", url: "https://alternativeto.net/", description: "ソフトウェアの代替を探す。", starred: true, tags: ["代替ソフト"] },
        ]
      },
      {
        id: "fun-sites",
        title: "おもしろサイト",
        resources: [
          { name: "The Useless Web", url: "https://theuselessweb.com/", description: "ランダムに面白いサイトへ飛ぶ。", tags: ["面白い"] },
          { name: "Window Swap", url: "https://www.window-swap.com/", description: "世界中の窓からの景色を見る。", tags: ["リラックス"] },
        ]
      }
    ]
  },
  {
    id: "developer-tools",
    slug: "developer-tools",
    title: "開発者ツール",
    description: "プログラミング、Web開発、DevOpsに必要なツールとリソース。",
    icon: "💻",
    color: "from-sky-500 to-cyan-600",
    subcategories: [
      {
        id: "code-editors",
        title: "コードエディタ",
        resources: [
          { name: "VS Code", url: "https://code.visualstudio.com/", description: "最も人気のあるコードエディタ。拡張機能豊富。", starred: true, tags: ["エディタ", "Microsoft"] },
          { name: "Cursor", url: "https://cursor.sh/", description: "AI統合コードエディタ。VS Codeベース。", starred: true, tags: ["AI", "エディタ"] },
          { name: "Zed", url: "https://zed.dev/", description: "高速コードエディタ。Rust製。", tags: ["高速", "Rust"] },
          { name: "Neovim", url: "https://neovim.io/", description: "Vimの進化版。プログラマー向け。", starred: true, tags: ["ターミナル"] },
        ]
      },
      {
        id: "hosting",
        title: "ホスティング",
        resources: [
          { name: "Vercel", url: "https://vercel.com/", description: "フロントエンドの無料ホスティング。Next.jsに最適。", starred: true, tags: ["無料", "Next.js"] },
          { name: "Netlify", url: "https://www.netlify.com/", description: "静的サイトの無料ホスティング。", starred: true, tags: ["無料", "静的"] },
          { name: "Cloudflare Pages", url: "https://pages.cloudflare.com/", description: "高速な無料ホスティング。CDN統合。", starred: true, tags: ["無料", "CDN"] },
          { name: "GitHub Pages", url: "https://pages.github.com/", description: "GitHubリポジトリからの無料ホスティング。", tags: ["無料", "GitHub"] },
        ]
      }
    ]
  },
  {
    id: "system-tools",
    slug: "system-tools",
    title: "システムツール",
    description: "Windows、ファイル管理、システム最適化のツール。",
    icon: "⚙️",
    color: "from-gray-500 to-zinc-600",
    subcategories: [
      {
        id: "windows-tools",
        title: "Windowsツール",
        resources: [
          { name: "PowerToys", url: "https://github.com/microsoft/PowerToys", description: "Microsoft公式のWindows拡張ユーティリティ集。", starred: true, tags: ["Microsoft", "公式"] },
          { name: "Everything", url: "https://www.voidtools.com/", description: "超高速ファイル検索ツール。", starred: true, tags: ["検索", "高速"] },
          { name: "7-Zip", url: "https://www.7-zip.org/", description: "無料の圧縮/解凍ソフト。", starred: true, tags: ["圧縮", "無料"] },
        ]
      }
    ]
  }
];
