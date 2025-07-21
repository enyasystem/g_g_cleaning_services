import { getClientSupabase } from "@/lib/supabase/client"
import type { Client } from "@/lib/data"

export async function getAllClients(): Promise<Client[]> {
  const supabase = getClientSupabase()
  const { data, error } = await supabase
    .from("clients")
    .select("*, bookings(count)")
    .order("name", { ascending: true })

  if (error) {
    console.error("Error fetching clients:", error)
    return []
  }

  // Map DB fields to Client interface
  return (data || []).map((client: any) => ({
    id: client.id,
    name: client.name,
    email: client.email,
    phone: client.phone,
    totalBookings: client.bookings ? client.bookings.length : 0,
    lastBookingDate: client.last_booking_date || undefined,
  }))
}
