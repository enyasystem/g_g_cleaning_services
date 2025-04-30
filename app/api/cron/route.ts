import { NextResponse } from "next/server"
import { removeDuplicates, normalizeNewsData, categorizeNews } from "@/lib/news-scraper"
import { refreshNewsCache } from "@/lib/news-fetcher"
import { NEWS_SOURCES, fetchRssFeed, scrapeNews } from "@/lib/news-scraper"

// Helper function to add delay
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Fetch all news with delay between sources to avoid rate limiting
async function fetchAllNewsWithDelay() {
  const sources = Object.keys(NEWS_SOURCES) as Array<keyof typeof NEWS_SOURCES>;
  let allNews = [];
  for (const source of sources) {
    try {
      const sourceInfo = NEWS_SOURCES[source];
      let news;
      if (sourceInfo.type === "rss") {
        news = await fetchRssFeed(source);
      } else {
        news = await scrapeNews(source);
      }
      allNews.push(...news);
      await delay(2000); // 2 seconds delay between requests
    } catch (error) {
      console.error(`Error fetching from ${String(source)}:`, error);
    }
  }
  return allNews;
}

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

    // Fetch all news from RSS feeds with delay
    const allNews = await fetchAllNewsWithDelay();
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
