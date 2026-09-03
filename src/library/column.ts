import type { MicroCMSListContent } from "microcms-js-sdk";
import { client } from "./microcms";
/**
 * =========================
 * Column（コラム記事）
 * =========================
 */

export type Column = {
  meta: { slug: string; title: string };
  contents: string;
  mainVisual: {
    url: string;
  };
} & MicroCMSListContent;

/**
 * =========================
 * Column（コラム記事一覧）
 * =========================
 */

export const getColumns = async () => {
  return await client.getList<Column>({
    endpoint: "column",
  });
};

/**
 * =========================
 * Column（コラム記事詳細）
 * =========================
 */

export const getColumn = async (id: string) => {
  return await client.getListDetail<Column>({
    endpoint: "column",
    contentId: id,
  });
};

/**
 * =========================
 * Column（コラム記事下書きプレビュー）
 * =========================
 */
export const getColumnPreview = async (id: string, draftKey: string) => {
  return await client.getListDetail<Column>({
    endpoint: "column",
    contentId: id,
    queries: {
      draftKey,
    },
  });
};
