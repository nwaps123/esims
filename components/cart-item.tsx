"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCartStore } from "@/lib/cart-store"
import { Minus, Plus, Trash2, Database, Clock } from "lucide-react"
import Image from "next/image"

interface CartItemProps {
  item: any
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore()

  const isESim = item.type === "esim"

  return (
    <div className="flex gap-4 py-4">
      <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
        {isESim ? (
          <div className="w-full h-full bg-gradient-to-br from-cyan-50 to-blue-100 flex items-center justify-center">
            {item.country_flag_logo ? (
              <Image
                src={item.country_flag_logo || "/placeholder.svg"}
                alt={item.country_name}
                width={48}
                height={32}
                className="object-contain"
              />
            ) : (
              <span className="text-lg font-bold">{item.country_name?.slice(0, 2).toUpperCase()}</span>
            )}
          </div>
        ) : (
          <Image src={item.image_url || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-2 mb-1">
          <h4 className="font-medium text-sm line-clamp-2 flex-1">
            {isESim ? `${item.country_name} eSIM` : item.name}
          </h4>
          <Badge variant="outline" className="text-xs">
            {isESim ? "eSIM" : "Voucher"}
          </Badge>
        </div>

        {isESim && (
          <div className="flex gap-3 mb-1">
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Database className="h-3 w-3" />
              {item.amount_gb}GB
            </span>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {item.amount_days}d
            </span>
          </div>
        )}

        <p className="text-sm font-semibold text-primary">${item.price.toFixed(2)}</p>

        <div className="flex items-center gap-2 mt-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 bg-transparent"
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
          >
            <Minus className="h-3 w-3" />
          </Button>

          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>

          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 bg-transparent"
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
          >
            <Plus className="h-3 w-3" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive hover:text-destructive"
            onClick={() => removeItem(item.id)}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>

      <div className="text-right">
        <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
      </div>
    </div>
  )
}
