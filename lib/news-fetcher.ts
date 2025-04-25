import type { NewsItem } from "@/components/news-card"
import { processAllNews, MOCK_NEWS, categorizeNews } from "@/lib/news-scraper"

// Cache for news data to avoid too many API calls
let newsCache: {
  data: Record<string, NewsItem[]>
  timestamp: number
} | null = null

// Cache expiration time (5 minutes for real-time updates)
const CACHE_EXPIRATION = 5 * 60 * 1000

// Function to get news data, either from cache or by fetching
async function getNewsData(): Promise<Record<string, NewsItem[]>> {
  // Always fetch real news, never use mock data
  // Remove preview mode check

  // If cache exists and is not expired, use it
  if (newsCache && Date.now() - newsCache.timestamp < CACHE_EXPIRATION) {
    return newsCache.data
  }

  try {
    // Fetch and process news
    const categorizedNews = await processAllNews()

    // Make sure we have at least some data in each category
    const hasData = Object.values(categorizedNews).some((items) => items.length > 0)

    if (!hasData) {
      throw new Error("No news data retrieved from any source")
    }

    // Update cache
    newsCache = {
      data: categorizedNews,
      timestamp: Date.now(),
    }

    return categorizedNews
  } catch (error) {
    console.error("Error getting news data:", error)

    // If we have cached data, return it even if expired
    if (newsCache) {
      console.log("Using expired cache data")
      return newsCache.data
    }

    // If all else fails, return empty object (no mock data)
    return {}
  }
}

export async function fetchNewsByCategory(category: string, limit = 8): Promise<NewsItem[]> {
  try {
    const newsData = await getNewsData()

    if (category === "trending") {
      // For trending, get news from all categories and sort by date
      const allNews = Object.values(newsData).flat()
      return allNews
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
        .slice(0, limit)
    }

    // Get news for the specified category
    const categoryNews = newsData[category] || []

    return categoryNews
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, limit)
  } catch (error) {
    console.error(`Error fetching news for category ${category}:`, error)
    return []
  }
}

export async function fetchFeaturedNews(): Promise<NewsItem> {
  try {
    const newsData = await getNewsData()

    // Combine all news
    const allNews = Object.values(newsData).flat()

    // Sort by date and get the most recent
    const sortedNews = allNews.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

    return sortedNews[0] || createDefaultNewsItem()
  } catch (error) {
    console.error("Error fetching featured news:", error)
    return createDefaultNewsItem()
  }
}

export async function fetchTrendingNews(limit = 3): Promise<NewsItem[]> {
  try {
    const newsData = await getNewsData()

    // Combine all news
    const allNews = Object.values(newsData).flat()

    // Sort by date
    const sortedNews = allNews.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

    return sortedNews.slice(0, limit)
  } catch (error) {
    console.error("Error fetching trending news:", error)
    return []
  }
}

export async function searchNews(query: string, limit = 10): Promise<NewsItem[]> {
  try {
    const newsData = await getNewsData()

    // Combine all news
    const allNews = Object.values(newsData).flat()

    const lowercaseQuery = query.toLowerCase()

    // Filter news by query
    const filteredNews = allNews.filter(
      (news) =>
        news.title.toLowerCase().includes(lowercaseQuery) || news.summary.toLowerCase().includes(lowercaseQuery),
    )

    // Sort by date
    const sortedNews = filteredNews.sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )

    return sortedNews.slice(0, limit)
  } catch (error) {
    console.error("Error searching news:", error)
    return []
  }
}

// Function to fetch news by source
export async function fetchNewsBySource(sourceName: string, limit = 8): Promise<NewsItem[]> {
  try {
    const newsData = await getNewsData()

    // Combine all news
    const allNews = Object.values(newsData).flat()

    // Filter by source name
    const sourceNews = allNews.filter((news) => news.sourceName.toLowerCase().includes(sourceName.toLowerCase()))

    // Sort by date
    const sortedNews = sourceNews.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

    return sortedNews.slice(0, limit)
  } catch (error) {
    console.error(`Error fetching news for source ${sourceName}:`, error)
    return []
  }
}

// Helper function to create a default news item
function createDefaultNewsItem(): NewsItem {
  return {
    id: "default",
    title: "No news available at the moment",
    summary: "Please check back later for the latest news updates.",
    imageUrl: "/placeholder.svg?height=400&width=600",
    sourceUrl: "#",
    sourceName: "NaijaNews",
    category: "general",
    publishedAt: new Date().toISOString(),
  }
}

// Function to manually refresh the news cache
export async function refreshNewsCache(): Promise<boolean> {
  try {
    // In preview mode, just return true
    if (process.env.NEXT_PUBLIC_VERCEL_ENV === "preview") {
      return true
    }

    const categorizedNews = await processAllNews()

    newsCache = {
      data: categorizedNews,
      timestamp: Date.now(),
    }

    return true
  } catch (error) {
    console.error("Error refreshing news cache:", error)
    return false
  }
}
