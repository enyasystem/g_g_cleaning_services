"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { AlertTriangle } from "lucide-react"
import { fetchAllNews } from "@/lib/news-scraper"

export default function BreakingNewsBar() {
  const [news, setNews] = useState<any[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Fetch news headlines in real time (poll every 60 seconds)
  useEffect(() => {
    let isMounted = true
    const fetchNews = async () => {
      try {
        const allNews = await fetchAllNews()
        // Sort by publishedAt (latest first)
        const sorted = allNews
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

  return (
    <div className="bg-breaking-news text-white py-2 overflow-hidden">
      <div className="container flex items-center">
        <div className="flex items-center mr-4 font-bold whitespace-nowrap">
          <AlertTriangle className="h-4 w-4 mr-2" />
          BREAKING NEWS
        </div>
        <div className="overflow-hidden relative flex-1">
          <div className="animate-fade-in" key={current.id}>
            <Link href={current.sourceUrl || "#"} className="hover:underline">
              {current.title}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
