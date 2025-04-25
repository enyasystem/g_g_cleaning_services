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
  cnn: {
    name: "CNN Africa",
    url: "http://rss.cnn.com/rss/edition_africa.rss",
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

// Update the fetchRssWithFetch function to better handle errors and support timeout using AbortController
async function fetchRssWithFetch(url: string) {
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
    return null;
  }
}

// Update the fetchRssFeed function to handle null responses from fetchRssWithFetch
export async function fetchRssFeed(source: keyof typeof NEWS_SOURCES): Promise<NewsItem[]> {
  try {
    console.log(`Fetching RSS feed from ${NEWS_SOURCES[source].name} (${NEWS_SOURCES[source].url})`)

    // In the preview environment, we can't make HTTP requests
    // Return mock data filtered by source
    if (process.env.NEXT_PUBLIC_VERCEL_ENV === "preview") {
      console.log("Using mock data for preview environment")
      return MOCK_NEWS.filter((item) => item.sourceName.includes(NEWS_SOURCES[source].name.split(" ")[0]))
    }

    // Use fetch API instead of https.get
    const feed = await fetchRssWithFetch(NEWS_SOURCES[source].url)

    // If feed is null (fetch failed), return mock data for this source
    if (!feed) {
      console.warn(`Failed to fetch RSS feed from ${source}, using mock data instead`)
      return MOCK_NEWS.filter((item) => item.sourceName.includes(NEWS_SOURCES[source].name.split(" ")[0]))
    }

    if (!feed.items || feed.items.length === 0) {
      console.warn(`No items found in RSS feed from ${source}`)
      return []
    }

    return feed.items.map((item) => {
      const imageUrl = extractImageFromItem(item)
      const category = determineCategoryFromItem(item)

      return {
        id: item.guid || uuidv4(),
        title: item.title || "No Title",
        summary: item.contentSnippet || item.summary || "No summary available",
        imageUrl,
        sourceUrl: item.link || "",
        sourceName: NEWS_SOURCES[source].name,
        category,
        publishedAt: item.pubDate ? new Date(item.pubDate).toISOString() : new Date().toISOString(),
      }
    })
  } catch (error) {
    console.error(`Error fetching RSS feed from ${source}:`, error)

    // Return mock data as fallback
    return MOCK_NEWS.filter((item) => item.sourceName.includes(NEWS_SOURCES[source].name.split(" ")[0]))
  }
}

// Function to scrape news from website using cheerio
export async function scrapeNews(source: keyof typeof NEWS_SOURCES): Promise<NewsItem[]> {
  try {
    console.log(`Scraping news from ${NEWS_SOURCES[source].name} (${NEWS_SOURCES[source].url})`)

    // In the preview environment, we can't make HTTP requests
    // Return mock data filtered by source
    if (process.env.NEXT_PUBLIC_VERCEL_ENV === "preview") {
      console.log("Using mock data for preview environment")
      return MOCK_NEWS.filter((item) => item.sourceName.includes(NEWS_SOURCES[source].name.split(" ")[0]))
    }

    const response = await fetch(NEWS_SOURCES[source].url)
    const html = await response.text()
    const $ = cheerio.load(html)
    const newsItems: NewsItem[] = []

    // Different scraping logic for different sources
    if (source === "guardian") {
      $("article").each((i, el) => {
        const title = $(el).find("h3").text().trim()
        const link = $(el).find("a").attr("href")
        const summary = $(el).find("p").text().trim()
        const imageUrl = $(el).find("img").attr("src") || "/placeholder.svg?height=400&width=600"

        if (title && link) {
          newsItems.push({
            id: uuidv4(),
            title,
            summary: summary || "No summary available",
            imageUrl,
            sourceUrl: link.startsWith("http") ? link : `https://guardian.ng${link}`,
            sourceName: NEWS_SOURCES[source].name,
            category: "general", // We'll categorize later
            publishedAt: new Date().toISOString(),
          })
        }
      })
    }
    // Add more scraping logic for other sources as needed

    return newsItems
  } catch (error) {
    console.error(`Error scraping news from ${source}:`, error)
    return MOCK_NEWS.filter((item) => item.sourceName.includes(NEWS_SOURCES[source].name.split(" ")[0]))
  }
}

// Update the fetchAllNews function to handle individual source failures better
export async function fetchAllNews(): Promise<NewsItem[]> {
  try {
    // Check if we're in preview mode
    if (process.env.NEXT_PUBLIC_VERCEL_ENV === "preview") {
      console.log("Using mock data for preview environment")
      return MOCK_NEWS
    }

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
        // Add mock data for failed sources
        allNews.push(
          ...MOCK_NEWS.filter((item) => item.sourceName.includes(NEWS_SOURCES[sources[index]].name.split(" ")[0])),
        )
      }
    })

    return allNews
  } catch (error) {
    console.error("Error fetching all news:", error)

    // Return all mock data as fallback
    return MOCK_NEWS
  }
}

// Function to normalize news data
export async function normalizeNewsData(rawNews: NewsItem[]): Promise<NewsItem[]> {
  // List of Nigerian sources only
  const nigerianSources = [
    "The Guardian Nigeria",
    "Punch",
    "Vanguard",
    "Premium Times",
    "Channels TV",
    "ThisDay",
    "Daily Trust",
  ];
  // Clean, normalize, and filter the data
  return rawNews
    .filter(
      (item) =>
        nigerianSources.includes(item.sourceName) &&
        item.summary &&
        item.summary.trim() !== "" &&
        item.summary.trim().toLowerCase() !== "no summary available" &&
        item.imageUrl &&
        item.imageUrl.trim() !== ""
    )
    .map((item) => ({
      ...item,
      title: item.title.trim(),
      summary:
        item.summary
          .trim()
          .replace(/<[^>]*>?/gm, "")
          .substring(0, 200) + (item.summary.length > 200 ? "..." : ""),
      imageUrl: item.imageUrl,
    }));
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

    // Return categorized mock data
    const categorized = await categorizeNews(MOCK_NEWS)
    return categorized
  }
}

// Mock data for when RSS fetching isn't available (for development/preview)
export const MOCK_NEWS: NewsItem[] = [
  {
    id: "1",
    title: "Nigeria Announces New Economic Reforms to Boost Growth",
    summary:
      "The Nigerian government has unveiled a comprehensive economic reform package aimed at stimulating growth and attracting foreign investment.",
    imageUrl: "/placeholder.svg?height=400&width=600",
    sourceUrl: "https://guardian.ng/news/nigeria-announces-new-economic-reforms",
    sourceName: "The Guardian",
    category: "politics",
    publishedAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
  },
  {
    id: "2",
    title: "Super Eagles Qualify for African Cup of Nations",
    summary:
      "Nigeria's national football team, the Super Eagles, have qualified for the upcoming African Cup of Nations after a decisive victory.",
    imageUrl: "/placeholder.svg?height=400&width=600",
    sourceUrl: "https://punchng.com/sports/super-eagles-qualify-for-afcon",
    sourceName: "Punch",
    category: "sports",
    publishedAt: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
  },
  {
    id: "3",
    title: "Nollywood Film Wins International Award at Cannes",
    summary:
      "A Nigerian film has won a prestigious award at the Cannes Film Festival, marking a significant achievement for Nollywood.",
    imageUrl: "/placeholder.svg?height=400&width=600",
    sourceUrl: "https://vanguardngr.com/entertainment/nollywood-film-wins-at-cannes",
    sourceName: "Vanguard",
    category: "entertainment",
    publishedAt: new Date(Date.now() - 10800000).toISOString(), // 3 hours ago
  },
  {
    id: "4",
    title: "Nigerian Tech Startup Raises $10 Million in Funding",
    summary:
      "A Lagos-based technology startup has secured $10 million in Series A funding to expand its operations across Africa.",
    imageUrl: "/placeholder.svg?height=400&width=600",
    sourceUrl: "https://premiumtimesng.com/business/nigerian-tech-startup-raises-10-million",
    sourceName: "Premium Times",
    category: "tech",
    publishedAt: new Date(Date.now() - 14400000).toISOString(), // 4 hours ago
  },
  {
    id: "5",
    title: "Central Bank of Nigeria Announces New Monetary Policy",
    summary:
      "The CBN has announced changes to its monetary policy in an effort to stabilize the naira and control inflation.",
    imageUrl: "/placeholder.svg?height=400&width=600",
    sourceUrl: "https://guardian.ng/business/cbn-announces-new-monetary-policy",
    sourceName: "The Guardian",
    category: "business",
    publishedAt: new Date(Date.now() - 18000000).toISOString(), // 5 hours ago
  },
  {
    id: "6",
    title: "President Addresses Nation on Security Challenges",
    summary:
      "The Nigerian President has addressed the nation regarding ongoing security challenges and outlined new strategies to combat insecurity.",
    imageUrl: "/placeholder.svg?height=400&width=600",
    sourceUrl: "https://punchng.com/politics/president-addresses-nation-on-security",
    sourceName: "Punch",
    category: "politics",
    publishedAt: new Date(Date.now() - 21600000).toISOString(), // 6 hours ago
  },
  {
    id: "7",
    title: "Nigerian Athlete Breaks Olympic Record",
    summary:
      "A Nigerian athlete has broken an Olympic record in athletics, bringing pride to the nation and inspiring young sports enthusiasts.",
    imageUrl: "/placeholder.svg?height=400&width=600",
    sourceUrl: "https://vanguardngr.com/sports/nigerian-athlete-breaks-olympic-record",
    sourceName: "Vanguard",
    category: "sports",
    publishedAt: new Date(Date.now() - 25200000).toISOString(), // 7 hours ago
  },
  {
    id: "8",
    title: "Popular Nigerian Musician Releases New Album",
    summary:
      "A chart-topping Nigerian musician has released a highly anticipated new album that is already breaking streaming records.",
    imageUrl: "/placeholder.svg?height=400&width=600",
    sourceUrl: "https://premiumtimesng.com/entertainment/musician-releases-new-album",
    sourceName: "Premium Times",
    category: "entertainment",
    publishedAt: new Date(Date.now() - 28800000).toISOString(), // 8 hours ago
  },
  {
    id: "9",
    title: "Nigeria Launches New Satellite for Communications",
    summary:
      "Nigeria has successfully launched a new satellite that will enhance telecommunications and internet connectivity across the country.",
    imageUrl: "/placeholder.svg?height=400&width=600",
    sourceUrl: "https://guardian.ng/tech/nigeria-launches-new-satellite",
    sourceName: "The Guardian",
    category: "tech",
    publishedAt: new Date(Date.now() - 32400000).toISOString(), // 9 hours ago
  },
  {
    id: "10",
    title: "Stock Market Reaches New Heights as Investor Confidence Grows",
    summary:
      "The Nigerian Stock Exchange has reached a new all-time high as investor confidence in the economy continues to grow.",
    imageUrl: "/placeholder.svg?height=400&width=600",
    sourceUrl: "https://punchng.com/business/stock-market-reaches-new-heights",
    sourceName: "Punch",
    category: "business",
    publishedAt: new Date(Date.now() - 36000000).toISOString(), // 10 hours ago
  },
  {
    id: "11",
    title: "Government Announces New Infrastructure Projects",
    summary:
      "The Nigerian government has announced several new infrastructure projects aimed at improving transportation and power supply.",
    imageUrl: "/placeholder.svg?height=400&width=600",
    sourceUrl: "https://vanguardngr.com/politics/government-announces-infrastructure-projects",
    sourceName: "Vanguard",
    category: "politics",
    publishedAt: new Date(Date.now() - 39600000).toISOString(), // 11 hours ago
  },
  {
    id: "12",
    title: "Nigerian Football Club Advances to Continental Championship",
    summary:
      "A Nigerian football club has advanced to the finals of a continental championship, bringing pride to Nigerian sports fans.",
    imageUrl: "/placeholder.svg?height=400&width=600",
    sourceUrl: "https://premiumtimesng.com/sports/football-club-advances-to-championship",
    sourceName: "Premium Times",
    category: "sports",
    publishedAt: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
  },
  {
    id: "13",
    title: "Nollywood Announces International Collaboration with Hollywood",
    summary:
      "The Nigerian film industry has announced a major collaboration with Hollywood studios to produce international-standard films.",
    imageUrl: "/placeholder.svg?height=400&width=600",
    sourceUrl: "https://guardian.ng/entertainment/nollywood-announces-hollywood-collaboration",
    sourceName: "The Guardian",
    category: "entertainment",
    publishedAt: new Date(Date.now() - 46800000).toISOString(), // 13 hours ago
  },
  {
    id: "14",
    title: "Nigerian Tech Innovators Showcase Solutions at Global Conference",
    summary:
      "Nigerian technology innovators have showcased their solutions at a global technology conference, attracting international attention.",
    imageUrl: "/placeholder.svg?height=400&width=600",
    sourceUrl: "https://punchng.com/tech/nigerian-innovators-at-global-conference",
    sourceName: "Punch",
    category: "tech",
    publishedAt: new Date(Date.now() - 50400000).toISOString(), // 14 hours ago
  },
  {
    id: "15",
    title: "Nigerian Banks Report Strong Quarterly Earnings",
    summary:
      "Major Nigerian banks have reported strong quarterly earnings, indicating resilience in the financial sector despite economic challenges.",
    imageUrl: "/placeholder.svg?height=400&width=600",
    sourceUrl: "https://vanguardngr.com/business/banks-report-strong-earnings",
    sourceName: "Vanguard",
    category: "business",
    publishedAt: new Date(Date.now() - 54000000).toISOString(), // 15 hours ago
  },
  // CNN Africa mock news
  {
    id: "16",
    title: "African Leaders Meet to Discuss Continental Free Trade Agreement",
    summary:
      "Leaders from across Africa have gathered to discuss the implementation of the African Continental Free Trade Agreement (AfCFTA).",
    imageUrl: "/placeholder.svg?height=400&width=600",
    sourceUrl: "https://edition.cnn.com/africa/african-leaders-meet-to-discuss-free-trade",
    sourceName: "CNN Africa",
    category: "politics",
    publishedAt: new Date(Date.now() - 5400000).toISOString(), // 1.5 hours ago
  },
  {
    id: "17",
    title: "New Study Shows Rapid Growth in African Tech Ecosystem",
    summary:
      "A new study by CNN Africa reveals the rapid growth of technology startups across the continent, with Nigeria leading the way.",
    imageUrl: "/placeholder.svg?height=400&width=600",
    sourceUrl: "https://edition.cnn.com/africa/rapid-growth-in-african-tech-ecosystem",
    sourceName: "CNN Africa",
    category: "tech",
    publishedAt: new Date(Date.now() - 9000000).toISOString(), // 2.5 hours ago
  },
  // BBC Pidgin mock news
  {
    id: "18",
    title: "How Nigeria New Minimum Wage Go Affect Workers",
    summary:
      "BBC Pidgin don look how di new minimum wage wey Nigeria government approve go affect workers for di kontri.",
    imageUrl: "/placeholder.svg?height=400&width=600",
    sourceUrl: "https://www.bbc.com/pidgin/articles/nigeria-new-minimum-wage",
    sourceName: "BBC Pidgin",
    category: "business",
    publishedAt: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
  },
  {
    id: "19",
    title: "Afrobeats Stars Wey Dey Dominate Global Music Charts",
    summary: "See di Nigerian Afrobeats stars wey dey make waves for international music charts with dia latest songs.",
    imageUrl: "/placeholder.svg?height=400&width=600",
    sourceUrl: "https://www.bbc.com/pidgin/articles/afrobeats-stars-global-charts",
    sourceName: "BBC Pidgin",
    category: "entertainment",
    publishedAt: new Date(Date.now() - 10800000).toISOString(), // 3 hours ago
  },
  // ThisDay mock news
  {
    id: "20",
    title: "Nigeria's Oil Production Increases by 20% in Q2",
    summary:
      "Nigeria has recorded a significant increase in oil production in the second quarter of the year, according to NNPC reports.",
    imageUrl: "/placeholder.svg?height=400&width=600",
    sourceUrl: "https://www.thisdaylive.com/index.php/2023/07/15/nigerias-oil-production-increases",
    sourceName: "ThisDay",
    category: "business",
    publishedAt: new Date(Date.now() - 14400000).toISOString(), // 4 hours ago
  },
  // Daily Trust mock news
  {
    id: "21",
    title: "Northern Governors Forum Addresses Security Challenges",
    summary:
      "The Northern Governors Forum has met to address the security challenges facing the northern region of Nigeria.",
    imageUrl: "/placeholder.svg?height=400&width=600",
    sourceUrl: "https://dailytrust.com/northern-governors-forum-addresses-security-challenges",
    sourceName: "Daily Trust",
    category: "politics",
    publishedAt: new Date(Date.now() - 18000000).toISOString(), // 5 hours ago
  },
]
