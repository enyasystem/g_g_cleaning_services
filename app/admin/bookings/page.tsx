"use client"
import { getClientSupabase } from "@/lib/supabase/client"
import { useEffect, useState } from "react"
import BookingsManagement from "@/components/admin/bookings-management"
import type { Booking } from "@/lib/data"

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBookings = async () => {
      const supabase = getClientSupabase();
      console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
      console.log("Supabase Key:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });
      console.log("Fetched data:", data, "Error:", error);
      if (error) {
        setError("Error loading bookings.");
      } else {
        setBookings(
          (data || []).map((booking: any) => ({
            id: booking.id,
            clientName: booking.full_name,
            clientEmail: booking.email,
            phone: booking.phone,
            address: booking.address,
            serviceType: booking.service_type,
            date: booking.preferred_date,
            time: booking.preferred_time,
            status: booking.status,
            // ...add other fields as needed
          }))
        );
      }
      setLoading(false);
    };
    fetchBookings();
  }, [])

  if (loading) return <div>Loading bookings...</div>
  if (error) return <div>{error}</div>
  return <BookingsManagement initialBookings={bookings} />
}
