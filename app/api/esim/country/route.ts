import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const country = searchParams.get("country")

    if (!country) {
      return NextResponse.json({ error: "Country parameter is required" }, { status: 400 })
    }

    const response = await fetch(
      `https://keys.foreignpay.ru/webhook/api/esims?country=${encodeURIComponent(country)}`,
      {
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      },
    )

    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`)
    }

    const data = await response.json()

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching country products:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch country products" },
      { status: 500 },
    )
  }
}
