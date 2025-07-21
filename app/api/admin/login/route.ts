import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    console.log("[DEBUG] Admin login endpoint hit");
    const { email, password } = await req.json();
    console.log("[DEBUG] Received login payload:", { email });
    if (!email || !password) {
      console.log("[DEBUG] Missing email or password");
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }
    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) {
      console.log("[DEBUG] No admin found for email:", email);
    } else {
      console.log("[DEBUG] Admin found:", admin.email);
    }
    if (!admin || admin.password !== password) {
      console.log("[DEBUG] Invalid credentials for email:", email);
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
    // Set a cookie for authentication
    console.log("[DEBUG] Admin login successful for:", email);
    const response = NextResponse.json({ success: true });
    response.cookies.set('admin-auth', 'true', {
      path: '/',
      httpOnly: false, // allow client to clear on logout
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 1 week
    });
    return response;
  } catch (error) {
    console.error("[DEBUG] Admin login server error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
