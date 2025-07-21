import type React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import AdminSidebar from "@/components/admin/admin-sidebar"
import AdminHeader from "@/components/admin/admin-header"
import AdminProtectedLayout from "./protected-layout"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const defaultOpen = true // or false, as you prefer

  return (
    <AdminProtectedLayout>
      <SidebarProvider defaultOpen={defaultOpen}>
        <div className="flex min-h-screen bg-muted/40">
          <AdminSidebar />
          <div className="flex flex-col flex-1">
            <AdminHeader />
            <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">{children}</main>
          </div>
        </div>
      </SidebarProvider>
    </AdminProtectedLayout>
  )
}
