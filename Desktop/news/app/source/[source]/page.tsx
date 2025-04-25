import { Suspense } from "react"
import { notFound } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"
import FilterBar from "@/components/filter-bar"
import { fetchNewsBySource } from "@/lib/news-fetcher"

// Map of source slugs to display names
const sourceMap: Record<string, string> = {
  guardian: "The Guardian Nigeria",
  punch: "Punch",
  vanguard: "Vanguard",
  "premium-times": "Premium Times",
  "channels-tv": "Channels TV",
  cnn: "CNN Africa",
  "bbc-pidgin": "BBC Pidgin",
  thisday: "ThisDay",
  "daily-trust": "Daily Trust",
}

export function generateMetadata({ params }: { params: { source: string } }) {
  const source = params.source
  const sourceName = sourceMap[source] || source.charAt(0).toUpperCase() + source.slice(1).replace(/-/g, " ")

  return {
    title: `${sourceName} News - NaijaNews`,
    description: `Latest news from ${sourceName}.`,
    openGraph: {
      title: `${sourceName} News - NaijaNews`,
      description: `Latest news from ${sourceName}.`,
      type: "website",
      url: `https://naijanews.com/source/${source}`,
    },
  }
}

export default async function SourcePage({ params }: { params: { source: string } }) {
  const { source } = params

  // Get source display name
  const sourceName = sourceMap[source] || source.charAt(0).toUpperCase() + source.slice(1).replace(/-/g, " ")

  // Fetch news for this source
  const news = await fetchNewsBySource(sourceName, 12)

  if (news.length === 0) {
    notFound()
  }

  return (
    <div className="container py-6 md:py-8">
      <div className="mb-6">
        <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
          <ChevronLeft className="mr-1 h-4 w-4" /> Back to Home
        </Link>
        <h1 className="text-3xl font-bold tracking-tight mb-2">{sourceName} News</h1>
        <p className="text-muted-foreground">Latest news from {sourceName}.</p>
      </div>

      <div className="mb-8">
        <FilterBar />
      </div>

      <Suspense fallback={<NewsGridSkeleton />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {news.map((item) => (
            <NewsCard key={item.id} news={item} />
          ))}
        </div>
      </Suspense>
    </div>
  )
}

function NewsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array(12)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            <Skeleton className="h-48 w-full rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <div className="flex items-center gap-2 mt-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
        ))}
    </div>
  )
}

import NewsCard from "@/components/news-card"
