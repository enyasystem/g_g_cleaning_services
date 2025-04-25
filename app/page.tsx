import { Suspense } from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import NewsGrid from "@/components/news-grid"
import FeaturedNews from "@/components/featured-news"
import CategoryTabs from "@/components/category-tabs"
import TrendingNews from "@/components/trending-news"
import SearchBar from "@/components/search-bar"
import { Skeleton } from "@/components/ui/skeleton"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold">NaijaNews</span>
            </Link>
          </div>
          <div className="hidden md:flex md:w-1/3">
            <SearchBar />
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/politics" className="text-sm font-medium hover:underline underline-offset-4">
              Politics
            </Link>
            <Link href="/entertainment" className="text-sm font-medium hover:underline underline-offset-4">
              Entertainment
            </Link>
            <Link href="/sports" className="text-sm font-medium hover:underline underline-offset-4">
              Sports
            </Link>
            <Link href="/tech" className="text-sm font-medium hover:underline underline-offset-4">
              Tech
            </Link>
            <Link href="/business" className="text-sm font-medium hover:underline underline-offset-4">
              Business
            </Link>
          </nav>
          <div className="md:hidden">
            <SearchBar />
          </div>
        </div>
      </header>
      <main className="container py-6 md:py-8">
        <div className="md:hidden mb-6">
          <CategoryTabs />
        </div>

        <section className="mb-12">
          <Suspense fallback={<div className="h-[400px] w-full rounded-lg bg-muted animate-pulse" />}>
            <FeaturedNews />
          </Suspense>
        </section>

        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold tracking-tight">Top Trending in Nigeria</h2>
            <Link href="/trending" className="flex items-center text-sm text-muted-foreground hover:text-primary">
              See all <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <Suspense fallback={<TrendingNewsSkeleton />}>
            <TrendingNews />
          </Suspense>
        </section>

        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold tracking-tight">Latest Politics</h2>
            <Link href="/politics" className="flex items-center text-sm text-muted-foreground hover:text-primary">
              See all <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <Suspense fallback={<NewsGridSkeleton />}>
            <NewsGrid category="politics" limit={4} />
          </Suspense>
        </section>

        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold tracking-tight">Entertainment News</h2>
            <Link href="/entertainment" className="flex items-center text-sm text-muted-foreground hover:text-primary">
              See all <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <Suspense fallback={<NewsGridSkeleton />}>
            <NewsGrid category="entertainment" limit={4} />
          </Suspense>
        </section>

        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold tracking-tight">Sports Updates</h2>
            <Link href="/sports" className="flex items-center text-sm text-muted-foreground hover:text-primary">
              See all <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <Suspense fallback={<NewsGridSkeleton />}>
            <NewsGrid category="sports" limit={4} />
          </Suspense>
        </section>
      </main>
      <footer className="border-t bg-background">
        <div className="container py-8 md:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">NaijaNews</h3>
              <p className="text-sm text-muted-foreground">
                Your one-stop platform for all Nigerian news from trusted sources.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/politics" className="text-sm text-muted-foreground hover:text-primary">
                    Politics
                  </Link>
                </li>
                <li>
                  <Link href="/entertainment" className="text-sm text-muted-foreground hover:text-primary">
                    Entertainment
                  </Link>
                </li>
                <li>
                  <Link href="/sports" className="text-sm text-muted-foreground hover:text-primary">
                    Sports
                  </Link>
                </li>
                <li>
                  <Link href="/tech" className="text-sm text-muted-foreground hover:text-primary">
                    Tech
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Sources</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://guardian.ng"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    The Guardian Nigeria
                  </a>
                </li>
                <li>
                  <a
                    href="https://punchng.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Punch
                  </a>
                </li>
                <li>
                  <a
                    href="https://vanguardngr.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Vanguard
                  </a>
                </li>
                <li>
                  <a
                    href="https://premiumtimesng.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Premium Times
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/disclaimer" className="text-sm text-muted-foreground hover:text-primary">
                    Disclaimer
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} NaijaNews. All rights reserved.
            </p>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <Button variant="ghost" size="icon" aria-label="Facebook">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </Button>
              <Button variant="ghost" size="icon" aria-label="Twitter">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </Button>
              <Button variant="ghost" size="icon" aria-label="Instagram">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function TrendingNewsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {Array(3)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
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

function NewsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array(4)
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
