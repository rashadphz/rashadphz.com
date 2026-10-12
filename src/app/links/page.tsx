import Base from "@/layouts/base";
import Link from "@/components/link";
import Favicon from "@/components/favicon";
import { getNotionLinks } from "@/lib/notion";

export const revalidate = 60 * 2;

type LinkType = {
  url: string;
  title: string;
  createdAt?: string;
};

async function getLinks(): Promise<LinkType[]> {
  const notionLinks = await getNotionLinks();

  const links = new Map<string, LinkType>();

  for (const link of notionLinks ?? []) {
    links.set(link.url, {
      url: link.url,
      title: link.title ?? new URL(link.url).hostname.replace(/^www\./, ""),
      createdAt: link.createdAt,
    });
  }

  return Array.from(links.values()).sort((a, b) => {
    const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return bTime - aTime;
  });
}

export default async function LinksPage() {
  const links = await getLinks();

  return (
    <Base>
      <div className="flex flex-col">
        <div className="space-y-1 mb-6">
          <h2 className="text-sm font-medium">links</h2>
          <span className="text-sm">
            some things I&apos;ve found interesting
          </span>
        </div>
        <ul className="space-y-1">
          {links.map((link) => (
            <li key={link.url}>
              <Link href={link.url} className="no-underline" hideArrow>
                <div className="flex items-start gap-2 bg-transparent hover:bg-muted/80 px-1 py-0.5 rounded-md transition-[background-color] duration-300">
                  <Favicon url={link.url} title={link.title} />
                  <span className="min-w-0 text-xs leading-5 break-words">
                    <span>{link.title}</span>
                    <span className="hidden sm:inline ml-2 text-xxs text-muted-foreground font-mono">
                      [{new URL(link.url).host.replace(/^www\./, "")}]
                    </span>
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Base>
  );
}
