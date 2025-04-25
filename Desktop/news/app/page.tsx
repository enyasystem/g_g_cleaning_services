import { Suspense } from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import NewsGrid from "@/components/news-grid"
import FeaturedNews from "@/components/featured-news"
import CategoryTabs from "@/components/category-tabs"
import TrendingNews from "@/components/trending-news"
import { Skeleton } from "@/components/ui/skeleton"
import SiteHeader from "@/components/site-header"
import WeatherWidget from "@/components/weather-widget"
import CurrencyWidget from "@/components/currency-widget"
import NewsSources from "@/components/news-sources"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <SiteHeader />

      <main className="container py-6 md:py-8">
        <div className="md:hidden mb-6">
          <CategoryTabs />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-3">
            <section className="mb-8">
              <Suspense fallback={<div className="h-[400px] w-full rounded-lg bg-muted animate-pulse" />}>
                <FeaturedNews />
              </Suspense>
            </section>
          </div>

          <div className="space-y-6">
            <WeatherWidget />
            <CurrencyWidget />
            <div className="bg-news-primary text-white p-4 rounded-lg">
              <h3 className="font-bold mb-2">Subscribe to Our Newsletter</h3>
              <p className="text-sm mb-4">Get the latest news delivered to your inbox daily.</p>
              <div className="flex gap-2">
                <input type="email" placeholder="Your email" className="px-3 py-2 rounded text-black text-sm flex-1" />
                <Button size="sm" className="bg-white text-news-primary hover:bg-gray-100">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        <section className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold tracking-tight text-news-primary">Top Trending in Nigeria</h2>
            <Link href="/trending" className="flex items-center text-sm text-news-primary hover:underline">
              See all <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <Suspense fallback={<TrendingNewsSkeleton />}>
            <TrendingNews />
          </Suspense>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold tracking-tight text-politics">Politics</h2>
              <Link href="/politics" className="flex items-center text-sm text-politics hover:underline">
                See all <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <Suspense fallback={<NewsGridSkeleton count={2} />}>
              <NewsGrid category="politics" limit={2} />
            </Suspense>
          </section>

          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold tracking-tight text-business">Business</h2>
              <Link href="/business" className="flex items-center text-sm text-business hover:underline">
                See all <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <Suspense fallback={<NewsGridSkeleton count={2} />}>
              <NewsGrid category="business" limit={2} />
            </Suspense>
          </section>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold tracking-tight text-entertainment">Entertainment</h2>
              <Link href="/entertainment" className="flex items-center text-sm text-entertainment hover:underline">
                See all <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <Suspense fallback={<NewsGridSkeleton count={2} />}>
              <NewsGrid category="entertainment" limit={2} />
            </Suspense>
          </section>

          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold tracking-tight text-sports">Sports</h2>
              <Link href="/sports" className="flex items-center text-sm text-sports hover:underline">
                See all <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <Suspense fallback={<NewsGridSkeleton count={2} />}>
              <NewsGrid category="sports" limit={2} />
            </Suspense>
          </section>

          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold tracking-tight text-tech">Technology</h2>
              <Link href="/tech" className="flex items-center text-sm text-tech hover:underline">
                See all <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <Suspense fallback={<NewsGridSkeleton count={2} />}>
              <NewsGrid category="tech" limit={2} />
            </Suspense>
          </section>
        </div>

        <section className="mb-12">
          <NewsSources />
        </section>
      </main>

      <footer className="bg-news-primary text-white">
        <div className="container py-8 md:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">NaijaNews</h3>
              <p className="text-sm text-gray-200">
                Your one-stop platform for all Nigerian news from trusted sources.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/politics" className="text-sm text-gray-200 hover:text-white">
                    Politics
                  </Link>
                </li>
                <li>
                  <Link href="/entertainment" className="text-sm text-gray-200 hover:text-white">
                    Entertainment
                  </Link>
                </li>
                <li>
                  <Link href="/sports" className="text-sm text-gray-200 hover:text-white">
                    Sports
                  </Link>
                </li>
                <li>
                  <Link href="/tech" className="text-sm text-gray-200 hover:text-white">
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
                    className="text-sm text-gray-200 hover:text-white"
                  >
                    The Guardian Nigeria
                  </a>
                </li>
                <li>
                  <a
                    href="https://punchng.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-200 hover:text-white"
                  >
                    Punch
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.bbc.com/pidgin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-200 hover:text-white"
                  >
                    BBC Pidgin
                  </a>
                </li>
                <li>
                  <a
                    href="https://edition.cnn.com/africa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-200 hover:text-white"
                  >
                    CNN Africa
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/terms" className="text-sm text-gray-200 hover:text-white">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-sm text-gray-200 hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/disclaimer" className="text-sm text-gray-200 hover:text-white">
                    Disclaimer
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-200">© {new Date().getFullYear()} NaijaNews. All rights reserved.</p>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <Button variant="ghost" size="icon" className="text-white hover:bg-news-highlight">
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
              <Button variant="ghost" size="icon" className="text-white hover:bg-news-highlight">
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
              <Button variant="ghost" size="icon" className="text-white hover:bg-news-highlight">
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

function NewsGridSkeleton({ count = 4 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {Array(count)
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
