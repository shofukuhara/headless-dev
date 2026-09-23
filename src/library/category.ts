import type { MicroCMSListContent } from "microcms-js-sdk";
import type { Column } from "./column";
import { client } from "./microcms";

export type Category = {
  name: string;
  slug: string;
} & MicroCMSListContent;

export const getCategories = async () => {
  return await client.getList<Category>({
    endpoint: "category",
  });
};

export const getCategory = async (slug: string) => {
  return await client.getList<Category>({
    endpoint: "category",
    queries: {
      filters: `slug[equals]${slug}`,
    },
  });
};

export const getColumnsByCategory = async (categoryId: string) => {
  return await client.getList<Column>({
    endpoint: "column",
    queries: {
      filters: `category[contains]${categoryId}`,
      orders: "-publishedAt",
    },
  });
};