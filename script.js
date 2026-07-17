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
    version: "1.2.1",
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
const collectionTabs = document.querySelectorAll(".collection-tab");
const collectionPanels = document.querySelectorAll("[data-collection-panel]");
const collectionLinks = document.querySelectorAll("[data-select-collection]");
const projectToggle = document.querySelector("#project-toggle");
const languageLinks = document.querySelectorAll("[data-language-choice]");
const isEnglish = document.documentElement.lang.toLowerCase().startsWith("en");
const languageStorageKey = "dueyama-profile-language";
const projectPreviewLimit = 6;
let currentProjectFilter = "all";
let showAllProjects = false;

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

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    currentProjectFilter = button.dataset.filter;
    showAllProjects = false;
    renderProjects(currentProjectFilter);
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

renderProjects();
renderVercelTable();
renderIosApps();
