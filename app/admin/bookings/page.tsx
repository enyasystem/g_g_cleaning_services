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
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const text = await res.text();
          setError(`API did not return JSON. Status: ${res.status}. Response: ${text.slice(0, 200)}`);
          setLoading(false);
          return;
        }
        let data;
        try {
          data = await res.json();
        } catch (jsonErr) {
          setError(`Error parsing response JSON: ${jsonErr}`);
          setLoading(false);
          return;
        }
        if (!res.ok) {
          setError(data?.error ? `API Error: ${data.error}` : `Error loading bookings. Status: ${res.status}`);
          setLoading(false);
          return;
        }
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
        setError(`Network or fetch error: ${err instanceof Error ? err.message : String(err)}`);
      }
      setLoading(false);
    };
    fetchBookings();
  }, [])

  if (loading) return <div>Loading bookings...</div>;
  return <BookingsManagement initialBookings={bookings} error={error ?? undefined} />;
}
