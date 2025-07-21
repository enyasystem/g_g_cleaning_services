"use client"
import { getClientSupabase } from "@/lib/supabase/client"

export async function getRecentBookings(limit = 5) {
  const supabase = getClientSupabase()
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit)
  if (error) {
    console.error("Error fetching recent bookings:", error)
    return []
  }
  return data || []
}
