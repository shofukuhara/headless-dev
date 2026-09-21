import type { MicroCMSListContent } from "microcms-js-sdk";
import { client } from "./microcms";
/**
 * =========================
 * Column（コラム記事）
 * =========================
 */

// Column本文内のブロック型
export type Meta = {
  fieldId: "meta";
  slug: string;
  title: string;
  description: string;
  thumbnail: { url: string };
};

type RichEditor = {
  fieldId: "richEditor";
  richEditor: string;
};

type Title = {
  fieldId: "title";
  title: string;
  title_select: string[];
};

type ListText = {
  fieldId: "list_text";
  text: {
    fieldId: "text";
    text: string;
  }[];
};

type ListImageCaption = {
  fieldId: "list_image_caption";
  image_caption: {
    fieldId: "image_caption";
    image: { url: string };
    caption: string;
  }[];
};

export type ColumnContent = RichEditor | Title | ListText | ListImageCaption;

// Columnの型定義
export type Column = {
  meta: Meta;
  content: ColumnContent[];
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
