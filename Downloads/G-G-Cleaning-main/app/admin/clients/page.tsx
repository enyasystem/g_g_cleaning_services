import ClientsManagement from "@/components/admin/clients-management"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Manage Clients",
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminClientsPage() {
  return <ClientsManagement />
}
