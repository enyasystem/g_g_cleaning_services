import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { oldPassword, newPassword } = await req.json();
    if (!oldPassword || !newPassword) {
      return NextResponse.json({ error: "Missing password fields", details: { oldPassword, newPassword } }, { status: 400 });
    }
    // For demo, fetch the first admin (adjust for multi-admin setups)
    const admin = await prisma.admin.findFirst();
    if (!admin) {
      return NextResponse.json({ error: "Admin not found. No admin user exists in the database." }, { status: 404 });
    }
    // Compare old password
    const isMatch = bcrypt.compareSync(oldPassword, admin.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Current password is incorrect.", debug: { attempted: oldPassword, stored: admin.password } }, { status: 401 });
    }
    // Hash new password
    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    await prisma.admin.update({
      where: { id: admin.id },
      data: { password: hashedPassword },
    });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update password", details: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}
