"use client"
// import { getClientSupabase } from "@/lib/supabase/client"
import { useEffect, useState } from "react"
import BookingsManagement from "@/components/admin/bookings-management"
import type { Booking } from "@/lib/data"

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch("/api/admin/bookings");
        if (!res.ok) throw new Error("Error loading bookings.");
        const data = await res.json();
        setBookings(
          (data || []).map((booking: any) => ({
            id: booking.id,
            clientName: booking.client?.name,
            clientEmail: booking.client?.email,
            phone: booking.client?.phone,
            address: booking.client?.address,
            serviceType: booking.serviceType,
            date: booking.date,
            time: booking.time,
            status: booking.status,
            // ...add other fields as needed
          }))
        );
        setError(null);
      } catch (err) {
        setError("Error loading bookings.");
      }
      setLoading(false);
    };
    fetchBookings();
  }, [])

  if (loading) return <div>Loading bookings...</div>
  if (error) return <div>{error}</div>
  return <BookingsManagement initialBookings={bookings} />
}
