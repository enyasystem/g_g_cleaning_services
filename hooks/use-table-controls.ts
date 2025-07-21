"use client"

import { useState, useMemo, useCallback } from "react"
import { parseISO, isValid } from "date-fns"

export interface SortConfig<T> {
  key: keyof T | null
  direction: "ascending" | "descending"
}

interface UseTableControlsProps<T> {
  initialData: T[]
  initialItemsPerPage?: number
  dateKeys?: (keyof T)[] // Keys that contain date strings (e.g., "2025-07-15")
}

export function useTableControls<T extends Record<string, any>>({
  initialData,
  initialItemsPerPage = 10,
  dateKeys = [],
}: UseTableControlsProps<T>) {
  const [data, setData] = useState<T[]>(initialData)
  const [sortConfig, setSortConfig] = useState<SortConfig<T>>({ key: null, direction: "ascending" })
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage)
  const [globalSearchTerm, setGlobalSearchTerm] = useState("")

  // Update data when initialData changes (e.g., after a fetch)
  const updateData = useCallback((newData: T[]) => {
    setData(newData)
    setCurrentPage(1) // Reset to first page on new data
  }, [])

  const sortedAndFilteredData = useMemo(() => {
    let sortableItems = [...data]

    // Global search filter
    if (globalSearchTerm) {
      const lowerCaseSearchTerm = globalSearchTerm.toLowerCase()
      sortableItems = sortableItems.filter((item) =>
        Object.values(item).some((value) => String(value).toLowerCase().includes(lowerCaseSearchTerm)),
      )
    }

    // Sorting logic
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        const aValue = a[sortConfig.key!]
        const bValue = b[sortConfig.key!]

        // Handle date sorting
        if (dateKeys.includes(sortConfig.key!)) {
          const dateA = isValid(parseISO(aValue)) ? parseISO(aValue) : null
          const dateB = isValid(parseISO(bValue)) ? parseISO(bValue) : null

          if (dateA && dateB) {
            return sortConfig.direction === "ascending"
              ? dateA.getTime() - dateB.getTime()
              : dateB.getTime() - dateA.getTime()
          }
          // Handle cases where dates might be invalid or missing
          if (dateA && !dateB) return sortConfig.direction === "ascending" ? -1 : 1
          if (!dateA && dateB) return sortConfig.direction === "ascending" ? 1 : -1
          return 0 // Both invalid or null
        }

        // Handle string and number sorting
        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortConfig.direction === "ascending" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
        }
        if (typeof aValue === "number" && typeof bValue === "number") {
          return sortConfig.direction === "ascending" ? aValue - bValue : bValue - aValue
        }
        // Fallback for other types or mixed types
        return 0
      })
    }
    return sortableItems
  }, [data, sortConfig, globalSearchTerm, dateKeys])

  const totalItems = sortedAndFilteredData.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return sortedAndFilteredData.slice(startIndex, endIndex)
  }, [sortedAndFilteredData, currentPage, itemsPerPage])

  const requestSort = useCallback(
    (key: keyof T) => {
      let direction: SortConfig<T>["direction"] = "ascending"
      if (sortConfig.key === key && sortConfig.direction === "ascending") {
        direction = "descending"
      }
      setSortConfig({ key, direction })
    },
    [sortConfig],
  )

  const goToPage = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page)
      }
    },
    [totalPages],
  )

  const nextPage = useCallback(() => {
    goToPage(currentPage + 1)
  }, [currentPage, goToPage])

  const prevPage = useCallback(() => {
    goToPage(currentPage - 1)
  }, [currentPage, goToPage])

  return {
    data,
    updateData,
    paginatedData,
    requestSort,
    sortConfig,
    currentPage,
    totalPages,
    itemsPerPage,
    setItemsPerPage,
    goToPage,
    nextPage,
    prevPage,
    globalSearchTerm,
    setGlobalSearchTerm,
    filteredDataCount: totalItems, // Renamed for clarity
  }
}
