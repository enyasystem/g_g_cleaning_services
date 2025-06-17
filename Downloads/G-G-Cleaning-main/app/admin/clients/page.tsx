"use client"
import { getClientSupabase } from "@/lib/supabase/client"
import { useEffect, useState } from "react"
import ClientsManagement from "@/components/admin/clients-management"
import type { Client } from "@/lib/data"

export default function AdminClientsPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchClients = async () => {
      const supabase = getClientSupabase()
      const { data, error } = await supabase
        .from("clients")
        .select("*, bookings(count)")
        .order("name", { ascending: true })
      if (error) {
        setError("Error loading clients.")
      } else {
        setClients(
          (data || []).map((client: any) => ({
            id: client.id,
            name: client.name,
            email: client.email,
            phone: client.phone,
            totalBookings: client.bookings ? client.bookings.length : 0,
            lastBookingDate: client.last_booking_date || undefined,
          }))
        )
      }
      setLoading(false)
    }
    fetchClients()
  }, [])

  if (loading) return <div>Loading clients...</div>
  if (error) return <div>{error}</div>
  return <ClientsManagement />
}
