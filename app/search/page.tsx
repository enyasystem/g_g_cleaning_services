import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import FilterBar from "@/components/filter-bar"
import { searchNews } from "@/lib/news-fetcher"
import NewsCard from "@/components/news-card"

export function generateMetadata({ searchParams }: { searchParams: { q: string } }) {
  const query = searchParams.q || ""

  return {
    title: `Search: ${query} - NaijaNews`,
    description: `Search results for "${query}" from Nigeria's top news sources.`,
  }
}

export default async function SearchPage({ searchParams }: { searchParams: { q: string } }) {
  const query = searchParams.q || ""

  if (!query) {
    return (
      <div className="container py-6 md:py-8">
        <div className="mb-6">
          <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
            <ChevronLeft className="mr-1 h-4 w-4" /> Back to Home
          </Link>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Search</h1>
          <p className="text-muted-foreground">Please enter a search term to find news articles.</p>
        </div>
      </div>
    )
  }

  const results = await searchNews(query)

  return (
    <div className="container py-6 md:py-8">
      <div className="mb-6">
        <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
          <ChevronLeft className="mr-1 h-4 w-4" /> Back to Home
        </Link>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Search Results</h1>
        <p className="text-muted-foreground">Showing results for "{query}"</p>
      </div>

      <div className="mb-8">
        <FilterBar />
      </div>

      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.map((item) => (
            <NewsCard key={item.id} news={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">No results found</h2>
          <p className="text-muted-foreground mb-6">We couldn't find any news articles matching your search term.</p>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1"
          >
            Back to Home
          </Link>
        </div>
      )}
    </div>
  )
}
