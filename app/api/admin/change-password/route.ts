import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { oldPassword, newPassword } = await req.json();
    if (!oldPassword || !newPassword) {
      const debugMsg = !oldPassword && !newPassword
        ? "Missing both old and new password."
        : !oldPassword
        ? "Missing old password."
        : "Missing new password.";
      return NextResponse.json({ error: "Missing password fields", debug: debugMsg, details: { oldPassword, newPassword } }, { status: 400 });
    }
    // For demo, fetch the first admin (adjust for multi-admin setups)
    const admin = await prisma.admin.findFirst();
    if (!admin) {
      const debugMsg = "No admin user exists in the database.";
      return NextResponse.json({ error: "Admin not found.", debug: debugMsg }, { status: 404 });
    }
    // Compare old password
    const isMatch = bcrypt.compareSync(oldPassword, admin.password);
    if (!isMatch) {
      const debugMsg = "Current password is incorrect.";
      return NextResponse.json({ error: "Current password is incorrect.", debug: debugMsg, details: { attempted: oldPassword } }, { status: 401 });
    }
    // Hash new password
    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    await prisma.admin.update({
      where: { id: admin.id },
      data: { password: hashedPassword },
    });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    const debugMsg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: "Failed to update password", debug: debugMsg, details: debugMsg }, { status: 500 });
  }
}
