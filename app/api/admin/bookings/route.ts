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
    const err = error as any;
    const errorMsg = err?.message || String(error);
    const errorStack = err?.stack || "No stack trace";
    const errorFull = JSON.stringify(error, Object.getOwnPropertyNames(error));
    console.error(`[API][/api/admin/bookings] Error:`, { errorMsg, errorStack, errorFull });
    return NextResponse.json({ error: `Failed to fetch bookings: ${errorMsg}`, debug: errorStack, full: errorFull }, { status: 500 });
  }
}
