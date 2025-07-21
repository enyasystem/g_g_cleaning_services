import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }
    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin || admin.password !== password) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
    // Optionally, set a session/cookie here
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
