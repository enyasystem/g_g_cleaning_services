"use client"
// import { getClientSupabase } from "@/lib/supabase/client"
import { useEffect, useState } from "react"
import ClientsManagement from "@/components/admin/clients-management"
import type { Client } from "@/lib/data"

export default function AdminClientsPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await fetch("/api/admin/clients");
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
          setError(data?.error ? `API Error: ${data.error}` : `Error loading clients. Status: ${res.status}`);
          setLoading(false);
          return;
        }
        setClients(data || []);
        setError(null);
      } catch (err) {
        setError(`Network or fetch error: ${err instanceof Error ? err.message : String(err)}`);
      }
      setLoading(false);
    };
    fetchClients();
  }, [])

  if (loading) return <div>Loading clients...</div>
  return <ClientsManagement error={error ?? undefined} />
}
