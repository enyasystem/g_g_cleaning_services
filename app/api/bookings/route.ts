
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient | null = null;
try {
  prisma = new PrismaClient();
  // Debug: Prisma client initialized
  console.log("[DEBUG] PrismaClient initialized successfully");
} catch (err) {
  console.error("[DEBUG] PrismaClient initialization failed:", err);
}

export async function POST(req: NextRequest) {
  try {
    if (!prisma) {
      console.error("[DEBUG] PrismaClient is not initialized. This usually means 'prisma generate' was not run or @prisma/client is not built.");
      return NextResponse.json({ error: "PrismaClient is not initialized. Please run 'npx prisma generate' and restart the server." }, { status: 500 });
    }
    const data = await req.json();
    console.log("[DEBUG] Incoming booking data:", data);
    // Find or create client by email
    let client = await prisma.client.findUnique({ where: { email: data.email } });
    if (!client) {
      client = await prisma.client.create({
        data: {
          name: data.fullName,
          email: data.email,
          phone: data.phone,
        },
      });
      console.log("[DEBUG] Created new client:", client);
    } else {
      console.log("[DEBUG] Found existing client:", client);
    }
    // Create booking
    const booking = await prisma.booking.create({
      data: {
        clientId: client.id,
        serviceType: data.serviceType,
        date: new Date(data.preferredDate),
        time: data.preferredTime,
        status: "Pending",
        amount: null,
        notes: data.notes,
      },
    });
    console.log("[DEBUG] Created booking:", booking);
    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error("[DEBUG] Booking creation error:", error);
    return NextResponse.json({ error: `[DEBUG] Failed to create booking: ${error instanceof Error ? error.message : String(error)}` }, { status: 500 });
  }
}
