import { NextResponse } from "next/server"

export async function GET() {
  try {
    const res = await fetch(
      "https://keys.foreignpay.ru/webhook/v2/merchant/get-groups",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    )

    if (!res.ok) {
      const text = await res.text()
      console.error("Foreignpay error:", text)
      return NextResponse.json(
        { error: "Foreignpay API failed" },
        { status: 502 }
      )
    }

    const groups = await res.json()

    /**
     * foreignpay:
     * [
     *  { icon, category, group }
     * ]
     *
     * frontend expects:
     * [
     *  { id, name, image, category }
     * ]
     */

    const products = groups.map((g: any) => ({
      id: g.group,
      name: g.group,
      image: g.icon,
      category: g.category,
      is_active: true,
      price: null, // будет позже
    }))

    return NextResponse.json(products)
  } catch (err) {
    console.error("Products API error:", err)
    return NextResponse.json(
      { error: "Failed to load products" },
      { status: 500 }
    )
  }
}
