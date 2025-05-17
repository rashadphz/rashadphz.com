import Base from "@/layouts/base";
import { supabase } from "@/lib/supabase";
import { z } from "zod";
import SearchableLinks from "@/components/searchable-links";

// Revalidate every eight hours (~3 times per day)
export const revalidate = 60 * 60 * 8;

const linkSchema = z.object({
  url: z.string().url(),
  title: z.string(),
  created_at: z.string(),
});

export type LinkType = z.infer<typeof linkSchema>;

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
      <SearchableLinks links={links} />
    </Base>
  );
}
