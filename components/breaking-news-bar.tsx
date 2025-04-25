"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { AlertTriangle } from "lucide-react"
import { fetchTrendingNews } from "@/lib/news-fetcher"

export default function BreakingNewsBar() {
  const [news, setNews] = useState<any[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Fetch trending news headlines in real time (poll every 60 seconds)
  useEffect(() => {
    let isMounted = true
    const fetchNews = async () => {
      try {
        const trending = await fetchTrendingNews(3)
        // Sort by publishedAt (latest first)
        const sorted = trending
          .filter((n: any) => n.publishedAt)
          .sort((a: any, b: any) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
        if (isMounted) setNews(sorted)
      } catch (error) {
        if (isMounted) setNews([])
      }
    }
    fetchNews()
    const poll = setInterval(fetchNews, 60000)
    return () => {
      isMounted = false
      clearInterval(poll)
    }
  }, [])

  // Cycle through headlines every 5 seconds
  useEffect(() => {
    if (!news.length) return
    intervalRef.current && clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % news.length)
    }, 5000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [news])

  if (!news.length) return null
  const current = news[currentIndex]
  // Ensure we always use the correct link and validate it's a proper URL
  let newsLink = current.sourceUrl || current.link || current.url || "#"
  try {
    // Only allow http(s) links, otherwise fallback to '#'
    const urlObj = new URL(newsLink, window.location.origin)
    if (!(urlObj.protocol === "http:" || urlObj.protocol === "https:")) {
      newsLink = "#"
    }
  } catch {
    newsLink = "#"
  }

  return (
    <div className="bg-breaking-news text-white py-2 overflow-hidden">
      <div className="container flex items-center">
        <div className="flex items-center mr-4 font-bold whitespace-nowrap">
          <AlertTriangle className="h-4 w-4 mr-2" />
          BREAKING NEWS
        </div>
        <div className="overflow-hidden relative flex-1">
          <div className="animate-fade-in" key={current.id}>
            <a
              href={newsLink}
              className="hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {current.title}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
