import { NextResponse } from "next/server"
import { fetchAllNews, removeDuplicates, normalizeNewsData, categorizeNews } from "@/lib/news-scraper"
import { refreshNewsCache } from "@/lib/news-fetcher"

// This route would be called by a cron job service like Vercel Cron
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get("secret")

  // Verify the request is authorized
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
  }

  try {
    console.log("Starting news fetching cron job...")

    // Fetch all news from RSS feeds
    const allNews = await fetchAllNews()
    console.log(`Fetched ${allNews.length} news items from all sources`)

    // Remove duplicates
    const uniqueNews = await removeDuplicates(allNews)
    console.log(`After removing duplicates: ${uniqueNews.length} news items`)

    // Normalize data
    const normalizedNews = await normalizeNewsData(uniqueNews)

    // Categorize news
    const categorizedNews = await categorizeNews(normalizedNews)

    // Log the number of news items in each category
    Object.entries(categorizedNews).forEach(([category, news]) => {
      console.log(`${category}: ${news.length} items`)
    })

    // Refresh the news cache
    await refreshNewsCache()

    // In a real implementation, you would save the news to a database here
    // For now, we'll just return a success message

    return NextResponse.json({
      success: true,
      message: "News fetching job completed successfully",
      stats: {
        total: allNews.length,
        unique: uniqueNews.length,
        categories: Object.fromEntries(
          Object.entries(categorizedNews).map(([category, news]) => [category, news.length]),
        ),
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error in cron job:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch news",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
