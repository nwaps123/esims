import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const response = await fetch("https://keys.foreignpay.ru/webhook/esim-trip/get-main-products", {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`)
    }

    const data = await response.json()

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching main products:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch main products" },
      { status: 500 },
    )
  }
}
