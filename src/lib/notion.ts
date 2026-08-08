import "server-only";

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
  createdAt: z.string(),
});

export type NotionLink = z.infer<typeof notionLinkSchema>;

function getDatabaseId() {
  const databaseId = process.env.NOTION_DATABASE_ID;
  if (!databaseId) throw new Error("Missing env.NOTION_DATABASE_ID");
  return databaseId;
}

function parseNotionLink(page: PageObjectResponse): NotionLink {
  const properties = page.properties;
  const publishedAt = (properties.Published as any)?.date?.start;

  return notionLinkSchema.parse({
    id: page.id,
    title: (properties.Name as any)?.title?.[0]?.plain_text ?? null,
    url: (properties.URL as any)?.url ?? "",
    createdAt: publishedAt ?? page.created_time,
  });
}

export async function fetchPageTitle(url: string): Promise<string | null> {
  try {
    const response = await fetch(url, {
      redirect: "follow",
      signal: AbortSignal.timeout(5000),
      headers: {
        "User-Agent": "rashadphz-links/1.0",
      },
    });

    if (!response.ok) return null;

    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.includes("text/html")) return null;

    const html = await response.text();
    const $ = load(html);
    const title =
      $('meta[property="og:title"]').attr("content")?.trim() ||
      $("title").text().trim();

    return title || null;
  } catch (error) {
    console.error(`Error fetching title for ${url}:`, error);
    return null;
  }
}

export async function getNotionLinks(): Promise<NotionLink[] | null> {
  if (!process.env.NOTION_TOKEN || !process.env.NOTION_DATABASE_ID) {
    return null;
  }

  try {
    const links: NotionLink[] = [];
    let cursor: string | undefined;

    do {
      const response = await notion.databases.query({
        database_id: getDatabaseId(),
        page_size: 100,
        start_cursor: cursor,
        filter: {
          property: "URL",
          url: {
            is_not_empty: true,
          },
        },
      });

      links.push(
        ...response.results
          .filter((page): page is PageObjectResponse => "properties" in page)
          .map(parseNotionLink)
      );

      cursor = response.has_more
        ? response.next_cursor ?? undefined
        : undefined;
    } while (cursor);

    return links;
  } catch (error) {
    console.error("Error fetching Notion links:", error);
    return null;
  }
}

export async function findNotionLinkByUrl(
  url: string
): Promise<NotionLink | null> {
  const response = await notion.databases.query({
    database_id: getDatabaseId(),
    page_size: 1,
    filter: {
      property: "URL",
      url: {
        equals: url,
      },
    },
  });

  const page = response.results.find(
    (result): result is PageObjectResponse => "properties" in result
  );

  return page ? parseNotionLink(page) : null;
}

export async function createNotionLink(url: string, title: string) {
  const page = await notion.pages.create({
    parent: { database_id: getDatabaseId() },
    properties: {
      Name: {
        type: "title",
        title: [{ type: "text", text: { content: title } }],
      },
      URL: {
        type: "url",
        url,
      },
    },
  });

  return page.id;
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

export async function updateMissingNotionTitles(): Promise<{
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
