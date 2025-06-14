import BookingsManagement from "@/components/admin/bookings-management"
import type { Metadata } from "next"
import { getServerSupabase } from "@/lib/supabase/server" // Import server Supabase client
import type { Booking } from "@/lib/data" // Import Booking type

export const metadata: Metadata = {
  title: "Manage Bookings",
  robots: {
    index: false,
    follow: false,
  },
}

export default async function AdminBookingsPage() {
  const supabase = getServerSupabase()
  const { data: bookings, error } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching bookings:", error)
    // Handle error, perhaps display a message or redirect
    return <div>Error loading bookings.</div>
  }

  // Map Supabase data to your Booking interface if column names differ
  const formattedBookings: Booking[] = bookings.map((booking: any) => ({
    id: booking.id,
    clientName: booking.full_name,
    clientEmail: booking.email,
    phone: booking.phone,
    address: booking.address,
    serviceType: booking.service_type,
    date: booking.preferred_date, // Ensure this is in 'YYYY-MM-DD' format from DB
    time: booking.preferred_time,
    status: booking.status,
    amount: "$0.00", // Assuming amount is not in DB yet, or needs calculation
    notes: booking.notes,
  }))

  return <BookingsManagement initialBookings={formattedBookings} />
}
