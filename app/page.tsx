import { apiClient } from "@/lib/api-client"
import { ProductGrid } from "@/components/product-grid"
import { Hero } from "@/components/hero"
import { CategoryFilter } from "@/components/category-filter"
import { Suspense } from "react"
import { redirect } from "next/navigation"

interface Product {
  id: string
  name: string
  description: string
  category: string
  price: number
  image_url: string
  is_active: boolean
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const params = await searchParams

  if (!params.category) {
    redirect("/esim")
  }

  let products: Product[] = []
  let apiError = false
  let errorDetails = ""

  try {
    const filters: any = { isActive: true }
    if (params.category && params.category !== "all") {
      filters.category = params.category
    }

    products = await apiClient.getProducts(filters)
  } catch (error: any) {
    console.error("API error:", error)
    apiError = true
    errorDetails = error.message || "Failed to connect to backend API"
  }

  if (apiError) {
    return (
      <div className="min-h-screen bg-background">
        <Hero />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
              <h2 className="text-2xl font-bold text-red-800 mb-4">⚠️ Не удалось подключиться к API бэкенда</h2>
              <p className="text-red-700 mb-4">
                Не удается подключиться к API бэкенда. Пожалуйста, убедитесь, что ваш сервер бэкенда запущен.
              </p>
              <div className="bg-red-100 rounded p-4 mb-4">
                <p className="font-semibold text-red-800 mb-2">Детали ошибки:</p>
                <p className="font-mono text-sm text-red-800">{errorDetails}</p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-blue-800 mb-4">📋 Инструкции по настройке</h3>

              <div className="space-y-4 text-blue-900">
                <div>
                  <p className="font-semibold mb-2">Шаг 1: Настройка URL API бэкенда</p>
                  <p className="text-sm mb-2">
                    Установите переменную окружения{" "}
                    <code className="bg-blue-100 px-2 py-1 rounded">NEXT_PUBLIC_API_URL</code>, указывающую на ваш API
                    бэкенда.
                  </p>
                  <p className="text-sm">
                    Пример: <code className="bg-blue-100 px-2 py-1 rounded text-xs">http://localhost:8000/api</code>
                  </p>
                </div>

                <div>
                  <p className="font-semibold mb-2">Шаг 2: Убедитесь, что бэкенд запущен</p>
                  <p className="text-sm mb-2">Ваш API бэкенда должен реализовать следующие эндпоинты:</p>
                  <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                    <li>GET /api/products - Список товаров</li>
                    <li>POST /api/orders - Создание заказов</li>
                    <li>POST /api/auth/login - Вход пользователя</li>
                    <li>POST /api/auth/signup - Регистрация пользователя</li>
                    <li>GET /api/admin/stats - Статистика администратора</li>
                  </ul>
                </div>

                <div className="bg-blue-100 rounded p-3 mt-4">
                  <p className="text-sm font-semibold mb-1">💡 Примечание:</p>
                  <p className="text-sm">
                    Это приложение настроено для работы с вашим внешним бэкендом. Все операции с базой данных
                    обрабатываются через ваш API бэкенда.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">Цифровые ваучеры и коды</h2>
          <p className="text-muted-foreground text-lg">
            Мгновенная доставка ключей для игр и лицензий программного обеспечения на вашу электронную почту
          </p>
        </div>

        <Suspense fallback={<div>Загрузка фильтров...</div>}>
          <CategoryFilter currentCategory={params.category || "all"} />
        </Suspense>

        <Suspense fallback={<div>Загрузка товаров...</div>}>
          <ProductGrid products={products} />
        </Suspense>
      </main>
    </div>
  )
}
