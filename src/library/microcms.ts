import { createClient } from "microcms-js-sdk";
// microCMSのAPIクライアントを生成（記事取得などで使用）
export const client = createClient({
  serviceDomain: import.meta.env.PUBLIC_MICROCMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.PUBLIC_MICROCMS_API_KEY,
});

type ImageOptions = {
  width?: number;
  height?: number;
  quality?: number;
  format?: "webp" | "jpg" | "png";
};

/**
 * microCMS の画像 URL に Imgix パラメータを付与して最適化する
 */
export function optimizeImage(
  url: string | undefined,
  options: ImageOptions = {},
): string {
  if (!url) return "";
  const { width = 800, quality = 75, format = "webp" } = options;
  const params = new URLSearchParams();
  params.set("w", String(width));
  params.set("fm", format);
  params.set("q", String(quality));
  if (options.height) params.set("h", String(options.height));
  return `${url}?${params.toString()}`;
}
