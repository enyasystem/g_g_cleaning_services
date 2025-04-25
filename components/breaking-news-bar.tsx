"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { AlertTriangle } from "lucide-react"
import { MOCK_NEWS } from "@/lib/news-scraper"

export default function BreakingNewsBar() {
  const [breakingNews, setBreakingNews] = useState([
    {
      id: "1",
      title: "BREAKING: Nigerian Government Announces New Economic Policy",
      link: "/politics/nigerian-government-announces-new-economic-policy",
    },
    {
      id: "2",
      title: "Super Eagles Win Critical Match Against Ghana",
      link: "/sports/super-eagles-win-critical-match-against-ghana",
    },
    {
      id: "3",
      title: "Lagos State Implements New Transportation System",
      link: "/news/lagos-state-implements-new-transportation-system",
    },
  ])

  const [currentNewsIndex, setCurrentNewsIndex] = useState(0)

  useEffect(() => {
    // In a real app, you would fetch breaking news from an API
    // For now, we'll use mock data
    const fetchBreakingNews = async () => {
      try {
        // Use the mock news for breaking news in preview
        const latestNews = MOCK_NEWS.slice(0, 5).map((news) => ({
          id: news.id,
          title: news.title,
          link: news.sourceUrl,
          source: news.sourceName,
        }))

        setBreakingNews(latestNews)
      } catch (error) {
        console.error("Error fetching breaking news:", error)
      }
    }

    fetchBreakingNews()

    const interval = setInterval(() => {
      setCurrentNewsIndex((prevIndex) => (prevIndex + 1) % breakingNews.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [breakingNews.length])

  return (
    <div className="bg-breaking-news text-white py-2 overflow-hidden">
      <div className="container flex items-center">
        <div className="flex items-center mr-4 font-bold whitespace-nowrap">
          <AlertTriangle className="h-4 w-4 mr-2" />
          BREAKING NEWS
        </div>
        <div className="overflow-hidden relative flex-1">
          <div className="animate-fade-in" key={breakingNews[currentNewsIndex]?.id}>
            <Link href={breakingNews[currentNewsIndex]?.link || "#"} className="hover:underline">
              {breakingNews[currentNewsIndex]?.title}
            </Link>
            {breakingNews[currentNewsIndex]?.source && (
              <span className="ml-2 text-xs opacity-75">Source: {breakingNews[currentNewsIndex].source}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
