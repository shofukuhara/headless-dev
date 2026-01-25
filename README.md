### 🛠 使用技術

| 使用しているもの | バージョン   | 説明                             |
| ---------------- | ------------ | -------------------------------- |
| `Astro`          | `v5.3.0`     | フロントエンドフレームワーク     |
| `SCSS (FLOCSS)`  | `Dart Sass`  | CSS設計手法（FLOCSS構成）        |
| `Vanilla JS`     | `ES Modules` | 素のJavaScript（ESモジュール化） |
| `Node.js`        | `v22.12.0`   | JavaScript 実行環境              |
| `npm`            | `v10.9.0`    | パッケージマネージャ             |
| `Vite`           | `v6.1.1`     | 開発・ビルドツール               |

### 📕 スクリプト

| Command                   | Action                                                     |
| :------------------------ | :--------------------------------------------------------- |
| `npm install`             | 依存関係をインストール(初回だけ) 　 　                     |
| `npm run dev`             | ローカル開発サーバー localhost:4321起動                    |
| `npm run build`           | ビルドファイル出力 `./dist/`                               |
| `npm run build:wp`        | ビルドファイル(assets)コピー                               |
| `npm run preview`         | ビルドしたファイルで表示確認 localhost:4321起動　　　 　　 |
| `npm run style:lint`      | SCSSファイルのLintチェックを実行                           |
| `npm run format`          | ファイルをフォーマット 　                                  |
| `npm run compressedImage` | 画像を圧縮 　　　　　　　　　　　　　　　　　              |

### 🌲 ディレクトリ構成

```text
/
├─ _php                          # ビルド後のHTMLを.phpに変換したファイルを格納
│
├─ .astro                        # Astroキャッシュファイル
│
├─ .vscode                       # VSCode設定ファイル
│
├─ config                        # プロジェクト設定ファイル
│  ├─ _postcss.config.cjs         # PostCSS設定（autoprefixerなど）
│  ├─ _compressed-images.mjs    # 画像（webp・avif・両方出力）・svg圧縮
│  ├─ .prettierignore            # Prettier対象外ファイル指定
│  ├─ .prettierrc                # Prettierフォーマット設定
│  └─ _postcss.config.cjs         # PostCSS設定（autoprefixerなど）
│
├─ dist                          # ビルド成果物（本番用ファイル）
│  ├─ assets
│  │  ├─ css                     # バンドルされたCSS
│  │  ├─ fonts                   # Webフォント
│  │  ├─ images                  # 画像ファイル
│  │  └─ js                      # バンドルされたJavaScript
│  └─ index.html                 # 生成されたHTMLファイル
│
├─ node_modules                  # npmパッケージ
│
├─ public                        # 静的ファイル（ビルド時にそのままdistへコピー）
│  └─ assets
│     ├─ fonts                   # フォントファイル
│     ├─ images                  # 最適化済み画像
│     └─ meta                    # favicon・OGP画像
│
├─ src                           # ソースコード
│  ├─ assets
│  │  ├─ styles                  # SCSSファイル（FLOCSS構造）
│  │  │  ├─ foundation
│  │  │  │  ├─ global           # 変数・mixin・関数（メディアクエリ、フォント計算など）
│  │  │  │  └─ setting          # リセットCSS・ベーススタイル
│  │  │  ├─ layout              # ヘッダー・フッター等のレイアウト
│  │  │  ├─ object
│  │  │  │  ├─ components       # 再利用可能なUIパーツ（ボタン、カードなど）
│  │  │  │  ├─ elements         # 最小単位のスタイル（タイトル、テキストなど）
│  │  │  │  └─ pages            # ページ固有のスタイル
│  │  │  └─ index.scss           # SCSSエントリーポイント（全体をインポート）
│  │  ├─ images                  # Astroで最適化する画像の元ファイル
│  │  └─ scripts                 # Vanilla JavaScript
│  │
│  ├─ components                 # Astroコンポーネント
│  │  ├─ common                  # 全ページ共通（Header、Footer、Navなど）
│  │  ├─ elements                # 最小単位（Image、Icon、Linkなど）
│  │  ├─ sections                # セクション単位のコンポーネント
│  │  │  └─ pages                # ページ別セクション（home、about、newsなど）
│  │  └─ ui                      # 汎用UIコンポーネント（Button、Card、Modalなど）
│  │
│  ├─ data                       # アプリケーション設定データ
│  │                             # （meta情報、GA設定、サイト設定など）
│  ├─ layouts                    # ページレイアウトテンプレート（Base.astro等）
│  └─ pages                      # ページファイル（ルーティング）
│                                # （index.astro、about.astro、newsなど）
│
├─ .gitignore                    # Git管理対象外ファイル指定
├─ astro.config.mjs              # Astro・Vite設定（ビルド設定、プラグインなど）
├─ package-lock.json             # パッケージ依存関係のロックファイル
├─ package.json                  # プロジェクト依存関係・npmスクリプト定義
└─ README.md                     # プロジェクトドキュメント
```

#### 画像管理

- **最適化済み画像は`public/assets/images`で管理**

- **`src/assets/images`は使用しない**
  - Astroの画像最適化機能を使う場合はこちらだが、使用せずにpublicで進める
