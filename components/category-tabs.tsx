"use client"

import { useRouter, usePathname } from "next/navigation"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CategoryTabs() {
  const router = useRouter()
  const pathname = usePathname()

  const categories = [
    { value: "/", label: "All", color: "news-primary" },
    { value: "/politics", label: "Politics", color: "politics" },
    { value: "/entertainment", label: "Entertainment", color: "entertainment" },
    { value: "/sports", label: "Sports", color: "sports" },
    { value: "/tech", label: "Tech", color: "tech" },
    { value: "/business", label: "Business", color: "business" },
  ]

  const currentPath = pathname === "/" ? "/" : `/${pathname.split("/")[1]}`

  return (
    <Tabs defaultValue={currentPath} className="w-full" onValueChange={(value) => router.push(value)}>
      <TabsList className="w-full overflow-x-auto flex-nowrap justify-start bg-white dark:bg-gray-800">
        {categories.map((category) => (
          <TabsTrigger
            key={category.value}
            value={category.value}
            className="flex-shrink-0 data-[state=active]:bg-news-primary data-[state=active]:text-white"
          >
            {category.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}
