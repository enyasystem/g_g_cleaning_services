
import { PrismaClient } from "@prisma/client"
const prisma = (globalThis as any).prisma || new PrismaClient()
if (process.env.NODE_ENV !== "production") (globalThis as any).prisma = prisma

export type BookingWithClient = any // You can refine this after running prisma generate

export async function getRecentBookings(limit = 5): Promise<BookingWithClient[]> {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
      include: {
        client: true,
      },
    })
    return bookings
  } catch (error) {
    console.error("Error fetching recent bookings:", error)
    return []
  }
}
