
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";

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
    // Upsert client by email (insert or update name/phone if changed)
    const client = await prisma.client.upsert({
      where: { email: data.email },
      update: {
        name: data.fullName,
        phone: data.phone,
      },
      create: {
        name: data.fullName,
        email: data.email,
        phone: data.phone,
      },
    });
    console.log("[DEBUG] Upserted client:", client);
    // Create booking
    // Format date for display and storage
    const dateObj = new Date(data.preferredDate);
    const formattedDate = dateObj.toISOString();
    // For email and dashboard: 'Friday, 25 July 2025'
    const displayDate = dateObj.toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: '2-digit'
    });
    const booking = await prisma.booking.create({
      data: {
        clientId: client.id,
        serviceType: data.serviceType,
        date: formattedDate,
        time: data.preferredTime,
        status: "Pending",
        amount: null,
        notes: data.notes,
      },
    });
    console.log("[DEBUG] Created booking:", booking);

    // Send email notification to admin
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail", // Use Gmail for free, or change to another SMTP
        auth: {
          user: process.env.ADMIN_EMAIL || "info@ggcleanexperts.com", // admin email
          pass: process.env.ADMIN_EMAIL_PASS || "your-app-password-here" // use app password for Gmail
        }
      });
      const mailOptions = {
        from: `G&G Cleaning <${process.env.ADMIN_EMAIL || "info@ggcleanexperts.com"}>`,
        to: process.env.ADMIN_EMAIL || "info@ggcleanexperts.com",
        subject: "New Booking Received",
        text: `A new booking has been made:\n\nName: ${data.fullName}\nEmail: ${data.email}\nPhone: ${data.phone}\nService: ${data.serviceType}\nDate: ${displayDate}\nTime: ${data.preferredTime}\nNotes: ${data.notes}`,
      };
      await transporter.sendMail(mailOptions);
      console.log("[DEBUG] Admin notification email sent.");
    } catch (emailError) {
      console.error("[DEBUG] Failed to send admin notification email:", emailError);
    }

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error("[DEBUG] Booking creation error:", error);
    return NextResponse.json({ error: `[DEBUG] Failed to create booking: ${error instanceof Error ? error.message : String(error)}` }, { status: 500 });
  }
}
