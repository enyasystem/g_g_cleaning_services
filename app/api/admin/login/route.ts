import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    console.log("[DEBUG] Admin login endpoint hit");
    const { email, password } = await req.json();
    console.log("[DEBUG] Received login payload:", { email });
    if (!email || !password) {
      const debugMsg = !email && !password
        ? "Missing both email and password."
        : !email
        ? "Missing email."
        : "Missing password.";
      console.log(`[DEBUG] ${debugMsg}`);
      return NextResponse.json({ error: "Email and password are required.", debug: debugMsg }, { status: 400 });
    }
    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) {
      const debugMsg = `No admin found for email: ${email}`;
      console.log(`[DEBUG] ${debugMsg}`);
      return NextResponse.json({ error: "Invalid credentials", debug: debugMsg }, { status: 401 });
    } else {
      console.log("[DEBUG] Admin found:", admin.email);
    }
    const isMatch = bcrypt.compareSync(password, admin.password);
    if (!isMatch) {
      const debugMsg = "Incorrect password.";
      console.log(`[DEBUG] ${debugMsg} for email: ${email}`);
      return NextResponse.json({ error: "Invalid credentials", debug: debugMsg }, { status: 401 });
    }
    // Set a cookie for authentication
    console.log("[DEBUG] Admin login successful for:", email);
    const response = NextResponse.json({ success: true });
    response.cookies.set('admin-auth', 'true', {
      path: '/',
      httpOnly: true, // prevent client-side JS access
      secure: process.env.NODE_ENV === 'production', // only send over HTTPS in production
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 1 week
    });
    return response;
  } catch (error) {
    console.error("[DEBUG] Admin login server error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
