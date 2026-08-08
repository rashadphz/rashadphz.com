import { timingSafeEqual } from "node:crypto";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  createNotionLink,
  fetchPageTitle,
  findNotionLinkByUrl,
} from "@/lib/notion";

export const runtime = "nodejs";

const requestSchema = z.object({
  url: z
    .string()
    .trim()
    .url()
    .refine((value) => ["http:", "https:"].includes(new URL(value).protocol), {
      message: "Only HTTP and HTTPS URLs are supported",
    }),
  title: z.string().trim().min(1).max(500).optional(),
});

function isAuthorized(request: NextRequest) {
  const expectedToken = process.env.LINK_INGEST_TOKEN;
  if (!expectedToken) return false;

  const authorization = request.headers.get("authorization") ?? "";
  const providedToken = authorization.startsWith("Bearer ")
    ? authorization.slice("Bearer ".length)
    : "";

  const expected = Buffer.from(expectedToken);
  const provided = Buffer.from(providedToken);

  return (
    expected.length === provided.length && timingSafeEqual(expected, provided)
  );
}

function normalizeUrl(value: string) {
  const url = new URL(value);
  url.hash = "";
  return url.toString();
}

export async function POST(request: NextRequest) {
  if (!process.env.LINK_INGEST_TOKEN) {
    return NextResponse.json(
      { message: "Link ingestion is not configured" },
      { status: 503 }
    );
  }

  if (!isAuthorized(request)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  let input: z.infer<typeof requestSchema>;

  try {
    input = requestSchema.parse(await request.json());
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Send a valid URL", issues: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Send a JSON body containing a URL" },
      { status: 400 }
    );
  }

  try {
    const url = normalizeUrl(input.url);
    const candidateUrls = Array.from(new Set([input.url, url]));
    let existingLink = null;

    for (const candidateUrl of candidateUrls) {
      existingLink = await findNotionLinkByUrl(candidateUrl);
      if (existingLink) break;
    }

    if (existingLink) {
      return NextResponse.json({
        message: "Link already saved",
        status: "duplicate",
        link: existingLink,
      });
    }

    const title = (
      input.title ??
      (await fetchPageTitle(url)) ??
      new URL(url).hostname.replace(/^www\./, "")
    ).slice(0, 500);

    const id = await createNotionLink(url, title);
    revalidatePath("/links");

    return NextResponse.json(
      {
        message: "Link saved",
        status: "created",
        link: { id, url, title },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to save link:", error);
    return NextResponse.json(
      { message: "Could not save link" },
      { status: 500 }
    );
  }
}
