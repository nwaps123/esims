"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useCartStore } from "@/lib/cart-store"
import { CartItem } from "@/components/cart-item"
import { ShoppingBag, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CartPage() {
  const { items, getTotalPrice, getTotalItems, clearCart } = useCartStore()
  const router = useRouter()
  const totalPrice = getTotalPrice()
  const totalItems = getTotalItems()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="sm" onClick={() => router.back()} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Назад
        </Button>
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <ShoppingBag className="h-8 w-8" />
            Корзина покупок
          </h1>
          <p className="text-muted-foreground mt-1">
            {totalItems === 0
              ? "Ваша корзина пуста"
              : `${totalItems} ${totalItems === 1 ? "товар" : totalItems < 5 ? "товара" : "товаров"} в корзине`}
          </p>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
          <h2 className="text-2xl font-semibold text-muted-foreground mb-4">Ваша корзина пуста</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Просмотрите нашу коллекцию цифровых ваучеров, игровых ключей и тарифов eSIM.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/games">Игры</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/business">Бизнес</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/esim">eSIM</Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Товары в корзине ({totalItems})</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearCart}
                  className="text-destructive hover:text-destructive"
                >
                  Очистить корзину
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {items.map((item, index) => (
                    <div key={item.id}>
                      <CartItem item={item} />
                      {index < items.length - 1 && <Separator className="mt-4" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Итого по заказу</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Промежуточный итог ({totalItems})</span>
                    <span>₽{totalPrice.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Комиссия за обработку</span>
                    <span>₽0</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Налог</span>
                    <span>Рассчитывается при оформлении</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Итого</span>
                  <span className="text-primary">₽{totalPrice.toFixed(0)}</span>
                </div>

                <div className="space-y-3 pt-4">
                  <Button className="w-full" size="lg" asChild>
                    <Link href="/checkout">Перейти к оформлению</Link>
                  </Button>

                  <Button variant="outline" className="w-full bg-transparent" asChild>
                    <Link href="/">Продолжить покупки</Link>
                  </Button>
                </div>

                <div className="text-xs text-muted-foreground pt-4 space-y-1">
                  <p>• Цифровая доставка по электронной почте</p>
                  <p>• Мгновенный доступ после оплаты</p>
                  <p>• Поддержка клиентов 24/7</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
