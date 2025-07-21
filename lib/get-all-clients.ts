import type { Client } from "@/lib/data"

// Fetch clients from the new API route (MySQL/Prisma powered)
export async function getAllClients(): Promise<Client[]> {
  try {
    const res = await fetch("/api/admin/clients")
    if (!res.ok) throw new Error("Error loading clients.")
    const data = await res.json()
    return data || []
  } catch (error) {
    console.error("Error fetching clients:", error)
    return []
  }
}
