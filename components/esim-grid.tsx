"use client"

import { ESimCard } from "./esim-card"
import { useRouter } from "next/navigation"

interface ESim {
  id: string
  name: string
  country_name: string
  country_flag_logo?: string
  amount_gb: number
  amount_days: number
  price: number
  product_count?: number
}

interface ESimGridProps {
  esims: ESim[]
  showAsCountryList?: boolean
  hidePackageName?: boolean
  showPriceFrom?: boolean
  compact?: boolean
}

export function ESimGrid({
  esims,
  showAsCountryList = false,
  hidePackageName = false,
  showPriceFrom = false,
  compact = false,
}: ESimGridProps) {
  const router = useRouter()

  if (!esims || esims.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Нет доступных eSIM в данный момент.</p>
      </div>
    )
  }

  const handleCountryClick = (countryName: string) => {
    if (showAsCountryList) {
      router.push(`/esim/${encodeURIComponent(countryName)}`)
    }
  }

  if (compact) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {esims.map((esim) => (
          <ESimCard
            key={esim.id}
            esim={esim}
            onClick={showAsCountryList ? () => handleCountryClick(esim.country_name) : undefined}
            hideCountryImage={true}
            hidePackageName={hidePackageName}
            showPriceFrom={showPriceFrom}
            compact={true}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3">
      {esims.map((esim) => (
        <ESimCard
          key={esim.id}
          esim={esim}
          onClick={showAsCountryList ? () => handleCountryClick(esim.country_name) : undefined}
          hideCountryImage={!showAsCountryList}
          hidePackageName={hidePackageName}
          showPriceFrom={showPriceFrom}
        />
      ))}
    </div>
  )
}
