import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id) {
      console.error("[delete] Missing id", { id });
      return NextResponse.json({ success: false, message: "Booking ID is required." }, { status: 400 });
    }
    const bookingId = Number(id);
    if (isNaN(bookingId)) {
      console.error("[delete] Invalid booking ID", { id });
      return NextResponse.json({ success: false, message: "Invalid booking ID." }, { status: 400 });
    }
    const deleteResult = await prisma.booking.delete({ where: { id: bookingId } });
    console.log("[delete] Success", { bookingId, deleteResult });
    return NextResponse.json({ success: true, message: "Booking deleted successfully." });
  } catch (error: any) {
    console.error("[delete] Error", { error, stack: error?.stack });
    return NextResponse.json({ success: false, message: error?.message || "Failed to delete booking.", debug: error?.stack }, { status: 500 });
  }
}
