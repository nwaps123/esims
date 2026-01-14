"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCartStore } from "@/lib/cart-store"
import { toast } from "@/hooks/use-toast"
import Image from "next/image"
import { Database, Clock, MapPin } from "lucide-react"

interface ESim {
  id: string
  name: string
  country_name?: string
  country_flag_logo?: string
  amount_gb: number
  amount_days: number
  price: number
  old_price?: number
  isBestPrice?: boolean
  product_count?: number
}

interface ESimCardProps {
  esim: ESim
  onClick?: () => void
  hideCountryImage?: boolean
}

export function ESimCard({ esim, onClick, hideCountryImage = false }: ESimCardProps) {
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = () => {
    addItem(esim, "esim")

    toast({
      title: "Добавлено в корзину",
      description: `${esim.name} добавлен в корзину.`,
    })
  }

  const hasDiscount = esim.old_price && esim.old_price > esim.price
  const discountPercent = hasDiscount
    ? Math.round(((esim.old_price! - esim.price) / esim.old_price!) * 100)
    : 0

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
      
      {/* HEADER (FLAG) */}
      {!hideCountryImage && (
        <CardHeader className="p-0">
          <div className="relative aspect-video overflow-hidden rounded-t-lg bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
            {esim.country_flag_logo ? (
              <Image
                src={esim.country_flag_logo}
                alt={esim.country_name || "Country"}
                width={120}
                height={80}
                className="object-contain"
              />
            ) : (
              <div className="text-4xl font-bold">
                {esim.country_name?.slice(0, 2).toUpperCase()}
              </div>
            )}

            <Badge className="absolute top-2 right-2 bg-cyan-100 text-cyan-800">eSIM</Badge>
            {hasDiscount && (
              <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                -{discountPercent}%
              </Badge>
            )}
          </div>
        </CardHeader>
      )}

      <CardContent className="flex-1 p-4">
        {/* Title */}
        <h3 className="font-semibold text-lg mb-3 text-foreground">
          {hideCountryImage ? esim.name : esim.country_name}
        </h3>

        {/* Data */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Database className="h-4 w-4" />
            <span className="font-medium text-foreground">{esim.amount_gb} ГБ</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span className="font-medium text-foreground">{esim.amount_days} дней</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <div className="text-2xl font-bold text-primary">₽{esim.price.toFixed(0)}</div>
          {hasDiscount && (
            <div className="text-sm text-muted-foreground line-through">
              ₽{esim.old_price!.toFixed(0)}
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        {onClick ? (
          <Button className="w-full" size="lg" onClick={onClick}>
            Посмотреть тарифы
          </Button>
        ) : (
          <Button className="w-full" size="lg" onClick={handleAddToCart}>
            Купить
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
