"use client"
import { useState, useEffect } from "react"
import { ESimGrid } from "@/components/esim-grid"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, X, Globe, Zap } from "lucide-react"
import { useRouter } from "next/navigation"
import { useDebounce } from "@/hooks/use-debounce"

export default function ESimPage() {
  const router = useRouter()
  const [bestPriceEsims, setBestPriceEsims] = useState<any[]>([])
  const [allCountryEsims, setAllCountryEsims] = useState<any[]>([])
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchLoading, setSearchLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [countryCount, setCountryCount] = useState(0)

  const debouncedSearchQuery = useDebounce(searchQuery, 300)

  useEffect(() => {
    fetchMainProducts()
  }, [])

  useEffect(() => {
    if (debouncedSearchQuery.trim()) {
      searchCountries(debouncedSearchQuery)
    } else {
      setSearchResults([])
    }
  }, [debouncedSearchQuery])

  const fetchMainProducts = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/esim/main-products", {
        cache: "no-store",
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      const data = await response.json()

      const transformedBestPrices = data["best-prices"].map((item: any) => ({
        id: item.parent_name,
        name: item.parent_name,
        country_name: item.country_ru || item.country,
        country_flag_logo: item.img,
        amount_gb: item.amount_gb,
        amount_days: item.day,
        price: item.price,
        desktop_img: item.desktop_img,
        mobile_img: item.mobile_img,
        img_text: item.img_text,
        product_count: item.product_count,
      }))

      const transformedPrices = data.prices.map((item: any) => ({
        id: item.parent_name,
        name: item.parent_name,
        country_name: item.country_ru || item.country,
        country_flag_logo: item.img,
        amount_gb: item.amount_gb,
        amount_days: item.day,
        price: item.price,
        product_count: item.product_count,
      }))

      setBestPriceEsims(transformedBestPrices)
      setAllCountryEsims(transformedPrices)
      setCountryCount(data.country_count || 0)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Не удалось загрузить eSIM")
      console.error("Error fetching main eSIMs:", err)
    } finally {
      setLoading(false)
    }
  }

  const searchCountries = async (query: string) => {
    setSearchLoading(true)

    try {
      const response = await fetch(`/api/esim/search?search_field=${encodeURIComponent(query)}`, {
        cache: "no-store",
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      const data = await response.json()

      if (Array.isArray(data)) {
        const transformed = data.map((item: any, index: number) => ({
          id: `search-${item.country}-${index}`,
          name: item.country,
          country_name: item.country_ru || item.country,
          country_flag_logo: item.img,
          amount_gb: item.amount_gb,
          amount_days: item.day,
          price: item.price,
        }))
        setSearchResults(transformed)
      } else {
        setSearchResults([])
      }
    } catch (err) {
      console.error("Error searching eSIMs:", err)
      setSearchResults([])
    } finally {
      setSearchLoading(false)
    }
  }

  const handleClearSearch = () => {
    setSearchQuery("")
    setSearchResults([])
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5">
      <section className="py-16 md:py-20 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <span className="text-sm font-medium text-primary">Мобильный интернет по всему миру</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-balance bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text">
              eSIM для путешествий
            </h1>
            <p className="text-lg text-muted-foreground text-pretty mb-2">
              Оставайтесь на связи по всему миру с нашими доступными тарифами eSIM.
              <span className="text-primary font-medium"> Мгновенная активация</span>, физическая SIM-карта не нужна.
            </p>
            {countryCount > 0 && (
              <div className="flex items-center gap-2 mb-8">
                <Zap className="h-4 w-4 text-accent" />
                <p className="text-sm text-muted-foreground">
                  Доступно в <span className="font-bold text-foreground">{countryCount}</span> странах мира
                </p>
              </div>
            )}

            <div className="flex gap-2 max-w-md relative">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Поиск по названию страны..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-12 h-12 text-base rounded-xl border-2 border-primary/20 focus:border-primary/50 bg-white/80 backdrop-blur-sm shadow-lg shadow-primary/5"
                />
                {searchQuery && (
                  <button
                    onClick={handleClearSearch}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 rounded-full hover:bg-muted transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* eSIM Grid Section */}
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
                onClick={fetchMainProducts}
                variant="outline"
                className="mt-4 bg-transparent border-destructive/30 hover:bg-destructive/10"
              >
                Попробовать снова
              </Button>
            </div>
          ) : (
            <>
              {/* Search Results */}
              {searchQuery && (
                <div className="mb-12">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold">
                      Результаты поиска: <span className="text-primary">"{searchQuery}"</span>
                      {searchLoading && (
                        <span className="ml-2 text-sm font-normal text-muted-foreground">Поиск...</span>
                      )}
                    </h2>
                  </div>
                  {searchResults.length > 0 ? (
                    <ESimGrid esims={searchResults} showAsCountryList showPriceFrom />
                  ) : (
                    !searchLoading && (
                      <p className="text-muted-foreground">Ничего не найдено по запросу "{searchQuery}"</p>
                    )
                  )}
                </div>
              )}

              {/* Main content when not searching */}
              {!searchQuery && (
                <>
                  {bestPriceEsims.length > 0 && (
                    <div className="mb-12">
                      <div className="mb-6 flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20">
                          <Zap className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold">Выгодные предложения</h2>
                          <p className="text-muted-foreground text-sm">
                            Специальные предложения для популярных направлений
                          </p>
                        </div>
                      </div>
                      <ESimGrid esims={bestPriceEsims} showAsCountryList showPriceFrom />
                    </div>
                  )}

                  {allCountryEsims.length > 0 && (
                    <div>
                      <div className="mb-6 flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-secondary to-muted">
                          <Globe className="h-5 w-5 text-foreground/70" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold">Все доступные страны</h2>
                          <p className="text-muted-foreground text-sm">Выберите страну для просмотра тарифов</p>
                        </div>
                      </div>
                      <ESimGrid esims={allCountryEsims} showAsCountryList showPriceFrom compact />
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}
