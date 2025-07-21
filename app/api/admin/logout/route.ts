import { NextResponse } from "next/server";

export async function POST() {
  // Remove the admin-auth cookie
  const response = NextResponse.json({ success: true });
  response.cookies.set("admin-auth", "", {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 0
  });
  return response;
}
