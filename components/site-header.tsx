"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Search, Sun, Moon, Bell, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useTheme } from "next-themes"
import SearchBar from "@/components/search-bar"
import BreakingNewsBar from "@/components/breaking-news-bar"
import { toast } from "@/components/ui/use-toast"

export default function SiteHeader() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    if (mounted) {
      setTheme(theme === "dark" ? "light" : "dark")
    }
  }

  const toggleSearch = () => {
    setShowSearch(!showSearch)
  }

  const refreshNews = async () => {
    if (refreshing) return

    setRefreshing(true)
    try {
      // In a real app, you would call the refresh API with proper authentication
      // For now, we'll just simulate a refresh
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "News refreshed",
        description: "The latest news has been fetched from all sources.",
      })
    } catch (error) {
      toast({
        title: "Refresh failed",
        description: "Failed to refresh news. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setRefreshing(false)
    }
  }

  const mainCategories = [
    { name: "Politics", href: "/politics", color: "politics" },
    { name: "Entertainment", href: "/entertainment", color: "entertainment" },
    { name: "Sports", href: "/sports", color: "sports" },
    { name: "Tech", href: "/tech", color: "tech" },
    { name: "Business", href: "/business", color: "business" },
  ]

  const newsSources = [
    { name: "The Guardian", href: "/source/guardian" },
    { name: "Punch", href: "/source/punch" },
    { name: "Vanguard", href: "/source/vanguard" },
    { name: "Premium Times", href: "/source/premium-times" },
    { name: "Channels TV", href: "/source/channels-tv" },
    { name: "CNN Africa", href: "/source/cnn" },
    { name: "BBC Pidgin", href: "/source/bbc-pidgin" },
    { name: "ThisDay", href: "/source/thisday" },
    { name: "Daily Trust", href: "/source/daily-trust" },
  ]

  return (
    <header className="w-full">
      {/* Top bar with logo and actions */}
      <div className="bg-news-primary text-white">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold tracking-tighter">NaijaNews</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={refreshNews}
              className="text-white hover:bg-news-highlight"
              disabled={refreshing}
            >
              <RefreshCw className={`h-5 w-5 ${refreshing ? "animate-spin" : ""}`} />
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleSearch} className="text-white hover:bg-news-highlight">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-white hover:bg-news-highlight">
              {mounted && theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-news-highlight">
              <Bell className="h-5 w-5" />
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-news-highlight">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col gap-4 mt-8">
                  {mainCategories.map((category) => (
                    <Link
                      key={category.name}
                      href={category.href}
                      className={`text-lg font-medium hover:text-${category.color} transition-colors`}
                    >
                      {category.name}
                    </Link>
                  ))}
                  <Link href="/trending" className="text-lg font-medium hover:text-news-highlight transition-colors">
                    Trending
                  </Link>

                  <div className="mt-4 pt-4 border-t">
                    <h3 className="font-semibold mb-2">News Sources</h3>
                    {newsSources.map((source) => (
                      <Link
                        key={source.name}
                        href={source.href}
                        className="block text-sm py-1 hover:text-news-highlight transition-colors"
                      >
                        {source.name}
                      </Link>
                    ))}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Search bar (conditionally rendered) */}
      {showSearch && (
        <div className="bg-gray-100 dark:bg-gray-800 py-3 animate-fade-in">
          <div className="container">
            <SearchBar fullWidth />
          </div>
        </div>
      )}

      {/* Breaking news ticker */}
      <BreakingNewsBar />

      {/* Navigation bar */}
      <nav className="bg-white dark:bg-gray-900 border-b shadow-sm">
        <div className="container hidden md:flex items-center h-12">
          {mainCategories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className={`px-4 h-full flex items-center font-medium text-sm hover:bg-${category.color} hover:text-white transition-colors ${
                pathname === category.href ? `bg-${category.color} text-white` : ""
              }`}
            >
              {category.name}
            </Link>
          ))}
          <Link
            href="/trending"
            className={`px-4 h-full flex items-center font-medium text-sm hover:bg-news-highlight hover:text-white transition-colors ${
              pathname === "/trending" ? "bg-news-highlight text-white" : ""
            }`}
          >
            Trending
          </Link>
        </div>
      </nav>
    </header>
  )
}
