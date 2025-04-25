import { Clock, ExternalLink } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

import { fetchTrendingNews } from "@/lib/news-fetcher"
import { Badge } from "@/components/ui/badge"

export default async function TrendingNews() {
  const trendingNews = await fetchTrendingNews(3)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {trendingNews.map((news) => {
        const formattedDate = formatDistanceToNow(new Date(news.publishedAt), { addSuffix: true })

        return (
          <div key={news.id} className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {news.category.charAt(0).toUpperCase() + news.category.slice(1)}
              </Badge>
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="mr-1 h-3 w-3" />
                {formattedDate}
              </div>
            </div>
            <h3 className="font-semibold line-clamp-2">{news.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{news.summary}</p>
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-muted-foreground">{news.sourceName}</span>
              <a
                href={news.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium flex items-center hover:underline"
              >
                Read more <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </div>
          </div>
        )
      })}
    </div>
  )
}
