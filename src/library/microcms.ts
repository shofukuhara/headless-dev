import { createClient } from "microcms-js-sdk";
// microCMSのAPIクライアントを生成（記事取得などで使用）
export const client = createClient({
  serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.MICROCMS_API_KEY,
});

