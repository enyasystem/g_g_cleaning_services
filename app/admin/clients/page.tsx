"use client"
// import { getClientSupabase } from "@/lib/supabase/client"
import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import ClientsManagement from "@/components/admin/clients-management"
import type { Client } from "@/lib/data"

export default function AdminClientsPage() {
  const { toast } = useToast();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await fetch("/api/admin/clients");
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
          const errorMsg = data?.error ? `API Error: ${data.error}` : `Error loading clients. Status: ${res.status}`;
          setError(errorMsg);
          toast({ title: "Error", description: errorMsg, variant: "destructive" });
          setLoading(false);
          return;
        }
        setClients(data || []);
        setError(null);
        toast({ title: "Clients Loaded", description: "Clients loaded successfully.", variant: "default" });
      } catch (err) {
        setError(`Network or fetch error: ${err instanceof Error ? err.message : String(err)}`);
        toast({ title: "Error", description: `Network or fetch error: ${err instanceof Error ? err.message : String(err)}`, variant: "destructive" });
      }
      setLoading(false);
    };
    fetchClients();
  }, []);

  return (
    <>
      <Toaster />
      {loading ? <div>Loading clients...</div> : <ClientsManagement error={error ?? undefined} />}
    </>
  );
}
