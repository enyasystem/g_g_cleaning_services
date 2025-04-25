"use client"

import { useRouter, usePathname } from "next/navigation"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CategoryTabs() {
  const router = useRouter()
  const pathname = usePathname()

  const categories = [
    { value: "/", label: "All" },
    { value: "/politics", label: "Politics" },
    { value: "/entertainment", label: "Entertainment" },
    { value: "/sports", label: "Sports" },
    { value: "/tech", label: "Tech" },
    { value: "/business", label: "Business" },
  ]

  const currentPath = pathname === "/" ? "/" : `/${pathname.split("/")[1]}`

  return (
    <Tabs defaultValue={currentPath} className="w-full" onValueChange={(value) => router.push(value)}>
      <TabsList className="w-full overflow-x-auto flex-nowrap justify-start">
        {categories.map((category) => (
          <TabsTrigger key={category.value} value={category.value} className="flex-shrink-0">
            {category.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}
