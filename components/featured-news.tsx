import NewsCard from "@/components/news-card"
import { fetchFeaturedNews } from "@/lib/news-fetcher"

export default async function FeaturedNews() {
  const featuredNews = await fetchFeaturedNews()

  if (!featuredNews) {
    return null
  }

  return <NewsCard news={featuredNews} featured />
}
