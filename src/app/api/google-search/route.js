// app/api/google-search/route.js

import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json({ error: "Missing query" }, { status: 400 });
  }

  try {
    const apiKey = process.env.GOOGLE_SEARCH_API_KEY;
    const cx = process.env.GOOGLE_SEARCH_ENGINE_ID;

    const searchUrl = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(
      query
    )}&key=${apiKey}&cx=${cx}`;

    const response = await fetch(searchUrl);
    const data = await response.json();

    if (!data.items) {
      return NextResponse.json({ error: "No results found" }, { status: 404 });
    }

    const results = data.items.map((item) => ({
      title: item.title,
      url: item.link,
      snippet: item.snippet,
    }));

    return NextResponse.json({ results });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Search failed" },
      { status: 500 }
    );
  }
}
