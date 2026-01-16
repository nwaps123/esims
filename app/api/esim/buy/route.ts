import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email } = body

    if (!name || !email) {
      return NextResponse.json({ status: false, error: "Name and email are required" }, { status: 400 })
    }

    const apiUrl = `https://keys.foreignpay.ru/webhook/esim-trip/buy?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer 59ea25bc-c870-4ed0-97e0-b5ad71e705ec",
      },
      redirect: "follow",
    })

    const responseText = await response.text()

    let data
    try {
      data = JSON.parse(responseText)
    } catch {
      return NextResponse.json({
        status: false,
        error: "Invalid response from server",
        rawResponse: responseText,
        httpStatus: response.status,
      })
    }

    return NextResponse.json({
      ...data,
      httpStatus: response.status,
    })
  } catch (error) {
    console.error("Error buying eSIM:", error)
    return NextResponse.json(
      {
        status: false,
        error: error instanceof Error ? error.message : "Failed to process purchase",
      },
      { status: 500 },
    )
  }
}
