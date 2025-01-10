import { Client } from "@notionhq/client";
import { z } from "zod";
import { load } from "cheerio";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const notionLinkSchema = z.object({
  id: z.string(),
  title: z.string().nullable(),
  url: z.string().url(),
});

export type NotionLink = z.infer<typeof notionLinkSchema>;

async function fetchPageTitle(url: string): Promise<string | null> {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = load(html);
    let title = $("title").text().trim();
    // Simplify title to remove unnecessary parts
    title = title.split('|')[0].split('-')[0].trim();
    return title || null;
  } catch (error) {
    console.error(`Error fetching title for ${url}:`, error);
    return null;
  }
}

export async function getNotionLinks(): Promise<NotionLink[] | null> {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID ?? "",
      filter: {
        property: "URL",
        url: {
          is_not_empty: true,
        },
      },
    });

    return response.results
      .filter((page): page is PageObjectResponse => "properties" in page)
      .map((page) => {
        const properties = page.properties;
        return notionLinkSchema.parse({
          id: page.id,
          title: (properties.Name as any)?.title?.[0]?.plain_text ?? null,
          url: (properties.URL as any)?.url ?? "",
        });
      });
  } catch (error) {
    console.error("Error fetching Notion links:", error);
    return null;
  }
}

export async function updateNotionPageTitle(pageId: string, title: string) {
  try {
    await notion.pages.update({
      page_id: pageId,
      properties: {
        Name: {
          type: "title",
          title: [{ type: "text", text: { content: title } }],
        },
      },
    });
    return true;
  } catch (error) {
    console.error(`Error updating title for page ${pageId}:`, error);
    return false;
  }
}


export async function updateMissionNotionTitles(): Promise<{
  total: number;
  updated: number;
  failed: number;
}> {
  const links = await getNotionLinks();
  if (!links) return { total: 0, updated: 0, failed: 0 };

  const linksWithoutTitles = links.filter((link) => !link.title);
  const results = await Promise.all(linksWithoutTitles.map(async (link) => {
    const title = await fetchPageTitle(link.url);
    if (title) {
      return updateNotionPageTitle(link.id, title);
    }
    return false;
  }));

  const updated = results.filter(Boolean).length;
  const failed = results.filter((result) => !result).length;

  return {
    total: linksWithoutTitles.length,
    updated,
    failed,
  };
} 