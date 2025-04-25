"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function FilterBar() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [source, setSource] = useState(searchParams.get("source") || "all")
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "newest")
  const [timeframe, setTimeframe] = useState(searchParams.get("time") || "all")

  const sources = [
    { value: "all", label: "All Sources" },
    { value: "guardian", label: "The Guardian Nigeria" },
    { value: "punch", label: "Punch" },
    { value: "vanguard", label: "Vanguard" },
    { value: "premium-times", label: "Premium Times" },
    { value: "channels-tv", label: "Channels TV" },
  ]

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "trending", label: "Trending" },
  ]

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams)

    if (source && source !== "all") {
      params.set("source", source)
    } else {
      params.delete("source")
    }

    if (sortBy && sortBy !== "newest") {
      params.set("sort", sortBy)
    } else {
      params.delete("sort")
    }

    if (timeframe && timeframe !== "all") {
      params.set("time", timeframe)
    } else {
      params.delete("time")
    }

    router.push(`${window.location.pathname}?${params.toString()}`)
  }

  return (
    <div className="flex items-center justify-between">
      <div className="hidden md:flex items-center gap-4">
        <Select value={source} onValueChange={setSource}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select source" />
          </SelectTrigger>
          <SelectContent>
            {sources.map((source) => (
              <SelectItem key={source.value} value={source.value}>
                {source.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button onClick={applyFilters}>Apply Filters</Button>
      </div>

      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Filter className="h-4 w-4" /> Filters
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filter News</SheetTitle>
              <SheetDescription>Customize your news feed with these filters.</SheetDescription>
            </SheetHeader>
            <div className="py-4 space-y-6">
              <div className="space-y-2">
                <Label>Source</Label>
                <Select value={source} onValueChange={setSource}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select source" />
                  </SelectTrigger>
                  <SelectContent>
                    {sources.map((source) => (
                      <SelectItem key={source.value} value={source.value}>
                        {source.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Sort By</Label>
                <RadioGroup value={sortBy} onValueChange={setSortBy}>
                  {sortOptions.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label htmlFor={option.value}>{option.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Time Frame</Label>
                <RadioGroup value={timeframe} onValueChange={setTimeframe}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="all-time" />
                    <Label htmlFor="all-time">All Time</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="today" id="today" />
                    <Label htmlFor="today">Today</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="week" id="week" />
                    <Label htmlFor="week">This Week</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="month" id="month" />
                    <Label htmlFor="month">This Month</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            <SheetFooter>
              <Button
                onClick={() => {
                  applyFilters()
                  document.querySelector("[data-radix-collection-item]")?.click()
                }}
              >
                Apply Filters
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      <div className="text-sm text-muted-foreground">
        Showing results from {source === "all" ? "all sources" : sources.find((s) => s.value === source)?.label}
      </div>
    </div>
  )
}
