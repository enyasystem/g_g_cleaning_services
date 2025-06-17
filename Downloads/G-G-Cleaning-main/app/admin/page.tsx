"use client"
import { getClientSupabase } from "@/lib/supabase/client"
import { useEffect, useState } from "react"
import DashboardOverview from "@/components/admin/dashboard-overview"

export default function AdminDashboardPage() {
  // Example: You can fetch dashboard data here if needed
  // const [data, setData] = useState<any[]>([])
  // useEffect(() => { ... }, [])
  return <DashboardOverview />
}
