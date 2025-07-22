import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // For demo, fetch the first admin (adjust for multi-admin setups)
    const admin = await prisma.admin.findFirst();
    if (!admin) {
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }
    return NextResponse.json({ name: admin.name, email: admin.email }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch admin profile" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, email } = await req.json();
    // For demo, update the first admin (adjust for multi-admin setups)
    const admin = await prisma.admin.findFirst();
    if (!admin) {
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }
    await prisma.admin.update({
      where: { id: admin.id },
      data: { name, email },
    });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update admin profile" }, { status: 500 });
  }
}
