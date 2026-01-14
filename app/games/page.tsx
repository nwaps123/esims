import { apiClient } from "@/lib/api-client"
import { ProductGrid } from "@/components/product-grid"
import { CategoryFilter } from "@/components/category-filter"
import { Suspense } from "react"

interface Product {
  id: string
  name: string
  description: string
  category: string
  price: number
  image_url: string
  is_active: boolean
}

export default async function GamesPage() {
  let products: Product[] = []
  let apiError = false

  try {
    products = await apiClient.getProducts({ category: "game", isActive: true })
  } catch (error) {
    console.error("API error fetching games:", error)
    apiError = true
  }

  if (apiError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-yellow-800 mb-4">Backend API Connection Failed</h2>
            <p className="text-yellow-700 mb-4">
              Unable to fetch games from the backend API. Please ensure your backend server is running.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-4">Game Keys & Digital Games</h1>
        <p className="text-muted-foreground">
          Discover the latest games and classic titles. Instant delivery of game keys for Steam, Epic Games, and more.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-64">
          <CategoryFilter selectedCategory="Games" />
        </aside>

        <main className="flex-1">
          <Suspense fallback={<div>Loading games...</div>}>
            <ProductGrid products={products} />
          </Suspense>
        </main>
      </div>
    </div>
  )
}
