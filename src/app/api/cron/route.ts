import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getHackerNewsLikes } from '@/lib/hn';
import { getNotionLinks, updateMissionNotionTitles } from '@/lib/notion';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
 
export const runtime = 'edge';
export const preferredRegion = 'auto';
 
export async function GET() {
  try {
    const updateTitles = await updateMissionNotionTitles();
    console.log(`Updated ${updateTitles.updated} titles in Notion`);

    const [hnPosts, notionLinks] = await Promise.all([
      getHackerNewsLikes(),
      getNotionLinks(),
    ]);

    console.log({notionLinks})
    
    const records = [
      ...(hnPosts?.map(post => ({
        url: post.url,
        title: post.title,
        source: 'hackernews',
      })) ?? []),
      ...(notionLinks?.map(link => ({
        url: link.url,
        title: link.title,
        source: 'notion',
      })) ?? []),
    ];


    const { error, count } = await supabase
      .from('links')
      .upsert(records, {
        onConflict: 'url',
      });

    if (error) throw error;
    
    return NextResponse.json({
      message: `Successfully synced ${count} links to Supabase`,
      stats: {
        hn: hnPosts?.length ?? 0,
        notion: notionLinks?.length ?? 0,
      },
    });
  } catch (error) {
    console.error("Cron job failed:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
} 