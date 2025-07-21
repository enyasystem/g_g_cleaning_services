import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    console.log("[DEBUG] Fetching bookings from database...");
    const bookings = await prisma.booking.findMany({
      orderBy: { createdAt: "desc" },
      include: { client: true },
    });
    console.log(`[DEBUG] Bookings fetched: count=${bookings.length}`);
    if (bookings.length > 0) {
      console.log("[DEBUG] First booking:", JSON.stringify(bookings[0], null, 2));
    }
    return NextResponse.json(bookings, { status: 200 });
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error(`[API][/api/admin/bookings] Error: ${errorMsg}`);
    return NextResponse.json({ error: `Failed to fetch bookings: ${errorMsg}` }, { status: 500 });
  }
}
