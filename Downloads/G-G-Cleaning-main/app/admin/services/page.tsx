import ServicesManagement from "@/components/admin/services-management"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Manage Services",
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminServicesPage() {
  return <ServicesManagement />
}
