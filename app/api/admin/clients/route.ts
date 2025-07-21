import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const clients = await prisma.client.findMany({
      orderBy: { name: "asc" },
      include: {
        bookings: {
          orderBy: { date: "desc" },
        },
      },
    });
    // Add totalBookings and lastBookingDate fields
    const result = clients.map((client) => ({
      id: String(client.id),
      name: client.name,
      email: client.email,
      phone: client.phone ? String(client.phone) : "",
      totalBookings: client.bookings.length,
      lastBookingDate: client.bookings[0]?.date ? client.bookings[0].date.toISOString() : null,
      // Optionally include bookings for admin dashboard
      bookings: client.bookings.map(b => ({ id: String(b.id) })),
    }));
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error(`[API][/api/admin/clients] Error: ${errorMsg}`);
    return NextResponse.json({ error: `Failed to fetch clients: ${errorMsg}` }, { status: 500 });
  }
}
