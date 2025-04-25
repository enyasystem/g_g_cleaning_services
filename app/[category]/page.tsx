import { Suspense } from "react"
import { notFound } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

import NewsGrid from "@/components/news-grid"
import { Skeleton } from "@/components/ui/skeleton"
import FilterBar from "@/components/filter-bar"

// Valid categories
const validCategories = ["politics", "entertainment", "sports", "tech", "business", "trending"]

export function generateMetadata({ params }: { params: { category: string } }) {
  const category = params.category

  if (!validCategories.includes(category)) {
    return {
      title: "Category Not Found - NaijaNews",
      description: "The requested news category could not be found.",
    }
  }

  const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1)

  return {
    title: `${formattedCategory} News - NaijaNews`,
    description: `Latest ${formattedCategory} news from Nigeria's top sources.`,
    openGraph: {
      title: `${formattedCategory} News - NaijaNews`,
      description: `Latest ${formattedCategory} news from Nigeria's top sources.`,
      type: "website",
      url: `https://naijanews.com/${category}`,
    },
  }
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const { category } = params

  // Check if category is valid
  if (!validCategories.includes(category)) {
    notFound()
  }

  const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1)

  return (
    <div className="container py-6 md:py-8">
      <div className="mb-6">
        <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
          <ChevronLeft className="mr-1 h-4 w-4" /> Back to Home
        </Link>
        <h1 className="text-3xl font-bold tracking-tight mb-2">{formattedCategory} News</h1>
        <p className="text-muted-foreground">
          Latest {formattedCategory.toLowerCase()} news from Nigeria's top sources.
        </p>
      </div>

      <div className="mb-8">
        <FilterBar />
      </div>

      <Suspense fallback={<NewsGridSkeleton />}>
        <NewsGrid category={category} limit={12} />
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
