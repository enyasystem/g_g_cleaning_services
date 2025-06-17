"use client"
import { useState, useEffect } from "react"
import AdminLogin from "@/components/admin/admin-login"
import DashboardOverview from "@/components/admin/dashboard-overview"

export default function AdminDashboardPage() {
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    // Check localStorage for persisted login
    if (typeof window !== "undefined" && localStorage.getItem("admin-auth") === "true") {
      setAuthenticated(true)
    }
  }, [])

  function handleLogin() {
    setAuthenticated(true)
    if (typeof window !== "undefined") {
      localStorage.setItem("admin-auth", "true")
    }
  }

  if (!authenticated) {
    return <AdminLogin onLogin={handleLogin} />
  }
  return <DashboardOverview />
}
