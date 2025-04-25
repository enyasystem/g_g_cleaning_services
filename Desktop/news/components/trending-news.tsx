import { Clock, ExternalLink, TrendingUp } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

import { fetchTrendingNews } from "@/lib/news-fetcher"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export default async function TrendingNews() {
  const trendingNews = await fetchTrendingNews(3)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {trendingNews.map((news) => {
        const formattedDate = formatDistanceToNow(new Date(news.publishedAt), { addSuffix: true })
        const categoryColor = getCategoryColor(news.category)

        return (
          <Card key={news.id} className="hover:shadow-md transition-shadow duration-300">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge
                  className={`bg-${categoryColor} hover:bg-${categoryColor} text-white font-semibold px-2 py-0.5 text-xs uppercase tracking-wider`}
                >
                  {news.category.charAt(0).toUpperCase() + news.category.slice(1)}
                </Badge>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="mr-1 h-3 w-3" />
                  {formattedDate}
                </div>
                <TrendingUp className="h-3 w-3 text-red-500 ml-auto" />
              </div>
              <h3 className="font-semibold line-clamp-2 mb-2 hover:text-news-primary transition-colors">
                {news.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{news.summary}</p>
              <div className="flex items-center justify-between pt-2 border-t text-xs">
                <span className="text-muted-foreground">{news.sourceName}</span>
                <a
                  href={news.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium flex items-center text-news-primary hover:underline"
                >
                  Read more <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

// Helper function to get category color
function getCategoryColor(category: string): string {
  switch (category.toLowerCase()) {
    case "politics":
      return "politics"
    case "entertainment":
      return "entertainment"
    case "sports":
      return "sports"
    case "tech":
      return "tech"
    case "business":
      return "business"
    default:
      return "news-primary"
  }
}
