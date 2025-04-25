import type { NewsItem } from "@/components/news-card"
import Parser from "rss-parser"
import { v4 as uuidv4 } from "uuid"
import * as cheerio from "cheerio"

// Initialize RSS parser with custom fields
const parser = new Parser({
  customFields: {
    item: [
      ["media:content", "media", { keepArray: true }],
      ["media:thumbnail", "thumbnail", { keepArray: true }],
      ["enclosure", "enclosure"],
    ],
  },
})

// Map of news sources
const NEWS_SOURCES = {
  guardian: {
    name: "The Guardian Nigeria",
    url: "https://guardian.ng/feed/",
    type: "rss",
  },
  punch: {
    name: "Punch",
    url: "https://punchng.com/feed/",
    type: "rss",
  },
  vanguard: {
    name: "Vanguard",
    url: "https://www.vanguardngr.com/feed/",
    type: "rss",
  },
  premiumTimes: {
    name: "Premium Times",
    url: "https://www.premiumtimesng.com/feed",
    type: "rss",
  },
  channelsTV: {
    name: "Channels TV",
    url: "https://www.channelstv.com/feed/",
    type: "rss",
  },
  bbcPidgin: {
    name: "BBC Pidgin",
    url: "https://feeds.bbci.co.uk/pidgin/rss.xml",
    type: "rss",
  },
  thisDay: {
    name: "ThisDay",
    url: "https://www.thisdaylive.com/index.php/feed/",
    type: "rss",
  },
  dailyTrust: {
    name: "Daily Trust",
    url: "https://dailytrust.com/feed/",
    type: "rss",
  },
}

// Function to extract image from RSS feed item
function extractImageFromItem(item: any): string {
  // Try to get image from media:content
  if (item.media && item.media.length > 0) {
    for (const media of item.media) {
      if (media.$ && media.$.url && (media.$.medium === "image" || media.$.type?.startsWith("image/"))) {
        return media.$.url
      }
    }
  }

  // Try to get image from media:thumbnail
  if (item.thumbnail && item.thumbnail.length > 0) {
    for (const thumbnail of item.thumbnail) {
      if (thumbnail.$ && thumbnail.$.url) {
        return thumbnail.$.url
      }
    }
  }

  // Try to get image from enclosure
  if (item.enclosure && item.enclosure.url && item.enclosure.type?.startsWith("image/")) {
    return item.enclosure.url
  }

  // Try to extract image from content if it contains HTML
  if (item.content && item.content.includes("<img")) {
    try {
      const $ = cheerio.load(item.content)
      const imgSrc = $("img").first().attr("src")
      if (imgSrc) return imgSrc
    } catch (error) {
      console.error("Error extracting image from content:", error)
    }
  }

  // Default placeholder
  return "/placeholder.svg?height=400&width=600"
}

// Function to determine category from item
function determineCategoryFromItem(item: any): string {
  const title = (item.title || "").toLowerCase()
  const categories = item.categories || []
  const content = (item.content || "").toLowerCase()

  // Check if categories array contains any of our predefined categories
  const categoryMap: Record<string, string[]> = {
    politics: ["politics", "government", "election", "president", "minister", "senate", "parliament"],
    entertainment: ["entertainment", "music", "movie", "celebrity", "film", "actor", "actress", "nollywood"],
    sports: [
      "sports",
      "football",
      "soccer",
      "basketball",
      "tennis",
      "athlete",
      "tournament",
      "championship",
      "super eagles",
    ],
    tech: ["tech", "technology", "digital", "software", "hardware", "internet", "app", "computer", "smartphone"],
    business: ["business", "economy", "finance", "market", "stock", "trade", "investment", "banking", "naira"],
  }

  // Check categories first
  for (const category of categories) {
    const lowerCategory = category.toLowerCase()
    for (const [key, keywords] of Object.entries(categoryMap)) {
      if (keywords.some((keyword) => lowerCategory.includes(keyword))) {
        return key
      }
    }
  }

  // Then check title
  for (const [key, keywords] of Object.entries(categoryMap)) {
    if (keywords.some((keyword) => title.includes(keyword))) {
      return key
    }
  }

  // Finally check content
  for (const [key, keywords] of Object.entries(categoryMap)) {
    if (keywords.some((keyword) => content.includes(keyword))) {
      return key
    }
  }

  // Default category
  return "general"
}

// Helper to ensure a link is absolute and valid
function getAbsoluteUrl(link: string, base: string): string {
  try {
    if (!link) return ""
    const url = new URL(link, base)
    if (url.protocol === "http:" || url.protocol === "https:") {
      return url.href
    }
    return ""
  } catch {
    return ""
  }
}

// Helper to fetch canonical/og:url from an article page
async function fetchCanonicalUrl(articleUrl: string): Promise<string> {
  try {
    const res = await fetch(articleUrl, { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; NaijaNewsBot/1.0)' } })
    if (!res.ok) return articleUrl
    const html = await res.text()
    const $ = cheerio.load(html)
    // Try og:url first
    const ogUrl = $('meta[property="og:url"]').attr('content')
    if (ogUrl && (ogUrl.startsWith('http://') || ogUrl.startsWith('https://'))) return ogUrl
    // Try canonical
    const canonical = $('link[rel="canonical"]').attr('href')
    if (canonical && (canonical.startsWith('http://') || canonical.startsWith('https://'))) return canonical
    return articleUrl
  } catch {
    return articleUrl
  }
}

// Update fetchRssWithFetch to catch and return null on network errors, never infinite retry
async function fetchRssWithFetch(url: string, retries = 2): Promise<any> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000); // 10 seconds
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; NaijaNewsBot/1.0)",
      },
    });
    clearTimeout(timeout);
    if (!response.ok) {
      console.warn(`Failed to fetch RSS feed: ${response.status} ${response.statusText} for ${url}`);
      if (retries > 0) return await fetchRssWithFetch(url, retries - 1);
      return null;
    }
    const text = await response.text();
    return await parser.parseString(text);
  } catch (error) {
    clearTimeout(timeout);
    if (error instanceof Error && error.name === "AbortError") {
      console.error(`Fetch for ${url} timed out.`);
    } else {
      console.error(`Error fetching RSS feed from ${url}:`, error);
    }
    // Only retry on first error, then give up and return null
    if (retries > 0) return await fetchRssWithFetch(url, retries - 1);
    return null;
  }
}

// Update the fetchRssFeed function to handle retries from fetchRssWithFetch
export async function fetchRssFeed(source: keyof typeof NEWS_SOURCES): Promise<NewsItem[]> {
  try {
    console.log(`Fetching RSS feed from ${NEWS_SOURCES[source].name} (${NEWS_SOURCES[source].url})`)
    const feed = await fetchRssWithFetch(NEWS_SOURCES[source].url)
    if (!feed || !feed.items || feed.items.length === 0) {
      console.warn(`No items found in RSS feed from ${source}`)
      return []
    }
    const items = await Promise.all(feed.items.map(async (item) => {
      const imageUrl = extractImageFromItem(item)
      const category = determineCategoryFromItem(item)
      const rawLink = item.link || ""
      let sourceUrl = getAbsoluteUrl(rawLink, NEWS_SOURCES[source].url.replace(/\/feed.*/, "/"))
      if (sourceUrl) {
        sourceUrl = await fetchCanonicalUrl(sourceUrl)
      }
      return {
        id: item.guid || uuidv4(),
        title: item.title || "No Title",
        summary: item.contentSnippet || item.summary || "No summary available.",
        imageUrl,
        sourceUrl,
        sourceName: NEWS_SOURCES[source].name,
        category,
        publishedAt: item.pubDate ? new Date(item.pubDate).toISOString() : new Date().toISOString(),
      }
    }))
    return items
  } catch (error) {
    console.error(`Error fetching RSS feed from ${source}:`, error)
    return []
  }
}

// Function to scrape news from website using cheerio
export async function scrapeNews(source: keyof typeof NEWS_SOURCES): Promise<NewsItem[]> {
  try {
    const response = await fetch(NEWS_SOURCES[source].url)
    const html = await response.text()
    const newsItems: NewsItem[] = []
    const $ = cheerio.load(html)

    // Guardian
    if (source === "guardian") {
      await Promise.all(
        $("article").toArray().map(async (el) => {
          const $el = $(el)
          const title = $el.find("h3").text().trim()
          const link = $el.find("a").attr("href") || ""
          const summary = $el.find("p").text().trim()
          let imageUrl = $el.find("img").attr("src") || ""
          let sourceUrl = getAbsoluteUrl(link, "https://guardian.ng/")
          if (sourceUrl) sourceUrl = await fetchCanonicalUrl(sourceUrl)
          if (sourceUrl) imageUrl = await fetchImageUrl(sourceUrl, imageUrl)
          if (title && sourceUrl && imageUrl) {
            newsItems.push({
              id: uuidv4(),
              title,
              summary: summary || "No summary available.",
              imageUrl,
              sourceUrl,
              sourceName: NEWS_SOURCES[source].name,
              category: "general",
              publishedAt: new Date().toISOString(),
            })
          }
        })
      )
    }
    // Punch
    else if (source === "punch") {
      await Promise.all(
        $("article").toArray().map(async (el) => {
          const $el = $(el)
          const title = $el.find("h2, h3").text().trim()
          const link = $el.find("a").attr("href") || ""
          const summary = $el.find("p").text().trim()
          let imageUrl = $el.find("img").attr("src") || ""
          let sourceUrl = getAbsoluteUrl(link, "https://punchng.com/")
          if (sourceUrl) sourceUrl = await fetchCanonicalUrl(sourceUrl)
          if (sourceUrl) imageUrl = await fetchImageUrl(sourceUrl, imageUrl)
          if (title && sourceUrl && imageUrl) {
            newsItems.push({
              id: uuidv4(),
              title,
              summary: summary || "No summary available.",
              imageUrl,
              sourceUrl,
              sourceName: NEWS_SOURCES[source].name,
              category: "general",
              publishedAt: new Date().toISOString(),
            })
          }
        })
      )
    }
    // Vanguard
    else if (source === "vanguard") {
      await Promise.all(
        $("article").toArray().map(async (el) => {
          const $el = $(el)
          const title = $el.find("h2, h3").text().trim()
          const link = $el.find("a").attr("href") || ""
          const summary = $el.find("p").text().trim()
          let imageUrl = $el.find("img").attr("src") || ""
          let sourceUrl = getAbsoluteUrl(link, "https://www.vanguardngr.com/")
          if (sourceUrl) sourceUrl = await fetchCanonicalUrl(sourceUrl)
          if (sourceUrl) imageUrl = await fetchImageUrl(sourceUrl, imageUrl)
          if (title && sourceUrl && imageUrl) {
            newsItems.push({
              id: uuidv4(),
              title,
              summary: summary || "No summary available.",
              imageUrl,
              sourceUrl,
              sourceName: NEWS_SOURCES[source].name,
              category: "general",
              publishedAt: new Date().toISOString(),
            })
          }
        })
      )
    }
    // Add similar logic for other sources (premiumTimes, channelsTV, bbcPidgin, thisDay, dailyTrust)
    return newsItems
  } catch (error) {
    console.error(`Error scraping news from ${source}:`, error)
    return []
  }
}

// Helper to fetch the best image from the article page if not present in preview
async function fetchImageUrl(articleUrl: string, fallback: string): Promise<string> {
  try {
    const res = await fetch(articleUrl, { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; NaijaNewsBot/1.0)' } })
    if (!res.ok) return fallback || "/placeholder.svg?height=400&width=600"
    const html = await res.text()
    const $ = cheerio.load(html)
    // Try og:image first
    const ogImg = $('meta[property="og:image"]').attr('content')
    if (ogImg && ogImg.startsWith('http')) return ogImg
    // Try twitter:image
    const twitterImg = $('meta[name="twitter:image"]').attr('content')
    if (twitterImg && twitterImg.startsWith('http')) return twitterImg
    // Try first <img>
    const img = $('img').attr('src')
    if (img && img.startsWith('http')) return img
    return fallback || "/placeholder.svg?height=400&width=600"
  } catch {
    return fallback || "/placeholder.svg?height=400&width=600"
  }
}

// Update the fetchAllNews function to handle individual source failures better
export async function fetchAllNews(): Promise<NewsItem[]> {
  try {
    const allNews: NewsItem[] = []

    // Fetch from all sources
    const sources = Object.keys(NEWS_SOURCES) as Array<keyof typeof NEWS_SOURCES>

    // Use Promise.allSettled instead of Promise.all to handle individual failures
    const results = await Promise.allSettled(
      sources.map(async (source) => {
        try {
          const sourceInfo = NEWS_SOURCES[source]
          if (sourceInfo.type === "rss") {
            return await fetchRssFeed(source)
          } else {
            return await scrapeNews(source)
          }
        } catch (error) {
          console.error(`Error fetching from ${source}:`, error)
          return []
        }
      }),
    )

    // Combine all successful results
    results.forEach((result, index) => {
      if (result.status === "fulfilled") {
        allNews.push(...result.value)
      } else {
        console.error(`Failed to fetch from ${sources[index]}:`, result.reason)
      }
    })

    return allNews
  } catch (error) {
    console.error("Error fetching all news:", error)
    return []
  }
}

// Function to normalize news data
export async function normalizeNewsData(rawNews: NewsItem[]): Promise<NewsItem[]> {
  // Clean and normalize the data from different sources
  return await Promise.all(
    rawNews.map(async (item) => {
      let imageUrl = item.imageUrl || ""
      // If imageUrl is missing or is a placeholder, try to fetch from the article page
      if (!imageUrl || imageUrl.includes("placeholder")) {
        imageUrl = await fetchImageUrl(item.sourceUrl, "/placeholder.svg?height=400&width=600")
      }
      return {
        ...item,
        title: item.title.trim(),
        summary:
          item.summary
            .trim()
            .replace(/<[^>]*>?/gm, "")
            .substring(0, 200) + (item.summary.length > 200 ? "..." : ""),
        imageUrl: imageUrl || "/placeholder.svg?height=400&width=600",
      }
    })
  )
}

// Function to categorize news
export async function categorizeNews(news: NewsItem[]): Promise<Record<string, NewsItem[]>> {
  const categorized: Record<string, NewsItem[]> = {
    politics: [],
    entertainment: [],
    sports: [],
    tech: [],
    business: [],
    general: [],
  }

  news.forEach((item) => {
    if (categorized[item.category]) {
      categorized[item.category].push(item)
    } else {
      categorized.general.push(item)
    }
  })

  return categorized
}

// Function to remove duplicates
export async function removeDuplicates(news: NewsItem[]): Promise<NewsItem[]> {
  const uniqueUrls = new Set<string>()
  const uniqueNews: NewsItem[] = []

  news.forEach((item) => {
    if (!uniqueUrls.has(item.sourceUrl)) {
      uniqueUrls.add(item.sourceUrl)
      uniqueNews.push(item)
    }
  })

  return uniqueNews
}

// Function to process all news
export async function processAllNews(): Promise<Record<string, NewsItem[]>> {
  try {
    // Fetch all news
    const allNews = await fetchAllNews()

    // Remove duplicates
    const uniqueNews = await removeDuplicates(allNews)

    // Normalize data
    const normalizedNews = await normalizeNewsData(uniqueNews)

    // Categorize news
    const categorizedNews = await categorizeNews(normalizedNews)

    return categorizedNews
  } catch (error) {
    console.error("Error processing all news:", error)
    return {}
  }
}
