import NewsCard from "@/components/news-card"
import { fetchNewsByCategory } from "@/lib/news-fetcher"

interface NewsGridProps {
  category: string
  limit?: number
  columns?: 2 | 3 | 4
}

export default async function NewsGrid({ category, limit = 8, columns = 4 }: NewsGridProps) {
  const news = await fetchNewsByCategory(category, limit)

  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  }

  return (
    <div className={`grid ${gridCols[columns]} gap-6`}>
      {news.map((item) => (
        <NewsCard key={item.id} news={item} />
      ))}
    </div>
  )
}
