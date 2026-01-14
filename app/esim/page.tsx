"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { ESimGrid } from "@/components/esim-grid"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useParams } from "next/navigation"

export default function ESimPage() {
  const params = useParams()
  const countryFromUrl = params?.country as string | undefined
  const [bestPriceEsims, setBestPriceEsims] = useState<any[]>([])
  const [allCountryEsims, setAllCountryEsims] = useState<any[]>([])
  const [countryEsims, setCountryEsims] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [countryCount, setCountryCount] = useState(0)

  useEffect(() => {
    fetchMainProducts()
  }, [])

  useEffect(() => {
    if (countryFromUrl) {
      const decoded = decodeURIComponent(countryFromUrl)
      console.log("🌍 Country from URL:", decoded)
      setSelectedCountry(decoded)
    } else {
      setSelectedCountry(null)
    }
  }, [countryFromUrl])

  useEffect(() => {
    if (selectedCountry) {
      fetchCountryProducts(selectedCountry)
    }
  }, [selectedCountry])

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
        old_price: item.old_price ? item.old_price : undefined,
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
      setCountryEsims([])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Не удалось загрузить eSIM")
      console.error("Error fetching main eSIMs:", err)
    } finally {
      setLoading(false)
    }
  }

const fetchCountryProducts = async (country: string) => {
  setLoading(true)
  setError(null)

  try {
    console.log(`🔍 Fetching products for country: ${country}`)
    
    const response = await fetch(`/api/esim/country-products?country=${encodeURIComponent(country)}`, {
      cache: "no-store",
    })

    console.log('📡 Country products response status:', response.status, response.statusText)
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ Error response:', errorText)
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()
    console.log('📦 Raw country products data:', data)
    console.log('📦 Type:', typeof data)
    console.log('📦 Is array?', Array.isArray(data))
    
    // Проверяем, что это массив (как возвращает наш API route)
    if (Array.isArray(data)) {
      console.log(`✅ Received ${data.length} products as array`)
      
      if (data.length === 0) {
        console.warn('⚠️ API returned empty array')
        setBestPriceEsims([])
        setAllCountryEsims([])
        return
      }
      
      // Преобразуем данные в нужный формат
      const transformedEsims = data.map((item: any, index: number) => {
        console.log(`📄 Item ${index}:`, item)
        
        return {
          // Используем правильные поля из API response
          id: item.id || item.name || `esim-${country}-${index}`,
          name: item.name || item.group || `eSIM ${country}`,
          country_name: item.country_name || item.country || country,
          country_flag_logo: item.country_flag_logo || item.img || item.icon || 'https://via.placeholder.com/150',
          amount_gb:
            typeof item.amount_gb === "number"
              ? item.amount_gb
              : item.data ?? 0,
          amount_days: item.amount_days || item.day || 7,
          price: typeof item.price === 'number' ? item.price : 0,
          old_price: item.old_price || undefined,
          // Дополнительные поля, если есть
          ...(item.category && { category: item.category }),
          ...(item.image_url && { image_url: item.image_url }),
        }
      })
      
      console.log(`✅ Transformed ${transformedEsims.length} products`)
      console.log('✅ First transformed item:', transformedEsims[0])
      
      setCountryEsims(transformedEsims)
    } 
    // Если API возвращает объект (старый формат)
    else if (data && typeof data === 'object') {
      console.log('📦 Object keys:', Object.keys(data))
      
      // Проверяем наличие best-prices
      if (data["best-prices"] && Array.isArray(data["best-prices"])) {
        console.log(`✅ Found ${data["best-prices"].length} best-prices`)
        
        const transformedEsims = data["best-prices"].map((item: any, index: number) => ({
          id: item.name || `esim-${country}-${index}`,
          name: item.name || `eSIM ${country}`,
          country_name: item.country_ru || item.country || country,
          country_flag_logo: item.img || 'https://via.placeholder.com/150',
          amount_gb:
            typeof item.amount_gb === "number"
              ? item.amount_gb
              : item.data ?? 0,
          amount_days: item.day || 7,
          price: item.price || 0,
          old_price: item.old_price || undefined,
        }))
        
        setBestPriceEsims(transformedEsims)
        setAllCountryEsims([])
      } else {
        console.warn('⚠️ No best-prices array found in response')
        throw new Error('Invalid response format: missing best-prices array')
      }
    } else {
      console.warn('⚠️ Unexpected response format:', data)
      throw new Error('Unexpected response format from API')
    }
  } catch (err) {
    console.error('❌ Error fetching country eSIMs:', err)
    setError(err instanceof Error ? err.message : "Не удалось загрузить eSIM")
    setCountryEsims(testData)
  } finally {
    setLoading(false)
  }
}

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setSelectedCountry(searchQuery.trim())
    }
  }

  const handleClearSearch = () => {
    setSelectedCountry(null)
    setSearchQuery("")
    fetchMainProducts()
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-cyan-50 via-blue-50 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">eSIM для путешествий</h1>
            <p className="text-lg text-muted-foreground text-pretty mb-2">
              Оставайтесь на связи по всему миру с нашими доступными тарифами eSIM. Мгновенная активация, физическая
              SIM-карта не нужна.
            </p>
            {countryCount > 0 && (
              <p className="text-sm text-muted-foreground mb-8">Доступно в {countryCount} странах мира</p>
            )}

            <div className="flex gap-2 max-w-md">
              <Input
                placeholder="Поиск по названию страны..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyPress}
                className="flex-1"
              />
              {selectedCountry ? (
                <Button onClick={handleClearSearch} variant="outline">
                  Очистить
                </Button>
              ) : (
                <Button onClick={handleSearch} size="default">
                  <Search className="h-4 w-4 mr-2" />
                  Поиск
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* eSIM Grid Section */}
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
              <p className="text-sm text-red-600">
                Не удалось получить данные из: <strong>/api/esim/main-products</strong>
              </p>
              <Button onClick={fetchMainProducts} variant="outline" className="mt-4 bg-transparent">
                Попробовать снова
              </Button>
            </div>
          ) : (
            <>
              {selectedCountry && countryEsims.length > 0 && (
                <div className="mb-12">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold">
                      Тарифы eSIM для {selectedCountry}
                    </h2>
                  </div>
                  <ESimGrid esims={countryEsims} />
                </div>
              )}

              {!selectedCountry && bestPriceEsims.length > 0 && (
                <div className="mb-12">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold">Выгодные предложения</h2>
                    <p className="text-muted-foreground mt-1">
                      Специальные предложения и лучшие цены для популярных направлений
                    </p>
                  </div>
                  <ESimGrid esims={bestPriceEsims} showAsCountryList />
                </div>
              )}


              {!selectedCountry && allCountryEsims.length > 0 && (
                <div>
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold">Все доступные страны</h2>
                    <p className="text-muted-foreground mt-1">Выберите тарифы eSIM по стране</p>
                  </div>
                  <ESimGrid esims={allCountryEsims} showAsCountryList />
                </div>
              )}

              {/* Empty state */}
              {selectedCountry && countryEsims.length === 0 && !loading && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    Тарифы eSIM{selectedCountry ? ` для ${selectedCountry}` : ""} в данный момент недоступны.
                  </p>
                  {selectedCountry && (
                    <Button variant="outline" className="mt-4 bg-transparent" onClick={handleClearSearch}>
                      Показать все страны
                    </Button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}
