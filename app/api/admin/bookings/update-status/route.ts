import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { id, newStatus } = await req.json();
    if (!id || !newStatus) {
      console.error("[update-status] Missing id or newStatus", { id, newStatus });
      return NextResponse.json({ success: false, message: "Booking ID and new status are required." }, { status: 400 });
    }
    const bookingId = Number(id);
    if (isNaN(bookingId)) {
      console.error("[update-status] Invalid booking ID", { id });
      return NextResponse.json({ success: false, message: "Invalid booking ID." }, { status: 400 });
    }
    const updateResult = await prisma.booking.update({ where: { id: bookingId }, data: { status: newStatus } });
    console.log("[update-status] Success", { bookingId, newStatus, updateResult });
    return NextResponse.json({ success: true, message: `Booking status updated to ${newStatus}.` });
  } catch (error: any) {
    console.error("[update-status] Error", { error, stack: error?.stack });
    return NextResponse.json({ success: false, message: error?.message || "Failed to update booking status.", debug: error?.stack }, { status: 500 });
  }
}
