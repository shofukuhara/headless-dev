import relativeLinks from "astro-relative-links";
import { defineConfig } from "astro/config";
import path from "path";
import license from "rollup-plugin-license";

// ============================
// パス設定
// ============================
const PATHS = {
  output: {
    js: "assets/js/index.js",
    css: "assets/css/index.css",
    images: "assets/images",
    others: "assets/others",
    license: "assets/js/license.txt",
  },
  src: {
    styles: "/src/assets/styles/foundation/global/index.scss",
  },
};

// 画像拡張子の正規表現
const IMAGE_EXTENSIONS = /png|jpe?g|svg|gif|tiff?|bmp|ico|webp|avif|heic|heif/;

// ============================
// アセットファイル名の生成
// ============================
const getAssetFileName = (assetInfo) => {
  const ext = path
    .extname(assetInfo.name || "")
    .replace(".", "")
    .toLowerCase();

  if (IMAGE_EXTENSIONS.test(ext)) {
    return `${PATHS.output.images}/[name].[extname]`;
  }

  if (ext === "css") {
    return PATHS.output.css;
  }

  return `${PATHS.output.others}/[name].[extname]`;
};

// ============================
// Astro設定
// ============================
export default defineConfig({
  server: {
    host: true,
    open: true,
  },
  compressHTML: false,
  integrations: [relativeLinks()],
  vite: {
    build: {
      cssMinify: true,
      cssCodeSplit: false,
      assetsInlineLimit: 0,
      minify: "terser",
      terserOptions: {
        format: {
          comments: false,
        },
      },
      rollupOptions: {
        output: {
          entryFileNames: PATHS.output.js,
          assetFileNames: getAssetFileName,
        },
        plugins: [
          license({
            thirdParty: {
              output: path.join("dist", PATHS.output.license),
              includePrivate: true,
            },
          }),
        ],
      },
    },
    resolve: {
      alias: {
        "@": "/src",
      },
    },
    css: {
      postcss: "./config/postcss.config.cjs",
      devSourcemap: true,
      preprocessorOptions: {
        scss: {
          additionalData: `@use "${PATHS.src.styles}" as *;`,
        },
      },
    },
  },
});
