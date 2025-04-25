"use client"

import { useState } from "react"
import Image from "next/image"
import { formatDistanceToNow } from "date-fns"
import { Bookmark, Share2, Clock, ExternalLink } from "lucide-react"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "@/components/ui/use-toast"

export interface NewsItem {
  id: string
  title: string
  summary: string
  imageUrl: string
  sourceUrl: string
  sourceName: string
  category: string
  publishedAt: string
}

interface NewsCardProps {
  news: NewsItem
  featured?: boolean
}

export default function NewsCard({ news, featured = false }: NewsCardProps) {
  const [bookmarked, setBookmarked] = useState(false)

  const handleBookmark = () => {
    setBookmarked(!bookmarked)
    toast({
      title: bookmarked ? "Removed from bookmarks" : "Added to bookmarks",
      description: bookmarked
        ? "The article has been removed from your bookmarks"
        : "The article has been saved to your bookmarks",
    })
  }

  const handleShare = (platform: string) => {
    let shareUrl = ""

    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(news.sourceUrl)}&text=${encodeURIComponent(
          news.title,
        )}`
        break
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(news.sourceUrl)}`
        break
      case "whatsapp":
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(news.title + " " + news.sourceUrl)}`
        break
      default:
        // Copy to clipboard
        navigator.clipboard.writeText(news.sourceUrl)
        toast({
          title: "Link copied",
          description: "The article link has been copied to your clipboard",
        })
        return
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank")
    }
  }

  const formattedDate = formatDistanceToNow(new Date(news.publishedAt), { addSuffix: true })
  const categoryColor = getCategoryColor(news.category)

  if (featured) {
    return (
      <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative h-64 md:h-full">
            <div className={`absolute top-0 left-0 w-full h-full bg-${categoryColor} opacity-50 z-10`}></div>
            <Image
              src={news.imageUrl || "/placeholder.svg"}
              alt={news.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute top-4 left-4 z-20">
              <Badge
                className={`bg-${categoryColor} hover:bg-${categoryColor} text-white font-semibold px-3 py-1 text-xs uppercase tracking-wider`}
              >
                {news.category.charAt(0).toUpperCase() + news.category.slice(1)}
              </Badge>
            </div>
          </div>
          <div className="p-6 flex flex-col bg-white dark:bg-gray-900">
            <div className="mb-2 flex items-center text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              <span className="text-xs">{formattedDate}</span>
            </div>
            <h2 className="text-2xl font-bold mb-3 line-clamp-3 hover:text-news-primary transition-colors">
              {news.title}
            </h2>
            <p className="text-muted-foreground mb-4 line-clamp-3">{news.summary}</p>
            <div className="mt-auto flex items-center justify-between">
              <a
                href={news.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium flex items-center text-news-primary hover:underline"
              >
                Read full story <ExternalLink className="ml-1 h-3 w-3" />
              </a>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleBookmark}
                  aria-label={bookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
                  className="hover:text-news-primary"
                >
                  <Bookmark className={`h-5 w-5 ${bookmarked ? "fill-current text-news-primary" : ""}`} />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" aria-label="Share" className="hover:text-news-primary">
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleShare("twitter")}>Share on Twitter</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleShare("facebook")}>Share on Facebook</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleShare("whatsapp")}>Share on WhatsApp</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleShare("copy")}>Copy link</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden h-full flex flex-col hover:shadow-md transition-shadow duration-300 border-t-4 border-t-news-primary">
      <div className="relative h-48">
        <Image
          src={news.imageUrl || "/placeholder.svg"}
          alt={news.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        <div className="absolute top-2 left-2">
          <Badge
            className={`bg-${categoryColor} hover:bg-${categoryColor} text-white font-semibold px-2 py-0.5 text-xs uppercase tracking-wider`}
          >
            {news.category.charAt(0).toUpperCase() + news.category.slice(1)}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4 flex-grow">
        <h3 className="font-semibold mb-2 line-clamp-2 hover:text-news-primary transition-colors">{news.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{news.summary}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between border-t mt-auto">
        <div className="flex items-center text-xs text-muted-foreground">
          <Clock className="h-3 w-3 mr-1" />
          <span>{formattedDate}</span>
          <span className="mx-2">•</span>
          <span>{news.sourceName}</span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:text-news-primary"
            onClick={handleBookmark}
            aria-label={bookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
          >
            <Bookmark className={`h-4 w-4 ${bookmarked ? "fill-current text-news-primary" : ""}`} />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-news-primary" aria-label="Share">
                <Share2 className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleShare("twitter")}>Share on Twitter</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleShare("facebook")}>Share on Facebook</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleShare("whatsapp")}>Share on WhatsApp</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleShare("copy")}>Copy link</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardFooter>
    </Card>
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
