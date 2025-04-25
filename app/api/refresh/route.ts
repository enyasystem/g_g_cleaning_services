import { NextResponse } from "next/server"
import { refreshNewsCache } from "@/lib/news-fetcher"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get("secret")

  // Verify the request is authorized
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
  }

  try {
    console.log("Manually refreshing news cache...")

    const success = await refreshNewsCache()

    if (success) {
      return NextResponse.json({
        success: true,
        message: "News cache refreshed successfully",
        timestamp: new Date().toISOString(),
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "Failed to refresh news cache",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Error refreshing news cache:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to refresh news cache",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
