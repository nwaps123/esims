import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const searchField = searchParams.get("search_field") || ""

  if (!searchField.trim()) {
    return NextResponse.json([])
  }

  try {
    const apiUrl = `https://keys.foreignpay.ru/webhook/proxy-request-post?path=%2Fesim-trip%2Fsearch-line&search_field=${encodeURIComponent(searchField)}`

    const response = await fetch(apiUrl, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer 59ea25bc-c870-4ed0-97e0-b5ad71e705ec",
      },
    })

    if (!response.ok) {
      throw new Error(`API returned ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error searching eSIMs:", error)
    return NextResponse.json([])
  }
}
