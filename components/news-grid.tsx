import NewsCard from "@/components/news-card"
import { fetchNewsByCategory } from "@/lib/news-fetcher"

interface NewsGridProps {
  category: string
  limit?: number
}

export default async function NewsGrid({ category, limit = 8 }: NewsGridProps) {
  const news = await fetchNewsByCategory(category, limit)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {news.map((item) => (
        <NewsCard key={item.id} news={item} />
      ))}
    </div>
  )
}
