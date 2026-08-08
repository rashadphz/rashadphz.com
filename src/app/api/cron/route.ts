import { NextResponse } from "next/server";
import { updateMissingNotionTitles } from "@/lib/notion";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const updateTitles = await updateMissingNotionTitles();
    console.log(`Updated ${updateTitles.updated} titles in Notion`);

    return NextResponse.json({
      message: `Updated ${updateTitles.updated} Notion link titles`,
      stats: updateTitles,
    });
  } catch (error) {
    console.error("Cron job failed:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
