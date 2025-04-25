"use client"

import { useState } from "react"
import Image from "next/image"
import { formatDistanceToNow } from "date-fns"
import { Bookmark, Share2 } from "lucide-react"

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
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(news.sourceUrl)}&text=${encodeURIComponent(news.title)}`
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

  if (featured) {
    return (
      <Card className="overflow-hidden border-0 shadow-lg">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative h-64 md:h-full">
            <Image
              src={news.imageUrl || "/placeholder.svg"}
              alt={news.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="p-6 flex flex-col">
            <div className="mb-2 flex items-center justify-between">
              <Badge variant="outline" className="text-xs">
                {news.category.charAt(0).toUpperCase() + news.category.slice(1)}
              </Badge>
              <span className="text-xs text-muted-foreground">{formattedDate}</span>
            </div>
            <h2 className="text-2xl font-bold mb-2 line-clamp-3">{news.title}</h2>
            <p className="text-muted-foreground mb-4 line-clamp-3">{news.summary}</p>
            <div className="mt-auto flex items-center justify-between">
              <a
                href={news.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium hover:underline"
              >
                Read on {news.sourceName}
              </a>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleBookmark}
                  aria-label={bookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
                >
                  <Bookmark className={`h-5 w-5 ${bookmarked ? "fill-current" : ""}`} />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" aria-label="Share">
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
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative h-48">
        <Image
          src={news.imageUrl || "/placeholder.svg"}
          alt={news.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        <div className="absolute top-2 left-2">
          <Badge variant="outline" className="bg-background/80 backdrop-blur-sm text-xs">
            {news.category.charAt(0).toUpperCase() + news.category.slice(1)}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4 flex-grow">
        <h3 className="font-semibold mb-2 line-clamp-2">{news.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{news.summary}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-xs text-muted-foreground">{formattedDate}</span>
          <span className="mx-2 text-muted-foreground">•</span>
          <span className="text-xs text-muted-foreground">{news.sourceName}</span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handleBookmark}
            aria-label={bookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
          >
            <Bookmark className={`h-4 w-4 ${bookmarked ? "fill-current" : ""}`} />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Share">
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
