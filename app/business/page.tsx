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

export default async function BusinessPage() {
  let products: Product[] = []
  let apiError = false

  try {
    products = await apiClient.getProducts({ category: "business_app", isActive: true })
  } catch (error) {
    console.error("API error fetching business products:", error)
    apiError = true
  }

  if (apiError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-yellow-800 mb-4">Backend API Connection Failed</h2>
            <p className="text-yellow-700 mb-4">
              Unable to fetch business products from the backend API. Please ensure your backend server is running.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-4">Business Software & Apps</h1>
        <p className="text-muted-foreground">
          Professional software licenses for productivity, creativity, and business operations. Microsoft Office, Adobe
          Creative Suite, and more.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-64">
          <CategoryFilter selectedCategory="Business" />
        </aside>

        <main className="flex-1">
          <Suspense fallback={<div>Loading business products...</div>}>
            <ProductGrid products={products} />
          </Suspense>
        </main>
      </div>
    </div>
  )
}
