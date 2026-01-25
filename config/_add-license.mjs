import { promises as fs } from "fs";
import path from "path";

// ============================
// 設定エリア
// ============================
const config = {
  distDir: "dist",
  assetDir: "assets",
  jsDir: "js",
  banner: "/*! Please refer to license.txt for the details of the license. */\n",
};

// ============================
// 実行部分
// ============================
const distJsPath = path.join(process.cwd(), config.distDir, config.assetDir, config.jsDir);

try {
  const files = await fs.readdir(distJsPath);

  for (const file of files) {
    if (!file.endsWith(".js")) continue;

    const fullPath = path.join(distJsPath, file);
    const content = await fs.readFile(fullPath, "utf-8");

    if (!content.startsWith("/*!")) {
      await fs.writeFile(fullPath, config.banner + content);
      console.log(`✅ ライセンステキスト追加: ${file}`);
    } else {
      console.log(`ℹ️ すでにライセンステキストあり: ${file}`);
    }
  }

  console.log("🎉 全ファイルのチェックが完了しました！");
} catch (err) {
  console.error("💥 JS処理中にエラー発生:", err);
}
