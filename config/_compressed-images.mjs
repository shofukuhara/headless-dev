import fs from "fs/promises";
import path from "path";
import sharp from "sharp";
import { optimize } from "svgo";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ========================================
// 設定
// ========================================
const CONFIG = {
  inputDir: path.join(__dirname, "../_images_raw/original"),
  outputDir: path.join(__dirname, "../_images_raw/compressed"),

  // 出力形式: 'webp' | 'avif' | 'both（両方出力）'
  format: "avif",

  // 圧縮品質 (1-100)
  quality: 80,

  // SVGをコピーするか
  copySvg: true,
};

// ========================================
// メイン処理
// ========================================
async function compressImages() {
  console.log("🚀 画像圧縮を開始します...\n");
  console.log(`📁 入力: ${CONFIG.inputDir}`);
  console.log(`📁 出力: ${CONFIG.outputDir}`);
  console.log(`🎨 形式: ${CONFIG.format}`);
  console.log(`💎 品質: ${CONFIG.quality}\n`);

  try {
    // 出力ディレクトリをクリーンアップ
    await fs.rm(CONFIG.outputDir, { recursive: true, force: true });
    await fs.mkdir(CONFIG.outputDir, { recursive: true });

    // 画像を処理
    await processDirectory(CONFIG.inputDir, CONFIG.outputDir);

    console.log("\n✅ 画像圧縮が完了しました！");
  } catch (error) {
    console.error("❌ エラーが発生しました:", error);
    process.exit(1);
  }
}

// ========================================
// ディレクトリを再帰的に処理
// ========================================
async function processDirectory(inputDir, outputDir) {
  const entries = await fs.readdir(inputDir, { withFileTypes: true });

  for (const entry of entries) {
    const inputPath = path.join(inputDir, entry.name);
    const outputPath = path.join(outputDir, entry.name);

    if (entry.isDirectory()) {
      // ディレクトリの場合は再帰的に処理
      await fs.mkdir(outputPath, { recursive: true });
      await processDirectory(inputPath, outputPath);
    } else if (entry.isFile()) {
      // ファイルの場合は圧縮処理
      await processFile(inputPath, outputDir, entry.name);
    }
  }
}

// ========================================
// ファイルを処理
// ========================================
async function processFile(inputPath, outputDir, filename) {
  const ext = path.extname(filename).toLowerCase();
  const basename = path.basename(filename, ext);

  // SVGの場合
  if (ext === ".svg") {
    if (CONFIG.copySvg) {
      try {
        const svgContent = await fs.readFile(inputPath, "utf-8");
        const result = optimize(svgContent, {
          multipass: true,
          plugins: ["preset-default", "removeViewBox", "sortAttrs", "removeDimensions"],
        });
        const outputPath = path.join(outputDir, filename);
        await fs.writeFile(outputPath, result.data);
        console.log(`🎨 SVG最適化: ${filename}`);
      } catch (error) {
        console.error(`❌ SVG最適化失敗: ${filename}`, error.message);
      }
    }
    return;
  }

  // 対応している画像形式かチェック
  const supportedFormats = [".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif", ".tiff", ".tif"];
  if (!supportedFormats.includes(ext)) {
    console.log(`⏭️  スキップ: ${filename} (非対応形式)`);
    return;
  }

  try {
    const image = sharp(inputPath);

    // WebP変換
    if (CONFIG.format === "webp" || CONFIG.format === "both") {
      const webpPath = path.join(outputDir, `${basename}.webp`);
      await image.clone().webp({ quality: CONFIG.quality }).toFile(webpPath);
      console.log(`✨ WebP作成: ${basename}.webp`);
    }

    // AVIF変換
    if (CONFIG.format === "avif" || CONFIG.format === "both") {
      const avifPath = path.join(outputDir, `${basename}.avif`);
      await image.clone().avif({ quality: CONFIG.quality }).toFile(avifPath);
      console.log(`✨ AVIF作成: ${basename}.avif`);
    }
  } catch (error) {
    console.error(`❌ 圧縮失敗: ${filename}`, error.message);
  }
}

// ========================================
// 実行
// ========================================
compressImages();
