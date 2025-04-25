import { NextResponse } from "next/server"
import { fetchNewsByCategory, searchNews } from "@/lib/news-fetcher"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")
  const query = searchParams.get("q")
  const limit = Number.parseInt(searchParams.get("limit") || "10")

  try {
    if (query) {
      const results = await searchNews(query, limit)
      return NextResponse.json({ success: true, data: results })
    }

    if (category) {
      const news = await fetchNewsByCategory(category, limit)
      return NextResponse.json({ success: true, data: news })
    }

    return NextResponse.json({ success: false, error: "Missing required parameters" }, { status: 400 })
  } catch (error) {
    console.error("Error fetching news:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch news" }, { status: 500 })
  }
}
