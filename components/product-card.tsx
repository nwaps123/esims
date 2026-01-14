"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCartStore } from "@/lib/cart-store"
import { toast } from "@/hooks/use-toast"
import Image from "next/image"

interface Product {
  id: string
  name: string
  description: string
  category: string
  price: number
  image_url: string
  is_active: boolean
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)
  const categoryLabel = product.category === "games" ? "Игры" : "Бизнес"
  const categoryColor = product.category === "games" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"

  const handleAddToCart = () => {
    addItem(product, "voucher")

    toast({
      title: "Добавлено в корзину",
      description: `${product.name} добавлен в вашу корзину.`,
    })
  }

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
      <CardHeader className="p-0">
        <div className="relative aspect-square overflow-hidden rounded-t-lg">
          <Image src={product.image_url || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
          <Badge className={`absolute top-2 right-2 ${categoryColor}`}>{categoryLabel}</Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1 p-4">
        <h3 className="font-semibold text-lg mb-2 text-foreground line-clamp-2">{product.name}</h3>
        <p className="text-muted-foreground text-sm line-clamp-3 mb-4">{product.description}</p>
        <div className="text-2xl font-bold text-primary">₽{product.price.toFixed(0)}</div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button className="w-full" size="lg" onClick={handleAddToCart}>
          Добавить в корзину
        </Button>
      </CardFooter>
    </Card>
  )
}
