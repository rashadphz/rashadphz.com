import Base from "@/layouts/base";
import { supabase } from "@/lib/supabase";
import { z } from "zod";
import Link from "@/components/link";
import Favicon from "@/components/favicon";

// Revalidate every eight hours (~3 times per day)
export const revalidate = 60 * 60 * 8;

const linkSchema = z.object({
  url: z.string().url(),
  title: z.string(),
  created_at: z.string(),
});

type LinkType = z.infer<typeof linkSchema>;

async function getLinks(): Promise<LinkType[]> {
  const { data, error } = await supabase
    .from("links")
    .select("title, url, created_at")
    .order("created_at", { ascending: false })

  if (error) throw error;
  return data.map((link) => linkSchema.parse(link));
}

export default async function LinksPage() {
  const links = await getLinks();

  return (
    <Base>
      <div className="flex flex-col">
        <div className="space-y-1 mb-6">
          <h2 className="text-2xl font-bold">links</h2>
          <span className="text-sm">
            Things I&apos;ve found interesting on the internet.
          </span>
        </div>
        <ul className="space-y-1">
          {links.map((link) => (
            <li key={link.url}>
              <Link href={link.url} className="no-underline" hideArrow>
                <div className="items-center gap-2 flex-col bg-transparent hover:bg-muted/80 p-1 rounded-md transition-[background-color] duration-300">
                  <div className="flex items-center gap-2">
                    <Favicon url={link.url} title={link.title} />
                    <div className="no-underline text-sm">{link.title}</div>
                  </div>
                  <div className="hidden sm:block text-xxs text-muted-foreground font-mono">
                    [{new URL(link.url).host.replace(/^www\./, "")}]
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Base>
  );
}
