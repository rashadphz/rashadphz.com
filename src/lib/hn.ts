import { CheerioAPI, Element, load } from "cheerio";
import { z } from "zod";

export const hackerNewsPostSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  url: z.string().url(),
  points: z.number().int().optional(),
  createdAt: z.date().optional(),
});

export type HackerNewsPost = z.infer<typeof hackerNewsPostSchema>;

function parsePost(element: Element, $: CheerioAPI): HackerNewsPost {
  const titleLine = $(element).find("span.titleline");
  const id = parseInt($(element).attr("id") ?? "0");
  const title = titleLine.find("> a").text();
  let url = titleLine.find("> a").attr("href");
  if (url && !url.startsWith("http")) {
    url = new URL(url, "https://news.ycombinator.com").href;
  }

  const subtext = $(element).next();
  const points = parseInt(subtext.find("span.score").text());
  const createdAtString = subtext.find("span.age").attr("title")?.split(" ")[0];

  return hackerNewsPostSchema.parse({
    id,
    title,
    url,
    points,
    createdAt: new Date(createdAtString ?? "") ?? null,
  });
}

// Onlt fetches most recent page of likes. This is fine, we've already synced the previous pages.
export async function getHackerNewsLikes(): Promise<HackerNewsPost[] | null> {
  try {
    const response = await fetch(
      "https://news.ycombinator.com/upvoted?id=rashadphil",
      {
        headers: {
          Cookie: process.env.HN_COOKIE ?? "",
        },
      }
    );
    if (!response?.ok) {
      return null;
    }
    const html = await response.text();
    const $ = load(html);
    const posts = $("tr.athing")
      .map((i, el) => parsePost(el, $))
      .toArray()
      .reverse();
    return posts;
  } catch (error) {
    console.error(`Error fetching Hacker News likes: ${error}`);
    return null;
  }
} 