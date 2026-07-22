const projects = [
  {
    title: "Codex Rate Widget",
    repo: "https://github.com/dueyama/codex-rate-widget",
    demo: "",
    kind: "tool",
    description:
      "Codex利用が増えたため、5時間・週次の残量や7日間の使用量を作業中に把握できるよう作った、macOSデスクトップウィジェット/メニューバーアプリ。",
    tags: ["macOS", "SwiftUI", "WidgetKit"],
  },
  {
    title: "Traffic Jam Phase Lab",
    repo: "https://github.com/dueyama/ov-model-traffic-lab",
    demo: "https://ov-model-traffic-lab.vercel.app/",
    kind: "simulation",
    description:
      "Optimal Velocity交通流モデルを円環道路上で動かし、密度、感度、摂動、基本図、渋滞クラスタの発生を観察するNext.jsアプリ。",
    tags: ["traffic flow", "Next.js", "Bando 1995"],
  },
  {
    title: "PMDA PK Curve Viewer",
    repo: "https://github.com/dueyama/pmda-pk-curve-viewer",
    demo: "https://pmda-pk-curve-viewer.vercel.app/",
    kind: "tool",
    description:
      "PMDA電子添文XMLから薬物動態候補値を抽出し、教育用の血中濃度概算カーブとして表示する日本語Webアプリ。",
    tags: ["PMDA", "PK", "Next.js"],
  },
  {
    title: "Phase-Field Dendrite Lab",
    repo: "https://github.com/dueyama/kobayashi-phase-field-lab",
    demo: "https://kobayashi-phase-field-lab.vercel.app/",
    kind: "simulation",
    description:
      "Kobayashiのphase-field樹枝状成長モデルを2D/3Dで再現し、WebGL/three.jsで観察・出力するViteアプリ。",
    tags: ["phase-field", "three.js", "Vite"],
  },
  {
    title: "Tanaka Swarm Oscillators",
    repo: "https://github.com/dueyama/tanaka-swarm-oscillators",
    demo: "https://tanaka-swarm-oscillators.vercel.app/",
    kind: "simulation",
    description:
      "Dan Tanakaのchemotactic/swarm oscillatorモデルを、位相色つき粒子・プリセット・PNG保存つきで探索するCanvasアプリ。",
    tags: ["oscillators", "Canvas", "static"],
  },
  {
    title: "Gray-Scott 3D",
    repo: "https://github.com/dueyama/gray-scott-3d",
    demo: "https://gray-scott-3d.vercel.app/",
    kind: "simulation",
    description:
      "3次元Gray-Scott反応拡散モデルを、WebGL2 volume renderingとMarching Cubesで眺める教育向けWebアプリ。",
    tags: ["Gray-Scott", "WebGL2", "Vite"],
  },
  {
    title: "Phyllotaxis Simulator",
    repo: "https://github.com/dueyama/phyllotaxis-simulator",
    demo: "https://phyllotaxis-simulator.vercel.app/",
    kind: "simulation",
    description:
      "Douady-Couderの物理モデルに基づき、Gの変化とFibonacci parastichyの形成をブラウザ上で可視化する葉序シミュレータ。",
    tags: ["phyllotaxis", "Vite", "Douady-Couder"],
  },
  {
    title: "Regulation Lab",
    repo: "https://github.com/dueyama/regulation-lab",
    demo: "https://regulation-lab.vercel.app/",
    kind: "simulation",
    description:
      "局所接触から比率調整が立ち上がるPCA/latticeモデルとbilliard風拡張を扱う、自己組織化比率調整の実験ツール。",
    tags: ["self-organization", "Vite", "JTB 2018"],
  },
  {
    title: "ThreeBody Atlas",
    repo: "https://github.com/dueyama/three-body-atlas",
    demo: "https://three-body-atlas.vercel.app/",
    kind: "simulation",
    description:
      "三体問題の既知軌道例をカタログ化し、2D/投影3D、RK4/RK45、摂動、ローカライズUIで探索するNext.jsアプリ。",
    tags: ["three-body", "Next.js", "RK45"],
  },
  {
    title: "PrimePortrait Maker",
    repo: "https://github.com/dueyama/primeportrait-maker",
    demo: "https://primeportrait-maker.vercel.app/",
    kind: "tool",
    description:
      "画像を3840桁の数字肖像に変換し、末尾だけを変えながら巨大な probable-prime 候補を探すブラウザ完結ツール。",
    tags: ["BigInt", "prime", "Next.js"],
  },
  {
    title: "BlockchainJewelryConcept",
    repo: "https://github.com/dueyama/BlockchainJewelryConcept",
    demo: "https://www.bcj-concept.com/",
    demoLabel: "Project",
    kind: "art",
    description:
      "Ethereumのブロックサイズ列から、Spiral Manifoldなどのブロックチェーン由来ジュエリー/彫刻作品を生成するリポジトリ。",
    tags: ["Ethereum", "NFT", "3D art"],
  },
  {
    title: "Buddhist Text Embedding Map",
    repo: "https://github.com/dueyama/buddhist-text-embedding-map",
    demo: "https://dueyama.github.io/buddhist-text-embedding-map/",
    demoLabel: "Pages",
    kind: "research",
    description:
      "漢訳仏典・日本撰述仏教文献・多言語対応関係を、意味埋め込みによる探索地図として公開した研究リポジトリ。",
    tags: ["embeddings", "Buddhist texts", "GitHub Pages"],
  },
  {
    title: "Honen-Shinran Shared Core Map",
    repo: "https://github.com/dueyama/honen-shinran-shared-core-map",
    demo: "https://dueyama.github.io/honen-shinran-shared-core-map/",
    demoLabel: "Pages",
    kind: "research",
    description:
      "法然『選択集』と親鸞『教行信証』を、意味層・語彙層・典拠マーカー層で比較する公開論文/図表/再現コード。",
    tags: ["Honen", "Shinran", "research pages"],
  },
  {
    title: "Hyakunin Isshu Semantic Map",
    repo: "https://github.com/dueyama/hyakunin-isshu-semantic-map",
    demo: "https://dueyama.github.io/hyakunin-isshu-semantic-map/",
    demoLabel: "Pages",
    kind: "research",
    description:
      "小倉百人一首と百人秀歌の歌順を、意味空間・隣接類似度・配列差分から探索するHTMLシリーズ記事。",
    tags: ["waka", "semantic map", "GitHub Pages"],
  },
  {
    title: "FinderHistory",
    repo: "https://github.com/dueyama/FinderHistory",
    demo: "",
    kind: "tool",
    description:
      "閉じたFinderウィンドウのフォルダをメニューバーから再オープンするmacOSユーティリティ。Codexによる安全確認つき導入を想定。",
    tags: ["macOS", "Swift", "agent install"],
  },
  {
    title: "WindowSeat",
    repo: "https://github.com/dueyama/windowseat-desktop",
    demo: "",
    kind: "tool",
    description:
      "AIエージェントが選ぶ風景ライブカメラを、Macのデスクトップ上の静かな窓として表示するmacOSプロトタイプ。",
    tags: ["macOS", "AI agent", "Swift"],
  },
  {
    title: "Conjecture Golf",
    repo: "https://github.com/dueyama/conjecture-golf",
    demo: "",
    kind: "tool",
    description:
      "GitHub Issueを試合場、コメントを手、Python verifierを審判にする、AIエージェント向けのGitHubネイティブゲーム。",
    tags: ["AI game", "GitHub Issues", "verifier"],
  },
];

const vercelProjects = [
  ["ov-model-traffic-lab", "nextjs", "2026-06-30", "https://ov-model-traffic-lab.vercel.app/", "https://github.com/dueyama/ov-model-traffic-lab", "https://ov-model-traffic-lab.vercel.app/icon.png?icon.1jayfd1k7j33q.png"],
  ["pmda-pk-curve-viewer", "nextjs", "2026-06-09", "https://pmda-pk-curve-viewer.vercel.app/", "https://github.com/dueyama/pmda-pk-curve-viewer", "https://pmda-pk-curve-viewer.vercel.app/icon.png"],
  ["kobayashi-phase-field-lab", "vite", "2026-06-18", "https://kobayashi-phase-field-lab.vercel.app/", "https://github.com/dueyama/kobayashi-phase-field-lab", "https://kobayashi-phase-field-lab.vercel.app/favicon-32x32.png"],
  ["tanaka-swarm-oscillators", "static", "2026-06-12", "https://tanaka-swarm-oscillators.vercel.app/", "https://github.com/dueyama/tanaka-swarm-oscillators", "https://tanaka-swarm-oscillators.vercel.app/assets/favicon.png"],
  ["gray-scott-3d", "vite", "2026-06-13", "https://gray-scott-3d.vercel.app/", "https://github.com/dueyama/gray-scott-3d", "https://gray-scott-3d.vercel.app/favicon.svg"],
  ["phyllotaxis-simulator", "vite", "2026-05-31", "https://phyllotaxis-simulator.vercel.app/", "https://github.com/dueyama/phyllotaxis-simulator", "https://phyllotaxis-simulator.vercel.app/favicon.png"],
  ["regulation-lab", "vite", "2026-06-09", "https://regulation-lab.vercel.app/", "https://github.com/dueyama/regulation-lab", "https://regulation-lab.vercel.app/favicon.png"],
  ["three-body-atlas", "nextjs", "2026-04-26", "https://three-body-atlas.vercel.app/", "https://github.com/dueyama/three-body-atlas", "https://three-body-atlas.vercel.app/icon.png"],
  ["primeportrait-maker", "nextjs", "2026-04-30", "https://primeportrait-maker.vercel.app/", "https://github.com/dueyama/primeportrait-maker", "https://primeportrait-maker.vercel.app/icon.png?icon.0~b6v8ga5kfho.png"],
];

const iosApps = [
  {
    jaTitle: "想いの祭壇",
    enTitle: "Omoi Altar",
    jaUrl: "https://apps.apple.com/jp/app/%E6%83%B3%E3%81%84%E3%81%AE%E7%A5%AD%E5%A3%87/id6770172873?uo=4",
    enUrl: "https://apps.apple.com/us/app/omoi-altar/id6770172873?uo=4",
    icon: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/b6/6a/ef/b66aef53-d843-48b5-4963-f162dcc1b55d/icon-0-0-1x_U007epad-0-1-sRGB-85-220.png/100x100bb.jpg",
    genre: "Lifestyle",
    version: "1.3",
    jaDescription: "大切な写真に名前や言葉、花、灯りを添え、小さな祭壇としてiPhone/iPad内やARで飾るローカルファーストなアプリ。",
    enDescription: "Creates a small photo altar on iPhone/iPad, with words, flowers, lights, fullscreen viewing, and AR placement for important photos and memories.",
    noteLinks: [
      {
        jaTitle: "バイブコーディングで「想いの祭壇」を作った手順を公開しよう",
        enTitle: "How Omoi Altar was built with vibe coding",
        url: "https://note.com/daishin_ueyama/n/n82e538b62e32",
      },
      {
        jaTitle: "AR祭壇、「想いの祭壇」をリリースしました",
        enTitle: "AR altar app Omoi Altar released",
        url: "https://note.com/daishin_ueyama/n/n3b7febf86439",
      },
      {
        jaTitle: "Codexと喧嘩した話（AIは反抗期に入るのか？）",
        enTitle: "Working through an altar app issue with Codex",
        url: "https://note.com/daishin_ueyama/n/na43a81b44255",
      },
    ],
  },
  {
    jaTitle: "VintagePhotos",
    enTitle: "VintagePhotosApp",
    jaUrl: "https://apps.apple.com/jp/app/vintagephotos/id6759186598?uo=4",
    enUrl: "https://apps.apple.com/us/app/vintagephotosapp/id6759186598?uo=4",
    icon: "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/a9/2c/a8/a92ca8ef-31f8-dab2-0e7b-8f30edb10635/Icon-0-0-1x_U007epad-0-1-sRGB-85-220.png/100x100bb.jpg",
    genre: "Photo & Video",
    version: "1.3",
    jaDescription: "撮影日時の経過に合わせて、色褪せ、黄ばみ、紙質、傷や埃などを重ね、写真に時間の手触りを与えるアルバムアプリ。",
    enDescription: "A photo album app that gives digital photos the feel of time through simulated fading, paper texture, scratches, dust, and vintage presentation.",
    noteLinks: [
      {
        jaTitle: "色褪せた像は、時間を保存する　〜VintagePhotos アプリが教えてくれたこと",
        enTitle: "What VintagePhotos taught me about time in images",
        url: "https://note.com/daishin_ueyama/n/na47555eedf1b",
      },
      {
        jaTitle: "Codex で iOS アプリ「VintagePhotos」を作成して公開した",
        enTitle: "Building and publishing VintagePhotos with Codex",
        url: "https://note.com/daishin_ueyama/n/n7c76212591ed",
      },
    ],
  },
  {
    jaTitle: "ColorDiary",
    enTitle: "ColorDiaryApp",
    jaUrl: "https://apps.apple.com/jp/app/colordiary/id6759371114?uo=4",
    enUrl: "https://apps.apple.com/us/app/colordiaryapp/id6759371114?uo=4",
    icon: "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/2a/fc/bf/2afcbf76-d89a-c01f-f6f9-d0d47ec75542/Icon-0-0-1x_U007ephone-0-1-sRGB-85-220.png/100x100bb.jpg",
    genre: "Lifestyle",
    version: "1.4",
    jaDescription: "言葉にしづらい日も、1日1色だけを選んで気分を残せる、シンプルな色の日記アプリ。",
    enDescription: "A simple mood journal where each day can be recorded with one color, for days when words are not quite enough.",
    noteLinks: [
      {
        jaTitle: "色日記を ChatGPT に分析させてみた",
        enTitle: "Analyzing ColorDiary entries with ChatGPT",
        url: "https://note.com/daishin_ueyama/n/nd2b01600b375",
      },
      {
        jaTitle: "Codex で ColorDiary アプリを作成した",
        enTitle: "Building ColorDiary with Codex",
        url: "https://note.com/daishin_ueyama/n/nd6d08f731a48",
      },
    ],
  },
  {
    jaTitle: "TheDLA",
    enTitle: "TheDLA",
    jaUrl: "https://apps.apple.com/jp/app/thedla/id506499656?uo=4",
    enUrl: "https://apps.apple.com/us/app/thedla/id506499656?uo=4",
    icon: "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/73/a8/1d/73a81d26-331c-f5c2-6f5d-1b4505779345/TheDLAIcon-0-0-1x_U007epad-0-1-sRGB-85-220.png/100x100bb.jpg",
    genre: "Education",
    version: "3.0",
    jaDescription: "DLAによる自然のパターン形成を楽しみ、偶然が作る形を眺めるサイエンス/教育アプリ。",
    enDescription: "A science and education app for enjoying diffusion-limited aggregation and the pattern-formation mechanisms behind organic-looking shapes.",
    noteLinks: [
      {
        jaTitle: "TheDLA というアプリ",
        enTitle: "TheDLA app",
        url: "https://note.com/daishin_ueyama/n/n79977cfb66d3",
      },
    ],
  },
  {
    jaTitle: "がまん貯金",
    enTitle: "GamanBank",
    jaUrl: "https://apps.apple.com/jp/app/%E3%81%8C%E3%81%BE%E3%82%93%E8%B2%AF%E9%87%91/id1434223708?uo=4",
    enUrl: "https://apps.apple.com/us/app/gamanbank/id1434223708?uo=4",
    icon: "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/ae/d0/48/aed048a6-d3ce-c057-b118-0dc5aced782f/Icon-0-0-1x_U007ephone-0-1-sRGB-85-220.png/100x100bb.jpg",
    genre: "Finance",
    version: "2.3.1",
    jaDescription: "小さな節約や我慢を金額として積み上げ、欲しいものに向かう進み具合を写真やウィジェットで見える化するアプリ。",
    enDescription: "Visualizes small acts of self-restraint as savings progress toward something you want, with photos, goals, widgets, and Apple Watch support.",
    noteLinks: [
      {
        jaTitle: "がまん貯金を ChatGPT in Xcode と協力して調整した",
        enTitle: "Updating GamanBank with ChatGPT in Xcode",
        url: "https://note.com/daishin_ueyama/n/n096a9420d8de",
      },
    ],
  },
  {
    jaTitle: "JoyaTimer",
    enTitle: "JoyaTimer",
    jaUrl: "https://apps.apple.com/jp/app/joyatimer/id495395194?uo=4",
    enUrl: "https://apps.apple.com/us/app/joyatimer/id495395194?uo=4",
    icon: "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/38/37/47/38374787-36f9-3853-4c1c-126cd3ba6102/JoyaTimerIcon-0-0-1x_U007epad-0-1-sRGB-85-220.png/100x100bb.jpg",
    genre: "Utilities",
    version: "7.2",
    jaDescription: "除夜の鐘を一定間隔で鳴らし、0時に108回目を合わせるための寺院向けタイマー。ゲームモードや終了時刻設定も搭載。",
    enDescription: "A specialized timer for ringing Joya no Kane temple bells at precise intervals so the final strike lands at midnight.",
    noteLinks: [
      {
        jaTitle: "除夜タイマーがテレビで紹介された（私も出演させていただいた）",
        enTitle: "JoyaTimer was introduced on TV",
        url: "https://note.com/daishin_ueyama/n/n2604ac1bb183",
      },
      {
        jaTitle: "父の命日に除夜タイマーがラジオで紹介される！という偶然。",
        enTitle: "JoyaTimer was introduced on radio on my father's memorial day",
        url: "https://note.com/daishin_ueyama/n/n0249114826bd",
      },
      {
        jaTitle: "除夜タイマーの頃",
        enTitle: "The season for JoyaTimer",
        url: "https://note.com/daishin_ueyama/n/n0b44d8f33c35",
      },
    ],
  },
];

const englishDescriptions = {
  "Codex Rate Widget":
    "A macOS desktop widget and menu-bar app created as Codex use grew, keeping five-hour and weekly capacity plus seven-day usage visible while working.",
  "Traffic Jam Phase Lab":
    "A Next.js app for exploring the Optimal Velocity traffic-flow model on a circular road, including density, sensitivity, perturbation, fundamental diagrams, and emergent traffic jams.",
  "PMDA PK Curve Viewer":
    "A Japanese educational web app that reads candidate pharmacokinetic values from PMDA electronic package insert XML and displays approximate blood concentration curves.",
  "Phase-Field Dendrite Lab":
    "A Vite app that reproduces Kobayashi's phase-field dendritic growth model in 2D and 3D, with WebGL and three.js visualization and export features.",
  "Tanaka Swarm Oscillators":
    "A Canvas app for exploring Dan Tanaka's chemotactic / swarm oscillator model through phase-colored particles, presets, and PNG snapshots.",
  "Gray-Scott 3D":
    "An educational browser app for observing the three-dimensional Gray-Scott reaction-diffusion model with WebGL2 volume rendering and Marching Cubes.",
  "Phyllotaxis Simulator":
    "A phyllotaxis simulator based on the Douady-Couder physical model, visualizing how changing G leads to Fibonacci parastichy formation.",
  "Regulation Lab":
    "An experimental tool for self-organized proportion regulation, combining local-contact PCA/lattice models with an exploratory billiard-style extension.",
  "ThreeBody Atlas":
    "A Next.js atlas of known three-body problem orbit examples, with 2D/projected-3D views, RK4/RK45 integration, perturbation controls, and localized UI.",
  "PrimePortrait Maker":
    "A fully browser-side tool that converts an image into a 3,840-digit portrait and searches for a giant probable-prime candidate by changing only the suffix.",
  BlockchainJewelryConcept:
    "A repository for generative blockchain-derived jewelry and sculptural works, including Spiral Manifold, built from Ethereum block-size sequences.",
  "Buddhist Text Embedding Map":
    "A public research repository that uses semantic embeddings to build exploratory maps across Chinese Buddhist texts, Japanese Buddhist writings, and multilingual correspondences.",
  "Honen-Shinran Shared Core Map":
    "A public paper, figure, and reproducibility repository comparing Honen's Senchakushu and Shinran's Kyogyoshinsho through semantic, lexical, and source-marker layers.",
  "Hyakunin Isshu Semantic Map":
    "An HTML essay series exploring the ordering of Ogura Hyakunin Isshu and Hyakunin Shuka through semantic space, adjacent similarity, and sequence differences.",
  FinderHistory:
    "A macOS menu-bar utility that reopens recently closed Finder folders, with an installation flow designed for Codex-assisted safety review.",
  WindowSeat:
    "A macOS prototype that displays AI-curated scenic live cameras as a quiet desktop window.",
  "Conjecture Golf":
    "A GitHub-native game for AI agents where Issues are match rooms, comments are moves, and public Python verifiers act as judges.",
};

const projectGrid = document.querySelector("#project-grid");
const vercelTable = document.querySelector("#vercel-table");
const iosAppGrid = document.querySelector("#ios-app-grid");
const filterButtons = document.querySelectorAll(".filter-button");
const publicationList = document.querySelector("#publication-list");
const publicationCount = document.querySelector("#publication-count");
const publicationEmpty = document.querySelector("#publication-empty");
const publicationSearch = document.querySelector("#publication-search");
const publicationToggle = document.querySelector("#publication-toggle");
const publicationFilterButtons = document.querySelectorAll(".publication-filter-button");
const publicationTotalLabels = document.querySelectorAll("[data-publication-total]");
const pressMediaList = document.querySelector("#press-media-list");
const pressMediaCount = document.querySelector("#press-media-count");
const mediaFilterButtons = document.querySelectorAll(".media-filter-button");
const collectionTabs = document.querySelectorAll(".collection-tab");
const collectionPanels = document.querySelectorAll("[data-collection-panel]");
const collectionLinks = document.querySelectorAll("[data-select-collection]");
const projectToggle = document.querySelector("#project-toggle");
const languageLinks = document.querySelectorAll("[data-language-choice]");
const whatsNewList = document.querySelector("#whats-new-list");
const whatsNewPeriod = document.querySelector("#whats-new-period");
const whatsNewNext = document.querySelector("#whats-new-next");
const siteUpdated = document.querySelector("#site-updated");
const codexChoiceSection = document.querySelector("#codex-choice");
const codexChoiceImage = document.querySelector("#codex-choice-image");
const codexChoiceSource = document.querySelector("#codex-choice-source");
const codexChoicePeriod = document.querySelector("#codex-choice-period");
const codexChoiceTitleLink = document.querySelector("#codex-choice-title-link");
const codexChoiceDek = document.querySelector("#codex-choice-dek");
const codexChoiceReflection = document.querySelector("#codex-choice-reflection");
const codexChoiceLink = document.querySelector("#codex-choice-link");
const codexChoiceHistory = document.querySelector("#codex-choice-history");
const codexChoiceHistoryList = document.querySelector("#codex-choice-history-list");
const codexChoiceHistoryToggle = document.querySelector("#codex-choice-history-toggle");
const sunoSummary = document.querySelector("#suno-summary");
const sunoList = document.querySelector("#suno-list");
const sunoHistoryDialog = document.querySelector("#suno-history-dialog");
const sunoSongSelect = document.querySelector("#suno-song-select");
const sunoDialogSummary = document.querySelector("#suno-dialog-summary");
const sunoLargeChart = document.querySelector("#suno-large-chart");
const sunoModeButtons = document.querySelectorAll("[data-suno-mode]");
const isEnglish = document.documentElement.lang.toLowerCase().startsWith("en");
const languageStorageKey = "dueyama-profile-language";
const projectPreviewLimit = 6;
const publicationPreviewLimit = 12;
const choiceHistoryPreviewLimit = 8;
const sunoTotalsSeriesId = "profile-totals";
const numberFormatter = new Intl.NumberFormat(isEnglish ? "en-US" : "ja-JP");
const compactNumberFormatter = new Intl.NumberFormat(isEnglish ? "en-US" : "ja-JP", {
  notation: "compact",
  maximumFractionDigits: 1,
});
let currentProjectFilter = "all";
let currentPublicationFilter = "peer-reviewed";
let publicationQuery = "";
let showAllPublications = false;
let currentMediaFilter = "all";
let showAllProjects = false;
let showAllChoiceHistory = false;
let codexChoiceData = null;
let latestSiteUpdate = null;
let sunoHistoryData = null;
let pressMediaData = null;
let publicationData = null;
let selectedSunoSongId = null;
let sunoChartMode = "total";

function parseCalendarDate(value) {
  const [year, month, day] = String(value).split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

function formatCalendarDate(value, options) {
  return new Intl.DateTimeFormat(isEnglish ? "en-US" : "ja-JP", {
    timeZone: "UTC",
    ...options,
  }).format(parseCalendarDate(value));
}

function formatWeekPeriod(startValue, endValue) {
  const start = parseCalendarDate(startValue);
  const end = parseCalendarDate(endValue);
  const sameYear = start.getUTCFullYear() === end.getUTCFullYear();
  const sameMonth = sameYear && start.getUTCMonth() === end.getUTCMonth();

  if (isEnglish) {
    const startMonth = formatCalendarDate(startValue, { month: "short" });
    const endMonth = formatCalendarDate(endValue, { month: "short" });
    if (sameMonth) return `${startMonth} ${start.getUTCDate()}–${end.getUTCDate()}, ${end.getUTCFullYear()}`;
    if (sameYear) return `${startMonth} ${start.getUTCDate()}–${endMonth} ${end.getUTCDate()}, ${end.getUTCFullYear()}`;
    return `${startMonth} ${start.getUTCDate()}, ${start.getUTCFullYear()} – ${endMonth} ${end.getUTCDate()}, ${end.getUTCFullYear()}`;
  }

  if (sameMonth) return `${start.getUTCFullYear()}.${start.getUTCMonth() + 1}.${start.getUTCDate()}–${end.getUTCDate()}`;
  if (sameYear) return `${start.getUTCFullYear()}.${start.getUTCMonth() + 1}.${start.getUTCDate()}–${end.getUTCMonth() + 1}.${end.getUTCDate()}`;
  return `${start.getUTCFullYear()}.${start.getUTCMonth() + 1}.${start.getUTCDate()}–${end.getUTCFullYear()}.${end.getUTCMonth() + 1}.${end.getUTCDate()}`;
}

function updateSiteUpdated(value) {
  const date = String(value || "").slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return;
  if (!latestSiteUpdate || date > latestSiteUpdate) latestSiteUpdate = date;
  if (siteUpdated) siteUpdated.textContent = `Updated ${latestSiteUpdate} JST`;
}

function formatPublicationDate(value) {
  const match = String(value || "").match(/^(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?$/);
  if (!match) return value;

  const [, year, month, day] = match;
  if (!month) return year;
  if (!day) {
    if (isEnglish) {
      return new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric", timeZone: "UTC" })
        .format(new Date(Date.UTC(Number(year), Number(month) - 1, 1)));
    }
    return `${year}.${Number(month)}`;
  }

  if (!isEnglish) return `${year}.${Number(month)}.${Number(day)}`;

  return formatCalendarDate(value, { year: "numeric", month: "short", day: "numeric" });
}

function formatPublicationPeriod(item) {
  const start = formatPublicationDate(item.date);
  if (!item.endDate) return start;
  return `${start}–${formatPublicationDate(item.endDate)}`;
}

function pressMediumLabel(medium) {
  const labels = {
    television: isEnglish ? "TV" : "テレビ",
    radio: isEnglish ? "Radio" : "ラジオ",
    magazine: isEnglish ? "Magazine" : "雑誌",
    web: "Web",
    book: isEnglish ? "Book" : "書籍",
    newspaper: isEnglish ? "Newspaper" : "新聞",
  };
  return labels[medium] || medium;
}

function renderPressMedia(filter = "all") {
  if (!pressMediaList || !pressMediaData) return;

  const items = pressMediaData.items.filter((item) => filter === "all" || item.group === filter);
  pressMediaList.replaceChildren();
  pressMediaList.setAttribute("aria-busy", "false");

  if (pressMediaCount) {
    pressMediaCount.textContent = isEnglish
      ? `${items.length} of ${pressMediaData.items.length} verified records`
      : `確認済み${pressMediaData.items.length}件のうち${items.length}件を表示`;
  }

  for (const item of items) {
    const copy = isEnglish ? item.en : item.ja;
    const sources = Array.isArray(item.sources) ? item.sources : [];
    if (!copy || !sources.length) continue;

    const article = document.createElement("article");
    article.className = "media-entry";
    article.dataset.group = item.group;
    article.dataset.medium = item.medium;

    const meta = document.createElement("div");
    meta.className = "media-entry-head";

    const date = document.createElement("time");
    date.className = "media-date";
    date.dateTime = item.date;
    date.textContent = formatPublicationPeriod(item);

    const medium = document.createElement("span");
    medium.className = "media-medium";
    medium.textContent = pressMediumLabel(item.medium);
    meta.append(date, medium);

    const heading = document.createElement("h4");
    const titleLink = document.createElement("a");
    titleLink.href = sources[0].url;
    titleLink.textContent = copy.title;
    heading.append(titleLink);

    const outlet = document.createElement("p");
    outlet.className = "media-outlet";
    outlet.textContent = copy.outlet;

    const role = document.createElement("p");
    role.className = "media-role";
    role.textContent = copy.role;

    const summary = document.createElement("p");
    summary.className = "media-summary";
    summary.textContent = copy.summary;

    const sourceDetails = document.createElement("details");
    sourceDetails.className = "media-sources";
    const sourceSummary = document.createElement("summary");
    sourceSummary.textContent = isEnglish
      ? `${sources.length} ${sources.length === 1 ? "source" : "sources"}`
      : `資料 ${sources.length}件`;
    const sourceList = document.createElement("ul");

    for (const source of sources) {
      const listItem = document.createElement("li");
      const sourceLink = document.createElement("a");
      sourceLink.href = source.url;
      sourceLink.textContent = isEnglish ? source.enLabel : source.jaLabel;
      listItem.append(sourceLink);
      sourceList.append(listItem);
    }

    sourceDetails.append(sourceSummary, sourceList);
    article.append(meta, heading, outlet, role, summary, sourceDetails);
    pressMediaList.append(article);
  }
}

async function loadPressMedia() {
  if (!pressMediaList) return;
  const dataPath = isEnglish ? "../data/press-media.json" : "data/press-media.json";
  const response = await fetch(dataPath, { cache: "no-cache" });
  if (!response.ok) throw new Error(`Press and media request failed (${response.status})`);

  const data = await response.json();
  if (data.schemaVersion !== 1 || !Array.isArray(data.items)) {
    throw new Error("Press and media data is invalid");
  }

  pressMediaData = data;
  updateSiteUpdated(data.generatedAt);
  renderPressMedia(currentMediaFilter);
}

function publicationCategoryLabel(category, short = false) {
  const labels = {
    "peer-reviewed": isEnglish ? (short ? "Peer" : "Peer-reviewed") : "査読あり",
    "non-peer-reviewed": isEnglish ? (short ? "Report" : "Other papers") : "査読なし",
    misc: isEnglish ? (short ? "Writing" : "Other writing") : "その他",
    all: isEnglish ? "All" : "すべて",
  };
  return labels[category] || category;
}

function normalizePublicationSearch(value) {
  return String(value || "").normalize("NFKC").toLocaleLowerCase();
}

function publicationSearchText(item) {
  return normalizePublicationSearch(
    [
      item.title,
      ...(item.authors || []),
      item.containerTitle,
      item.publisher,
      item.citationDetail,
      item.doi,
      item.year,
    ]
      .filter(Boolean)
      .join(" "),
  );
}

function isDaishinUeyama(author) {
  const normalized = String(author || "").replace(/\s+/g, " ").trim().toLocaleLowerCase();
  return normalized.includes("ueyama") || /上山\s*大信/.test(author);
}

function appendPublicationAuthors(element, authors) {
  authors.forEach((author, index) => {
    if (index) element.append(document.createTextNode(", "));
    if (isDaishinUeyama(author)) {
      const self = document.createElement("strong");
      self.className = "publication-author-self";
      self.textContent = author;
      element.append(self);
    } else {
      element.append(document.createTextNode(author));
    }
  });
}

function formatPublicationPages(value) {
  return String(value || "").replace(/(\d)\s*-\s*(?=\d)/g, "$1–");
}

function createPublicationVenue(item) {
  const venue = document.createElement("p");
  venue.className = "publication-venue";

  if (!item.containerTitle) {
    venue.textContent = item.citationDetail || String(item.year);
    return venue;
  }

  const journal = document.createElement("cite");
  journal.textContent = item.containerTitle;
  venue.append(journal);

  if (item.volume) {
    venue.append(document.createTextNode(" "));
    const volume = document.createElement("strong");
    volume.textContent = item.volume;
    venue.append(volume);
  }
  if (item.issue) venue.append(document.createTextNode(`(${item.issue})`));

  const locator = item.pages || item.articleNumber;
  if (locator) venue.append(document.createTextNode(`, ${formatPublicationPages(locator)}`));
  venue.append(document.createTextNode(` (${item.year}).`));
  return venue;
}

function createPublicationEntry(item) {
  const listItem = document.createElement("li");
  listItem.className = "publication-entry";
  listItem.dataset.category = item.category;

  const chronology = document.createElement("div");
  chronology.className = "publication-chronology";

  const year = document.createElement("time");
  year.className = "publication-year";
  year.dateTime = String(item.year);
  year.textContent = item.year;

  const kind = document.createElement("span");
  kind.className = "publication-kind";
  kind.textContent = publicationCategoryLabel(item.category, true);
  chronology.append(year, kind);

  const citation = document.createElement("article");
  citation.className = "publication-citation";

  const heading = document.createElement("h4");
  if (item.url) {
    const titleLink = document.createElement("a");
    titleLink.href = item.url;
    titleLink.textContent = item.title;
    heading.append(titleLink);
  } else {
    heading.textContent = item.title;
  }

  citation.append(heading);

  if (item.authors?.length) {
    const authors = document.createElement("p");
    authors.className = "publication-authors";
    appendPublicationAuthors(authors, item.authors);
    citation.append(authors);
  }

  citation.append(createPublicationVenue(item));

  if (item.url) {
    const identifier = document.createElement("p");
    identifier.className = "publication-identifier";
    const link = document.createElement("a");
    link.href = item.url;
    if (item.doi) {
      link.textContent = `doi:${item.doi}`;
    } else if (item.linkKind === "full-text") {
      link.textContent = isEnglish ? "Full text / PDF" : "本文 / PDF";
    } else {
      link.textContent = isEnglish ? "Bibliographic record" : "書誌情報";
    }
    identifier.append(link);
    citation.append(identifier);
  }

  listItem.append(chronology, citation);
  return listItem;
}

function renderPublications() {
  if (!publicationList || !publicationData) return;

  const query = normalizePublicationSearch(publicationQuery.trim());
  const allCategories = currentPublicationFilter === "all";
  let matches = publicationData.items.filter(
    (item) =>
      (allCategories || item.category === currentPublicationFilter) &&
      (!query || publicationSearchText(item).includes(query)),
  );

  if (allCategories) {
    const categoryRank = { "peer-reviewed": 0, "non-peer-reviewed": 1, misc: 2 };
    matches = [...matches].sort(
      (a, b) => b.year - a.year || categoryRank[a.category] - categoryRank[b.category] || a.position - b.position,
    );
  }

  const shouldLimit = !query && !showAllPublications;
  const visibleItems = shouldLimit ? matches.slice(0, publicationPreviewLimit) : matches;
  publicationList.replaceChildren(...visibleItems.map(createPublicationEntry));
  publicationList.setAttribute("aria-busy", "false");
  publicationEmpty.hidden = matches.length > 0;

  const categoryLabel = publicationCategoryLabel(currentPublicationFilter);
  if (publicationCount) {
    if (query) {
      publicationCount.textContent = isEnglish
        ? `${matches.length} matching ${matches.length === 1 ? "record" : "records"} in ${categoryLabel}`
        : `${categoryLabel}から${matches.length}件が一致`;
    } else if (visibleItems.length < matches.length) {
      publicationCount.textContent = isEnglish
        ? `Showing the latest ${visibleItems.length} of ${matches.length} ${categoryLabel.toLocaleLowerCase()} records`
        : `${categoryLabel}${matches.length}件のうち最新${visibleItems.length}件を表示`;
    } else {
      publicationCount.textContent = isEnglish
        ? `${matches.length} ${categoryLabel.toLocaleLowerCase()} ${matches.length === 1 ? "record" : "records"}`
        : `${categoryLabel}${matches.length}件を表示`;
    }
  }

  if (publicationToggle) {
    publicationToggle.hidden = Boolean(query) || matches.length <= publicationPreviewLimit;
    publicationToggle.textContent = showAllPublications
      ? isEnglish
        ? `Show the latest ${publicationPreviewLimit}`
        : `最新${publicationPreviewLimit}件に戻す`
      : isEnglish
        ? `Show all ${matches.length}`
        : `${matches.length}件をすべて表示`;
  }
}

async function loadPublications() {
  if (!publicationList) return;
  const dataPath = isEnglish ? "../data/publications.json" : "data/publications.json";
  const response = await fetch(dataPath, { cache: "no-cache" });
  if (!response.ok) throw new Error(`Publication request failed (${response.status})`);

  const data = await response.json();
  if (data.schemaVersion !== 1 || !Array.isArray(data.items)) {
    throw new Error("Publication data is invalid");
  }

  publicationData = data;
  updateSiteUpdated(data.generatedAt);

  const totals = {
    "peer-reviewed": data.counts.peerReviewed,
    "non-peer-reviewed": data.counts.nonPeerReviewed,
    misc: data.counts.misc,
    all: data.counts.total,
  };
  publicationTotalLabels.forEach((label) => {
    label.textContent = numberFormatter.format(totals[label.dataset.publicationTotal] || 0);
  });
  renderPublications();
}

function updateWhatsNewNext() {
  if (!whatsNewList || !whatsNewNext) return;
  const hasOverflow = whatsNewList.scrollWidth > whatsNewList.clientWidth + 2;
  const atEnd = whatsNewList.scrollLeft + whatsNewList.clientWidth >= whatsNewList.scrollWidth - 18;
  whatsNewNext.hidden = !hasOverflow || atEnd;
}

function renderWhatsNew(data) {
  if (!whatsNewList || !data?.period?.start || !data?.period?.end || !Array.isArray(data.items)) return;

  whatsNewPeriod.textContent = formatWeekPeriod(data.period.start, data.period.end);
  updateSiteUpdated(data.period.end);
  whatsNewList.replaceChildren();

  if (!data.items.length) {
    const empty = document.createElement("p");
    empty.className = "whats-new-empty";
    empty.textContent = isEnglish ? "No public changes this week." : "今週の公開上の変化はありません。";
    whatsNewList.append(empty);
    return;
  }

  for (const item of data.items) {
    const copy = isEnglish ? item.en : item.ja;
    if (!copy?.label || !copy?.title || !copy?.summary || !item.url) continue;

    const article = document.createElement("article");
    article.className = "whats-new-item";
    article.dataset.kind = item.kind || "site";

    const label = document.createElement("p");
    label.className = "whats-new-label";
    label.textContent = copy.label;

    const heading = document.createElement("h3");
    const link = document.createElement("a");
    link.href = item.url;
    link.textContent = copy.title;
    heading.append(link);

    const summary = document.createElement("p");
    summary.textContent = copy.summary;
    article.append(label, heading, summary);
    whatsNewList.append(article);
  }
  requestAnimationFrame(updateWhatsNewNext);
}

async function loadWhatsNew() {
  if (!whatsNewList) return;
  const dataPath = isEnglish ? "../data/whats-new.json" : "data/whats-new.json";
  const response = await fetch(dataPath, { cache: "no-cache" });
  if (!response.ok) throw new Error(`What's New request failed (${response.status})`);
  renderWhatsNew(await response.json());
}

function renderCodexChoiceHistory(history) {
  if (!codexChoiceHistory || !codexChoiceHistoryList || !codexChoiceHistoryToggle) return;
  codexChoiceHistoryList.replaceChildren();
  codexChoiceHistory.hidden = history.length === 0;
  if (!history.length) return;

  const visibleChoices = showAllChoiceHistory ? history : history.slice(0, choiceHistoryPreviewLimit);
  for (const choice of visibleChoices) {
    const copy = isEnglish ? choice.en : choice.ja;
    if (!copy?.title || !copy?.dek || !choice.url || !choice.week?.start || !choice.week?.end) continue;

    const article = document.createElement("article");
    article.className = "codex-choice-history-item";

    const period = document.createElement("p");
    period.className = "codex-choice-history-period";
    period.textContent = formatWeekPeriod(choice.week.start, choice.week.end);

    const heading = document.createElement("h3");
    const link = document.createElement("a");
    link.href = choice.url;
    link.textContent = copy.title;
    heading.append(link);

    const summary = document.createElement("p");
    summary.textContent = copy.dek;
    article.append(period, heading, summary);
    codexChoiceHistoryList.append(article);
  }

  codexChoiceHistoryToggle.hidden = history.length <= choiceHistoryPreviewLimit;
  codexChoiceHistoryToggle.textContent = showAllChoiceHistory
    ? isEnglish
      ? "Show the latest eight"
      : "最新8件に戻す"
    : isEnglish
      ? `Show all ${history.length}`
      : `全${history.length}件を表示`;
}

function renderCodexChoice(data) {
  const choice = data?.current;
  const copy = isEnglish ? choice?.en : choice?.ja;
  if (!choice?.week?.start || !choice?.week?.end || !copy?.title || !copy?.dek || !copy?.reflection) {
    throw new Error("Codex Choice data is invalid");
  }

  codexChoiceData = data;
  codexChoiceSection.dataset.kind = choice.kind || "site";
  codexChoicePeriod.textContent = formatWeekPeriod(choice.week.start, choice.week.end);
  codexChoiceTitleLink.href = choice.url;
  codexChoiceTitleLink.textContent = copy.title;
  codexChoiceDek.textContent = copy.dek;
  codexChoiceReflection.textContent = copy.reflection;
  codexChoiceLink.href = choice.url;
  codexChoiceLink.textContent = copy.linkLabel;
  codexChoiceSource.textContent = `${copy.label} / ${formatCalendarDate(choice.sourceDate, {
    year: "numeric",
    month: "short",
    day: "numeric",
  })}`;
  codexChoiceImage.src = isEnglish ? `../${choice.image}` : choice.image;
  codexChoiceImage.alt = copy.imageAlt;
  codexChoiceSection.setAttribute("aria-busy", "false");
  updateSiteUpdated(data.generatedAt);
  renderCodexChoiceHistory(Array.isArray(data.history) ? data.history : []);
}

async function loadCodexChoice() {
  if (!codexChoiceSection) return;
  const dataPath = isEnglish ? "../data/codex-choice.json" : "data/codex-choice.json";
  const response = await fetch(dataPath, { cache: "no-cache" });
  if (!response.ok) throw new Error(`Codex Choice request failed (${response.status})`);
  renderCodexChoice(await response.json());
}

whatsNewNext?.addEventListener("click", () => {
  whatsNewList.scrollBy({ left: Math.max(180, whatsNewList.clientWidth * 0.78), behavior: "smooth" });
});
whatsNewList?.addEventListener("scroll", updateWhatsNewNext, { passive: true });
window.addEventListener("resize", updateWhatsNewNext);

codexChoiceHistoryToggle?.addEventListener("click", () => {
  showAllChoiceHistory = !showAllChoiceHistory;
  renderCodexChoiceHistory(codexChoiceData?.history || []);
});

function renderProjects(filter = "all") {
  const visibleProjects = projects.filter((project) => filter === "all" || project.kind === filter);
  const displayedProjects = showAllProjects
    ? visibleProjects
    : visibleProjects.slice(0, projectPreviewLimit);

  projectGrid.innerHTML = displayedProjects
    .map((project) => {
      const description = isEnglish
        ? englishDescriptions[project.title] || project.description
        : project.description;

      return `
        <article class="project-card" data-kind="${project.kind}">
          <h3>${project.title}</h3>
          <p>${description}</p>
          <ul class="tag-list">
            ${project.tags.map((tag) => `<li>${tag}</li>`).join("")}
          </ul>
          <div class="card-links">
            ${project.demo ? `<a href="${project.demo}">${project.demoLabel || "Demo"}</a>` : ""}
            <a href="${project.repo}">GitHub</a>
          </div>
        </article>
      `;
    })
    .join("");

  if (projectToggle) {
    const hasMoreProjects = visibleProjects.length > projectPreviewLimit;
    projectToggle.hidden = !hasMoreProjects;
    projectToggle.textContent = showAllProjects
      ? isEnglish
        ? "Return to six repositories"
        : "6件表示に戻す"
      : isEnglish
        ? `Show all ${visibleProjects.length} listed repositories`
        : `掲載中の${visibleProjects.length}件をすべて表示`;
  }
}

function renderVercelTable() {
  vercelTable.innerHTML = vercelProjects
    .map(([name, framework, created, demo, repo, icon]) => {
      const missingLabel = isEnglish ? "No source link" : "ソースリンクなし";
      const favicon = icon
        ? `<img class="project-favicon" src="${icon}" alt="" loading="lazy" onerror="this.hidden = true" />`
        : "";
      const source = repo ? `<a href="${repo}">GitHub</a>` : `<span aria-label="${missingLabel}">-</span>`;
      return `
        <tr>
          <td>
            <span class="project-cell">
              ${favicon}
              <span>${name}</span>
            </span>
          </td>
          <td><span class="framework">${framework}</span></td>
          <td>${created}</td>
          <td><a href="${demo}">Open demo</a></td>
          <td>${source}</td>
        </tr>
      `;
    })
    .join("");
}

function renderIosApps() {
  if (!iosAppGrid) {
    return;
  }

  iosAppGrid.innerHTML = iosApps
    .map((app) => {
      const title = isEnglish ? app.enTitle : app.jaTitle;
      const description = isEnglish ? app.enDescription : app.jaDescription;
      const url = isEnglish ? app.enUrl : app.jaUrl;
      const linkLabel = isEnglish ? "App Store" : "App Store";
      const noteSummary = isEnglish ? "Related note articles" : "関連note";
      const noteLinks = app.noteLinks?.length
        ? `
            <details class="note-links">
              <summary>${noteSummary} (${app.noteLinks.length})</summary>
              <ul>
                ${app.noteLinks
                  .map((note) => {
                    const noteTitle = isEnglish ? note.enTitle || note.jaTitle : note.jaTitle || note.enTitle;
                    return `<li><a href="${note.url}">${noteTitle}</a></li>`;
                  })
                  .join("")}
              </ul>
            </details>
          `
        : "";

      return `
        <article class="ios-app-card">
          <img class="ios-app-icon" src="${app.icon}" alt="" loading="lazy" />
          <div class="ios-app-body">
            <div class="ios-app-head">
              <h3>${title}</h3>
              <span>${app.genre} / v${app.version}</span>
            </div>
            <p>${description}</p>
            ${noteLinks}
            <a href="${url}">${linkLabel}</a>
          </div>
        </article>
      `;
    })
    .join("");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function songHistory(songId) {
  if (!sunoHistoryData) {
    return [];
  }

  return sunoHistoryData.snapshots
    .map((snapshot) => {
      const values = songId === sunoTotalsSeriesId ? snapshot.totals : snapshot.songs?.[songId];
      if (!values) {
        return null;
      }

      const point = {
        date: snapshot.date,
        plays: Number.isFinite(values.plays) ? values.plays : null,
        likes: Number.isFinite(values.likes) ? values.likes : null,
      };
      return Number.isFinite(point.plays) || Number.isFinite(point.likes) ? point : null;
    })
    .filter(Boolean);
}

function scaledSeries(points, metric, width, top, bottom) {
  const values = points.filter((point) => Number.isFinite(point[metric]));
  if (!values.length) {
    return null;
  }

  const dates = values.map((point) => Date.parse(`${point.date}T00:00:00Z`));
  const minDate = Math.min(...dates);
  const maxDate = Math.max(...dates);
  const metrics = values.map((point) => point[metric]);
  const minValue = Math.min(...metrics);
  const maxValue = Math.max(...metrics);
  const xFor = (date) =>
    maxDate === minDate
      ? width / 2
      : 4 + ((Date.parse(`${date}T00:00:00Z`) - minDate) / (maxDate - minDate)) * (width - 8);
  const yFor = (value) =>
    maxValue === minValue
      ? (top + bottom) / 2
      : bottom - ((value - minValue) / (maxValue - minValue)) * (bottom - top);
  const coordinates = values.map((point) => ({
    x: xFor(point.date),
    y: yFor(point[metric]),
  }));

  return {
    path: coordinates.map(({ x, y }, index) => `${index ? "L" : "M"}${x.toFixed(2)} ${y.toFixed(2)}`).join(" "),
    last: coordinates.at(-1),
  };
}

function renderSparkline(songId, accessibleLabel) {
  const points = songHistory(songId);
  const plays = scaledSeries(points, "plays", 132, 3, 18);
  const likes = scaledSeries(points, "likes", 132, 25, 39);
  const label = accessibleLabel || (isEnglish ? "Open weekly history" : "週次履歴を開く");
  const seriesMarkup = (series, lineClass, dotClass) =>
    series
      ? `<path class="${lineClass}" d="${series.path}"></path><circle class="${dotClass}" cx="${series.last.x.toFixed(2)}" cy="${series.last.y.toFixed(2)}" r="2.7"></circle>`
      : "";

  return `
    <button class="suno-sparkline-button" type="button" data-suno-song-id="${escapeHtml(songId)}" aria-label="${escapeHtml(label)}" title="${escapeHtml(label)}">
      <svg viewBox="0 0 132 42" aria-hidden="true" focusable="false">
        <line class="suno-sparkline-separator" x1="4" y1="21" x2="128" y2="21"></line>
        ${seriesMarkup(plays, "suno-line-plays", "suno-dot-plays")}
        ${seriesMarkup(likes, "suno-line-likes", "suno-dot-likes")}
      </svg>
    </button>
  `;
}

function latestSunoSnapshot() {
  return sunoHistoryData?.snapshots
    ?.slice()
    .reverse()
    .find((snapshot) => Number.isInteger(snapshot.totals?.plays));
}

function activeSunoSongs() {
  const latest = latestSunoSnapshot();
  if (!latest) {
    return [];
  }

  return Object.entries(latest.songs)
    .map(([id, values]) => ({
      id,
      ...values,
      ...sunoHistoryData.catalog[id],
    }))
    .sort((a, b) => b.plays - a.plays || a.title.localeCompare(b.title));
}

function renderSunoCollection() {
  const latest = latestSunoSnapshot();
  const activeSongs = activeSunoSongs();
  if (!latest || !activeSongs.length || !sunoList || !sunoSummary) {
    return;
  }

  sunoSummary.replaceChildren();
  const summaryCopy = document.createElement("span");
  summaryCopy.className = "suno-summary-copy";
  const summaryStrong = document.createElement("strong");
  summaryStrong.textContent = isEnglish
    ? `${numberFormatter.format(latest.totals.plays)} total plays / ${numberFormatter.format(latest.totals.likes)} likes / ${numberFormatter.format(latest.totals.songs)} public songs.`
    : `総再生数 ${numberFormatter.format(latest.totals.plays)}回 / いいね合計${numberFormatter.format(latest.totals.likes)} / 公開${numberFormatter.format(latest.totals.songs)}曲。`;
  const checkedText = isEnglish
    ? ` Recorded on ${latest.date} JST.`
    : ` ${latest.date} JSTに記録した値です。`;
  summaryCopy.append(summaryStrong, document.createTextNode(checkedText));

  const totalHistory = document.createElement("span");
  totalHistory.className = "suno-total-history";
  const totalHistoryLabel = document.createElement("span");
  totalHistoryLabel.className = "suno-total-history-label";
  totalHistoryLabel.textContent = isEnglish ? "All songs over time" : "全公開曲の推移";
  const totalHistoryAria = isEnglish
    ? "Open total plays and total likes history"
    : "総再生数と総いいね数の履歴を開く";
  totalHistory.append(totalHistoryLabel);
  totalHistory.insertAdjacentHTML("beforeend", renderSparkline(sunoTotalsSeriesId, totalHistoryAria));
  sunoSummary.append(summaryCopy, totalHistory);

  sunoList.innerHTML = activeSongs
    .slice(0, 5)
    .map((song, index) => {
      const meta = isEnglish
        ? `<span>${numberFormatter.format(song.plays)} plays</span><span>${numberFormatter.format(song.likes)} likes</span>`
        : `<span>再生 ${numberFormatter.format(song.plays)}</span><span>いいね ${numberFormatter.format(song.likes)}</span>`;
      return `
        <li>
          <span class="suno-rank">${index + 1}</span>
          <a href="${escapeHtml(song.url)}">${escapeHtml(song.title)}</a>
          <span class="suno-meta">${meta}</span>
          ${renderSparkline(song.id)}
        </li>
      `;
    })
    .join("");

  const previousSelection = selectedSunoSongId;
  const totalsOption = isEnglish
    ? `All public songs (${numberFormatter.format(latest.totals.plays)} total plays)`
    : `全公開曲の合計（総再生 ${numberFormatter.format(latest.totals.plays)}）`;
  sunoSongSelect.innerHTML =
    `<option value="${sunoTotalsSeriesId}">${totalsOption}</option>` +
    activeSongs
      .map(
        (song, index) =>
          `<option value="${song.id}">${index + 1}. ${escapeHtml(song.title)} (${numberFormatter.format(song.plays)})</option>`,
      )
      .join("");
  selectedSunoSongId = previousSelection === sunoTotalsSeriesId || activeSongs.some((song) => song.id === previousSelection)
    ? previousSelection
    : sunoTotalsSeriesId;
  sunoSongSelect.value = selectedSunoSongId;
}

function chartPoints(points, metric, mode) {
  const valid = points.filter((point) => Number.isFinite(point[metric]));
  if (mode === "total") {
    return valid.map((point) => ({ date: point.date, value: point[metric] }));
  }

  return valid.slice(1).map((point, index) => ({
    date: point.date,
    value: point[metric] - valid[index][metric],
  }));
}

function renderLargeSvg(points, metric, mode, lineClass, dotClass, ariaLabel) {
  const values = chartPoints(points, metric, mode);
  if (!values.length) {
    const empty = isEnglish ? "More weekly records are needed." : "週次記録が増えるとグラフを表示します。";
    return `<div class="suno-chart-empty">${empty}</div>`;
  }

  const isCompactChart = window.matchMedia("(max-width: 640px)").matches;
  const width = isCompactChart ? 360 : 760;
  const height = 184;
  const left = isCompactChart ? 50 : 58;
  const right = isCompactChart ? 8 : 14;
  const top = 14;
  const bottom = 30;
  const plotWidth = width - left - right;
  const plotHeight = height - top - bottom;
  const dates = values.map((point) => Date.parse(`${point.date}T00:00:00Z`));
  const minDate = Math.min(...dates);
  const maxDate = Math.max(...dates);
  const rawMin = Math.min(...values.map((point) => point.value));
  const rawMax = Math.max(...values.map((point) => point.value));
  const rawRange = rawMax - rawMin;
  const padding = rawRange === 0 ? Math.max(1, Math.abs(rawMax) * 0.08) : rawRange * 0.12;
  const yMin =
    mode === "weekly"
      ? rawMin >= 0
        ? 0
        : rawMin - padding
      : Math.max(0, rawMin - padding);
  const yMax = Math.max(yMin + 1, rawMax + padding);
  const xFor = (date) =>
    maxDate === minDate
      ? left + plotWidth / 2
      : left + ((Date.parse(`${date}T00:00:00Z`) - minDate) / (maxDate - minDate)) * plotWidth;
  const yFor = (value) => top + plotHeight - ((value - yMin) / (yMax - yMin)) * plotHeight;
  const coordinates = values.map((point) => ({ ...point, x: xFor(point.date), y: yFor(point.value) }));
  const path = coordinates
    .map(({ x, y }, index) => `${index ? "L" : "M"}${x.toFixed(2)} ${y.toFixed(2)}`)
    .join(" ");
  const grid = [0, 1, 2, 3]
    .map((index) => {
      const ratio = index / 3;
      const y = top + plotHeight * ratio;
      const value = yMax - (yMax - yMin) * ratio;
      return `<line class="suno-chart-gridline" x1="${left}" y1="${y.toFixed(2)}" x2="${width - right}" y2="${y.toFixed(2)}"></line><text class="suno-chart-axis-label" x="${left - 8}" y="${(y + 4).toFixed(2)}" text-anchor="end">${escapeHtml(compactNumberFormatter.format(Math.round(value)))}</text>`;
    })
    .join("");
  const dateLabels =
    coordinates.length === 1
      ? `<text class="suno-chart-axis-label" x="${coordinates[0].x}" y="${height - 6}" text-anchor="middle">${coordinates[0].date}</text>`
      : `<text class="suno-chart-axis-label" x="${left}" y="${height - 6}">${coordinates[0].date}</text><text class="suno-chart-axis-label" x="${width - right}" y="${height - 6}" text-anchor="end">${coordinates.at(-1).date}</text>`;
  const dots = coordinates
    .map(
      ({ x, y, date, value }) =>
        `<circle class="${dotClass}" cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="3.6"><title>${date}: ${numberFormatter.format(value)}</title></circle>`,
    )
    .join("");

  return `
    <svg class="suno-chart-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeHtml(ariaLabel)}">
      ${grid}
      <path class="${lineClass}" d="${path}"></path>
      ${dots}
      ${dateLabels}
    </svg>
  `;
}

function renderSunoDialog() {
  if (!sunoHistoryData || !selectedSunoSongId || !sunoLargeChart) {
    return;
  }

  const isTotalsSeries = selectedSunoSongId === sunoTotalsSeriesId;
  const song = isTotalsSeries
    ? { title: isEnglish ? "All public songs" : "全公開曲の合計" }
    : sunoHistoryData.catalog[selectedSunoSongId];
  const points = songHistory(selectedSunoSongId);
  if (!song || !points.length) {
    return;
  }
  const firstDate = points[0]?.date;
  const lastDate = points.at(-1)?.date;
  const recordText = isEnglish
    ? `${points.length} ${points.length === 1 ? "record" : "records"}`
    : `${points.length}回の記録`;
  sunoDialogSummary.textContent = firstDate === lastDate
    ? `${song.title} / ${firstDate} / ${recordText}`
    : `${song.title} / ${firstDate} - ${lastDate} / ${recordText}`;

  const playValues = chartPoints(points, "plays", sunoChartMode);
  const likeValues = chartPoints(points, "likes", sunoChartMode);
  const latestPlay = playValues.at(-1)?.value;
  const latestLike = likeValues.at(-1)?.value;
  const playsLabel = isTotalsSeries ? (isEnglish ? "Total plays" : "総再生数") : isEnglish ? "Plays" : "再生数";
  const likesLabel = isTotalsSeries ? (isEnglish ? "Total likes" : "総いいね数") : isEnglish ? "Likes" : "いいね数";
  const valueText = (value) => {
    if (!Number.isFinite(value)) {
      return "-";
    }
    const prefix = sunoChartMode === "weekly" && value > 0 ? "+" : "";
    return `${prefix}${numberFormatter.format(value)}`;
  };

  sunoLargeChart.innerHTML = `
    <section class="suno-chart-block">
      <div class="suno-chart-caption"><span>${playsLabel}</span><strong>${valueText(latestPlay)}</strong></div>
      ${renderLargeSvg(points, "plays", sunoChartMode, "suno-line-plays", "suno-dot-plays", `${song.title}: ${playsLabel}`)}
    </section>
    <section class="suno-chart-block">
      <div class="suno-chart-caption"><span>${likesLabel}</span><strong>${valueText(latestLike)}</strong></div>
      ${renderLargeSvg(points, "likes", sunoChartMode, "suno-line-likes", "suno-dot-likes", `${song.title}: ${likesLabel}`)}
    </section>
  `;
}

function openSunoDialog(songId) {
  selectedSunoSongId = songId;
  sunoSongSelect.value = songId;
  sunoChartMode = "total";
  sunoModeButtons.forEach((button) => {
    const isActive = button.dataset.sunoMode === sunoChartMode;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
  renderSunoDialog();

  if (typeof sunoHistoryDialog.showModal === "function") {
    sunoHistoryDialog.showModal();
  } else {
    sunoHistoryDialog.setAttribute("open", "");
  }
}

async function loadSunoHistory() {
  if (!sunoList || !sunoHistoryDialog) {
    return;
  }

  const dataPath = isEnglish ? "../data/suno-history.json" : "data/suno-history.json";
  const response = await fetch(dataPath, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Suno history request failed (${response.status})`);
  }

  const data = await response.json();
  if (data.schemaVersion !== 1 || !data.catalog || !Array.isArray(data.snapshots)) {
    throw new Error("Suno history data is invalid");
  }
  sunoHistoryData = data;
  renderSunoCollection();
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    currentProjectFilter = button.dataset.filter;
    showAllProjects = false;
    renderProjects(currentProjectFilter);
  });
});

publicationFilterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentPublicationFilter = button.dataset.publicationFilter;
    showAllPublications = false;
    publicationFilterButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });
    renderPublications();
  });
});

publicationSearch?.addEventListener("input", () => {
  publicationQuery = publicationSearch.value;
  showAllPublications = false;
  renderPublications();
});

publicationToggle?.addEventListener("click", () => {
  showAllPublications = !showAllPublications;
  renderPublications();
});

mediaFilterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentMediaFilter = button.dataset.mediaFilter;
    mediaFilterButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });
    renderPressMedia(currentMediaFilter);
  });
});

function selectCollection(collection) {
  collectionTabs.forEach((tab) => {
    const isSelected = tab.dataset.collection === collection;
    tab.classList.toggle("is-active", isSelected);
    tab.setAttribute("aria-selected", String(isSelected));
  });

  collectionPanels.forEach((panel) => {
    const isSelected = panel.dataset.collectionPanel === collection;
    panel.classList.toggle("is-active", isSelected);
    panel.hidden = !isSelected;
  });
}

collectionTabs.forEach((tab) => {
  tab.addEventListener("click", () => selectCollection(tab.dataset.collection));
});

collectionLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    selectCollection(link.dataset.selectCollection);
    document.querySelector("#archive")?.scrollIntoView({ behavior: "smooth" });
  });
});

projectToggle?.addEventListener("click", () => {
  showAllProjects = !showAllProjects;
  renderProjects(currentProjectFilter);
});

languageLinks.forEach((link) => {
  link.addEventListener("click", () => {
    try {
      localStorage.setItem(languageStorageKey, link.dataset.languageChoice);
    } catch (_error) {
      // The link itself still works if storage is unavailable.
    }
  });
});

function handleSunoHistoryClick(event) {
  const button = event.target.closest("[data-suno-song-id]");
  if (button) {
    openSunoDialog(button.dataset.sunoSongId);
  }
}

sunoList?.addEventListener("click", handleSunoHistoryClick);
sunoSummary?.addEventListener("click", handleSunoHistoryClick);

sunoSongSelect?.addEventListener("change", () => {
  selectedSunoSongId = sunoSongSelect.value;
  renderSunoDialog();
});

sunoModeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    sunoChartMode = button.dataset.sunoMode;
    sunoModeButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });
    renderSunoDialog();
  });
});

sunoHistoryDialog?.querySelector("[data-suno-close]")?.addEventListener("click", () => {
  sunoHistoryDialog.close();
});

sunoHistoryDialog?.addEventListener("click", (event) => {
  if (event.target === sunoHistoryDialog) {
    sunoHistoryDialog.close();
  }
});

renderProjects();
renderVercelTable();
renderIosApps();
loadPublications().catch((error) => {
  if (publicationList) {
    publicationList.setAttribute("aria-busy", "false");
    publicationList.textContent = isEnglish
      ? "The publication list could not be loaded."
      : "論文リストを読み込めませんでした。";
  }
  console.warn(error.message);
});
loadWhatsNew().catch((error) => console.warn(error.message));
loadCodexChoice().catch((error) => {
  codexChoiceSection?.setAttribute("aria-busy", "false");
  console.warn(error.message);
});
loadPressMedia().catch((error) => {
  if (pressMediaList) {
    pressMediaList.setAttribute("aria-busy", "false");
    pressMediaList.textContent = isEnglish
      ? "The verified record could not be loaded."
      : "確認済みの記録を読み込めませんでした。";
  }
  console.warn(error.message);
});
loadSunoHistory().catch((error) => console.warn(error.message));
