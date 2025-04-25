import type { NewsItem } from "@/components/news-card"

// Mock data for demonstration purposes
// In a real application, this would fetch from your API endpoints

const mockNews: NewsItem[] = [
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
]

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function fetchNewsByCategory(category: string, limit = 8): Promise<NewsItem[]> {
  // Simulate API call
  await delay(500)

  if (category === "trending") {
    return mockNews
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, limit)
  }

  return mockNews
    .filter((news) => news.category === category)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit)
}

export async function fetchFeaturedNews(): Promise<NewsItem> {
  // Simulate API call
  await delay(700)

  // Return the most recent news item as featured
  return mockNews.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())[0]
}

export async function fetchTrendingNews(limit = 3): Promise<NewsItem[]> {
  // Simulate API call
  await delay(600)

  // In a real app, this would use some algorithm to determine trending news
  // For now, we'll just return the most recent news
  return mockNews.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()).slice(0, limit)
}

export async function searchNews(query: string, limit = 10): Promise<NewsItem[]> {
  // Simulate API call
  await delay(800)

  const lowercaseQuery = query.toLowerCase()

  return mockNews
    .filter(
      (news) =>
        news.title.toLowerCase().includes(lowercaseQuery) || news.summary.toLowerCase().includes(lowercaseQuery),
    )
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit)
}
