"use client"
import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, MapPin, Database, Clock } from "lucide-react"
import { ESimBuyModal } from "@/components/esim-buy-modal"

interface ESim {
  id: string
  name: string
  country_name?: string
  amount_gb: number
  amount_days: number
  price: number
}

export default function CountryESimPage() {
  const params = useParams()
  const router = useRouter()
  const country = params.country as string
  const decodedCountry = decodeURIComponent(country)

  const [esims, setEsims] = useState<ESim[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedEsim, setSelectedEsim] = useState<ESim | null>(null)
  const [buyModalOpen, setBuyModalOpen] = useState(false)

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

      if (!Array.isArray(data)) {
        throw new Error("API did not return array")
      }

      const transformedEsims = data.map((item: any) => ({
        id: item.id || item.name,
        name: item.name,
        country_name: decodedCountry,
        amount_gb: item.amount_gb,
        amount_days: item.amount_days || item.day,
        price: item.price,
      }))

      setEsims(transformedEsims)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Не удалось загрузить eSIM")
      console.error("Error fetching country eSIMs:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleCardClick = (esim: ESim) => {
    setSelectedEsim(esim)
    setBuyModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5">
      {/* Header */}
      <section className="py-8 md:py-12 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative">
          <Button variant="ghost" onClick={() => router.push("/esim")} className="mb-4 hover:bg-primary/10 -ml-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Все страны
          </Button>

          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <span className="text-sm font-medium text-primary">Тарифы eSIM</span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-balance">
            eSIM для{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {decodedCountry}
            </span>
          </h1>
          <p className="text-muted-foreground mt-2 text-pretty max-w-2xl">
            Выберите подходящий тариф для вашего путешествия. Мгновенная активация после оплаты.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]" />
              <p className="mt-4 text-muted-foreground">Загрузка тарифов eSIM...</p>
            </div>
          ) : error ? (
            <div className="bg-destructive/10 border border-destructive/20 rounded-2xl p-8 text-center max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-destructive mb-2">Не удалось загрузить eSIM</h3>
              <p className="text-destructive/80 mb-4">{error}</p>
              <Button
                onClick={fetchCountryProducts}
                variant="outline"
                className="mt-4 bg-transparent border-destructive/30 hover:bg-destructive/10"
              >
                Попробовать снова
              </Button>
            </div>
          ) : esims.length > 0 ? (
            <>
              <div className="mb-6">
                <p className="text-sm text-muted-foreground">
                  Найдено тарифов: <span className="font-semibold text-foreground">{esims.length}</span>
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {esims.map((esim) => (
                  <Card
                    key={esim.id}
                    className="cursor-pointer hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-primary/20"
                    onClick={() => handleCardClick(esim)}
                  >
                    <CardContent className="p-5">
                      {/* Data info - expanded */}
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-2 bg-primary/10 px-3 py-2 rounded-lg">
                          <Database className="h-4 w-4 text-primary" />
                          <span className="font-semibold text-foreground">{esim.amount_gb} ГБ</span>
                        </div>
                        <div className="flex items-center gap-2 bg-accent/10 px-3 py-2 rounded-lg">
                          <Clock className="h-4 w-4 text-accent" />
                          <span className="font-semibold text-foreground">{esim.amount_days} дней</span>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                          {esim.price} ₽
                        </div>
                        <span className="text-sm text-primary font-medium">Купить →</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16 bg-muted/30 rounded-2xl">
              <p className="text-muted-foreground mb-4">Тарифы eSIM для {decodedCountry} в данный момент недоступны.</p>
              <Button
                variant="outline"
                className="bg-transparent border-primary/30 hover:bg-primary/10"
                onClick={() => router.push("/esim")}
              >
                Посмотреть другие страны
              </Button>
            </div>
          )}
        </div>
      </section>

      <ESimBuyModal esim={selectedEsim} open={buyModalOpen} onOpenChange={setBuyModalOpen} />
    </div>
  )
}
