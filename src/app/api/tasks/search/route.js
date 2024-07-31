import { algoliaIndex } from "@/algolia/client";
import { NextResponse } from "next/server";

export async function GET(req, context) {
  const query = req.nextUrl.searchParams.get("query");

  try {
    if (!query) {
      return NextResponse.json(
        { error: "Search query is required" },
        { status: 400 }
      );
    }

    const { hits, nbHits } = await algoliaIndex.search(query);
    console.log("hitss", hits);

    return NextResponse.json({
      totalResults: nbHits,
      results: hits,
    });
  } catch (error) {
    console.error("Error searching data:", error);
    return NextResponse.json(
      { error: "Failed to perform search" },
      { status: 500 }
    );
  }
}
