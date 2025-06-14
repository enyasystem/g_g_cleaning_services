import DashboardOverview from "@/components/admin/dashboard-overview"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Dashboard",
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminDashboardPage() {
  return <DashboardOverview />
}
