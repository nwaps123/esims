"use client"
import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ESimGrid } from "@/components/esim-grid"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function CountryESimPage() {
  const params = useParams()
  const router = useRouter()
  const country = params.country as string
  const decodedCountry = decodeURIComponent(country)

  const [esims, setEsims] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCountryProducts()
  }, [country])

  const fetchCountryProducts = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/esim/country-products?country=${encodeURIComponent(decodedCountry)}`, {
        cache: "no-store",
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      const data = await response.json()

      console.log("📦 API returned:", data)

      if (!Array.isArray(data)) {
        throw new Error("API did not return array")
      }

      const transformedEsims = data.map((item: any) => ({
        id: item.id,
        name: item.name,            // имя тарифа
        amount_gb: item.amount_gb,
        amount_days: item.amount_days || item.day,
        price: item.price,
        old_price: item.old_price || undefined,
      }))

      setEsims(transformedEsims)

    } catch (err) {
      setError(err instanceof Error ? err.message : "Не удалось загрузить eSIM")
      console.error("Error fetching country eSIMs:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-8 bg-gradient-to-br from-cyan-50 via-blue-50 to-background border-b">
        <div className="container mx-auto px-4">
          <Button variant="ghost" onClick={() => router.push("/esim")} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Вернуться к выбору страны
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold text-balance">eSIM для {decodedCountry}</h1>
          <p className="text-muted-foreground mt-2 text-pretty">
            Доступные тарифы eSIM для путешествий в {decodedCountry}
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]" />
              <p className="mt-4 text-muted-foreground">Загрузка тарифов eSIM...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <h3 className="text-lg font-semibold text-red-900 mb-2">Не удалось загрузить eSIM</h3>
              <p className="text-red-700 mb-4">{error}</p>
              <Button onClick={fetchCountryProducts} variant="outline" className="mt-4 bg-transparent">
                Попробовать снова
              </Button>
            </div>
          ) : esims.length > 0 ? (
            <ESimGrid esims={esims} />
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Тарифы eSIM для {decodedCountry} в данный момент недоступны.</p>
              <Button variant="outline" className="mt-4 bg-transparent" onClick={() => router.push("/esim")}>
                Посмотреть другие страны
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
