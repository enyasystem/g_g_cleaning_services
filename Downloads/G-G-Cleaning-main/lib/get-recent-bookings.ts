import { getServerSupabase } from "@/lib/supabase/server"
import type { Booking } from "@/lib/data"

export async function getRecentBookings(limit = 5): Promise<Booking[]> {
  const supabase = getServerSupabase()
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit)

  if (error) {
    console.error("Error fetching recent bookings:", error)
    return []
  }

  // Map DB fields to Booking interface
  return (data || []).map((booking: any) => ({
    id: booking.id,
    clientName: booking.full_name,
    clientEmail: booking.email,
    serviceType: booking.service_type,
    date: booking.preferred_date,
    time: booking.preferred_time,
    status: booking.status,
    amount: booking.amount ? `₦${Number(booking.amount).toLocaleString()}` : "₦0.00",
    notes: booking.notes,
  }))
}
