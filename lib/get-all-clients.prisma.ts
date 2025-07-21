
import { PrismaClient } from "@prisma/client"
const prisma = (globalThis as any).prisma || new PrismaClient()
if (process.env.NODE_ENV !== "production") (globalThis as any).prisma = prisma

export type ClientWithBookingMeta = {
  id: number
  name: string
  email: string
  phone?: string | null
  totalBookings: number
  lastBookingDate?: Date | null
}

export async function getAllClients(): Promise<ClientWithBookingMeta[]> {
  try {
    const clients = await prisma.client.findMany({
      include: {
        bookings: {
          orderBy: { date: "desc" },
        },
      },
      orderBy: {
        name: "asc",
      },
    })
    return clients.map((client: any) => ({
      id: client.id,
      name: client.name,
      email: client.email,
      phone: client.phone,
      totalBookings: client.bookings.length,
      lastBookingDate: client.bookings[0]?.date || null,
    }))
  } catch (error) {
    console.error("Error fetching clients:", error)
    return []
  }
}
