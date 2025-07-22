"use client"
// import { getClientSupabase } from "@/lib/supabase/client"
import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import BookingsManagement from "@/components/admin/bookings-management"
import type { Booking } from "@/lib/data"


export default function AdminBookingsPage() {
  const { toast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch("/api/admin/bookings");
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const text = await res.text();
          setError(`API did not return JSON. Status: ${res.status}. Response: ${text.slice(0, 200)}`);
          toast({ title: "Error", description: `API did not return JSON. Status: ${res.status}.`, variant: "destructive" });
          setLoading(false);
          return;
        }
        let data;
        try {
          data = await res.json();
        } catch (jsonErr) {
          setError(`Error parsing response JSON: ${jsonErr}`);
          toast({ title: "Error", description: `Error parsing response JSON: ${jsonErr}`, variant: "destructive" });
          setLoading(false);
          return;
        }
        if (!res.ok) {
          const errorMsg = data?.error ? `API Error: ${data.error}` : `Error loading bookings. Status: ${res.status}`;
          setError(errorMsg);
          toast({ title: "Error", description: errorMsg, variant: "destructive" });
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
        toast({ title: "Bookings Loaded", description: "Bookings loaded successfully.", variant: "default" });
      } catch (err) {
        setError(`Network or fetch error: ${err instanceof Error ? err.message : String(err)}`);
        toast({ title: "Error", description: `Network or fetch error: ${err instanceof Error ? err.message : String(err)}`, variant: "destructive" });
      }
      setLoading(false);
    };
    fetchBookings();
  }, []);

  return (
    <>
      <Toaster />
      {loading ? <div>Loading bookings...</div> : <BookingsManagement initialBookings={bookings} error={error ?? undefined} />}
    </>
  );
}
// ...existing code...
// ...existing code...
