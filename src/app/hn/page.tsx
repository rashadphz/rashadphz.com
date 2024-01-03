import Link from "@/components/link";
import Base from "@/layouts/base";
import { CheerioAPI, Element, load } from "cheerio";
import { z } from "zod";

const hackerNewsPostSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  url: z.string().url(),
  points: z.number().int(),
  comments: z.number().int(),
  createdAt: z.date(),
});

type HackerNewsPost = z.infer<typeof hackerNewsPostSchema>;

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
  const comments = parseInt(
    subtext.find("a:contains('comments')").text().split(" ")[0]
  );
  const createdAtString = subtext.find("span.age").attr("title");

  return hackerNewsPostSchema.parse({
    id,
    title,
    url,
    points,
    comments,
    createdAt: new Date(createdAtString ?? ""),
  });
}

async function getHackerNewsLikes(): Promise<HackerNewsPost[] | null> {
  const DAY = 60 * 60 * 24;
  try {
    const response = await fetch(
      "https://news.ycombinator.com/upvoted?id=rashadphil",
      {
        headers: {
          Cookie: process.env.HN_COOKIE ?? "",
        },
        next: {
          revalidate: DAY,
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
      .toArray();
    return posts;
  } catch (error) {
    console.error(`Error fetching Hacker News likes: ${error}`);
    return null;
  }
}

export default async function HackerNews() {
  const posts = await getHackerNewsLikes();
  if (!posts) {
    return null;
  }
  return (
    <Base>
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold mb-8">Liked Hacker News Posts</h2>
        <ul className="space-y-6">
          {posts.map((post) => (
            <li key={post.id} className="flex flex-col space-y-1">
              <Link href={post.url}>{post.title}</Link>
              <div className="text-sm text-muted-foreground">
                {post.points} points · {post.comments} comments ·{" "}
                {post.createdAt.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Base>
  );
}
