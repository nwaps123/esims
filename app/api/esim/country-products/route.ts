import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const country = searchParams.get("country")

    if (!country) {
      return NextResponse.json({ error: "Country parameter is required" }, { status: 400 })
    }

    const response = await fetch(
      `https://keys.foreignpay.ru/webhook/esim-trip/get-products?country=${encodeURIComponent(country)}`,
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
    
    // ⚠️ ВАЖНО: Возвращаем массив, а не объект
    const bestPrices = data["best-prices"] || []
    const prices = data.prices || []
    
    // Объединяем все продукты
    const allProducts = [...bestPrices, ...prices]
    
    // Преобразуем в массив объектов с правильными полями
    const transformedProducts = allProducts.map((item) => ({
      // Используем name как id и name
      id: item.name,
      name: item.name,
      // Основные поля
      country: item.country,
      country_name: item.country,
      country_ru: item.country_ru,
      // Данные о трафике и сроке
      amount_gb: item.amount_gb,
      amount_days: item.day || 7,
      // Цены
      price: item.price,
      old_price: item.old_price || null,
      // Изображения
      img: item.img,
      country_flag_logo: item.img,
      // Дополнительные поля для совместимости
      icon: item.img,
      category: 'esim',
      is_active: true,
    }))

    console.log(`✅ Returning ${transformedProducts.length} products for ${country}`)
    
    return NextResponse.json(transformedProducts)
  } catch (error) {
    console.error("Error fetching country products:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch country products" },
      { status: 500 },
    )
  }
}