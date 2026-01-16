"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Database, Clock, ChevronRight } from "lucide-react"
import { ESimBuyModal } from "@/components/esim-buy-modal"

interface ESim {
  id: string
  name: string
  country_name?: string
  country_flag_logo?: string
  amount_gb: number
  amount_days: number
  price: number
  product_count?: number
}

interface ESimCardProps {
  esim: ESim
  onClick?: () => void
  hideCountryImage?: boolean
  hidePackageName?: boolean
  showPriceFrom?: boolean
  compact?: boolean
}

export function ESimCard({
  esim,
  onClick,
  hideCountryImage = false,
  hidePackageName = false,
  showPriceFrom = false,
  compact = false,
}: ESimCardProps) {
  const [buyModalOpen, setBuyModalOpen] = useState(false)

  const handleCardClick = () => {
    if (onClick) {
      onClick()
    } else {
      setBuyModalOpen(true)
    }
  }

  if (compact) {
    return (
      <>
        <Card
          className="group cursor-pointer hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-primary/20 overflow-hidden"
          onClick={handleCardClick}
        >
          <CardContent className="p-3 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center overflow-hidden flex-shrink-0">
              {esim.country_flag_logo ? (
                <Image
                  src={esim.country_flag_logo || "/placeholder.svg"}
                  alt={esim.country_name || "Country"}
                  width={40}
                  height={28}
                  className="object-contain rounded-lg"
                />
              ) : (
                <div className="text-lg font-bold text-primary">{esim.country_name?.slice(0, 2).toUpperCase()}</div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm truncate">{esim.country_name}</h3>
              <p className="text-xs text-muted-foreground">
                {esim.amount_gb} ГБ / {esim.amount_days} дн.
              </p>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="text-right">
                <div className="text-sm font-bold text-primary">
                  {showPriceFrom ? `от ${esim.price}` : esim.price} ₽
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </CardContent>
        </Card>

        <ESimBuyModal esim={esim} open={buyModalOpen} onOpenChange={setBuyModalOpen} />
      </>
    )
  }

  return (
    <>
      <Card
        className="h-full flex flex-col hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-primary/20 overflow-hidden group cursor-pointer"
        onClick={handleCardClick}
      >
        {!hideCountryImage && (
          <div className="relative h-24 overflow-hidden bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/10 flex items-center justify-center p-2">
            {esim.country_flag_logo ? (
              <Image
                src={esim.country_flag_logo || "/placeholder.svg"}
                alt={esim.country_name || "Country"}
                width={64}
                height={44}
                className="object-contain group-hover:scale-110 transition-transform duration-300 rounded-lg"
              />
            ) : (
              <div className="text-2xl font-bold text-primary/50">{esim.country_name?.slice(0, 2).toUpperCase()}</div>
            )}
            <Badge className="absolute top-2 right-2 bg-gradient-to-r from-primary to-accent text-white border-0 text-xs">
              eSIM
            </Badge>
          </div>
        )}

        <CardContent className="flex-1 p-3">
          {!hidePackageName && (
            <h3 className="font-semibold text-sm mb-1.5 text-foreground line-clamp-1">
              {hideCountryImage ? esim.name : esim.country_name}
            </h3>
          )}
          {hidePackageName && esim.country_name && (
            <h3 className="font-semibold text-sm mb-1.5 text-foreground">{esim.country_name}</h3>
          )}

          <div className="flex items-center gap-3 mb-2 text-xs">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Database className="h-3 w-3 text-primary" />
              <span className="font-medium text-foreground">{esim.amount_gb} ГБ</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-3 w-3 text-accent" />
              <span className="font-medium text-foreground">{esim.amount_days} дн.</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-base font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {showPriceFrom ? `от ${esim.price}` : esim.price} ₽
            </div>
            {esim.product_count && esim.product_count > 0 && (
              <span className="text-xs text-muted-foreground">({esim.product_count} тарифов)</span>
            )}
          </div>
        </CardContent>
      </Card>

      <ESimBuyModal esim={esim} open={buyModalOpen} onOpenChange={setBuyModalOpen} />
    </>
  )
}
