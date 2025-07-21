import type React from "react"
// This file can be expanded with more specific types as needed.

export type Service = {
  id: string
  name: string
  description: string
  priceRange: string // e.g., "$50 - $100" or "From $75"
  duration?: string // e.g., "2-3 hours"
  icon?: React.ElementType // For potential use with Lucide icons
}

// You can re-export types from lib/data.ts if they are general enough
export type { Booking, Client } from "./data"
