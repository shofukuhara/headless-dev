import type { MicroCMSListContent } from "microcms-js-sdk";
import { client } from "./microcms";
/**
 * =========================
 * Works（制作実績）
 * =========================
 */

export type Work = {
  image: {
    url: string;
  };
} & MicroCMSListContent;

/**
 * =========================
 * Works（制作実績一覧）
 * =========================
 */

export const getWorks = async () => {
  return await client.getList<Work>({
    endpoint: "works",
  });
};

export const getWork = async (id: string) => {
  return await client.getListDetail<Work>({
    endpoint: "works",
    contentId: id,
  });
};
