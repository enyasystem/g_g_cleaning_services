"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface SearchBarProps {
  fullWidth?: boolean
}

export default function SearchBar({ fullWidth = false }: SearchBarProps) {
  const [query, setQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <form onSubmit={handleSearch} className={`relative ${fullWidth ? "w-full" : "w-full max-w-sm"}`}>
      <Input
        type="search"
        placeholder="Search news..."
        className="w-full pr-10 border-news-primary focus-visible:ring-news-highlight"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button
        type="submit"
        variant="ghost"
        size="icon"
        className="absolute right-0 top-0 h-full text-news-primary hover:text-news-highlight hover:bg-transparent"
        aria-label="Search"
      >
        <Search className="h-4 w-4" />
      </Button>
    </form>
  )
}
