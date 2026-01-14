"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useCartStore } from "@/lib/cart-store"
import { apiClient } from "@/lib/api-client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"
import Image from "next/image"

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCartStore()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [fullName, setFullName] = useState("")
  const router = useRouter()
  const totalPrice = getTotalPrice()

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    if (items.length === 0) return

    setLoading(true)

    try {
      const order = await apiClient.createOrder({
        email,
        fullName,
        items: items.map((item) => ({
          productId: item.id,
          type: item.type,
          quantity: item.quantity,
          unitPrice: item.price,
        })),
        totalAmount: totalPrice,
      })

      clearCart()
      toast({
        title: "Заказ оформлен!",
        description: "Ваши коды отправлены на вашу электронную почту.",
      })
      router.push(`/order-success?orderId=${order.id}`)
    } catch (error) {
      console.error("Checkout error:", error)
      toast({
        title: "Оформление не удалось",
        description: error instanceof Error ? error.message : "Произошла ошибка при оформлении заказа",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Ваша корзина пуста</h1>
          <Button onClick={() => router.push("/")}>Продолжить покупки</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Оформление заказа</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Итого по заказу</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {items.map((item) => {
              const isESim = item.type === "esim"
              return (
                <div key={item.id} className="flex gap-4">
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
                          <span className="text-sm font-bold">{item.country_name?.slice(0, 2).toUpperCase()}</span>
                        )}
                      </div>
                    ) : (
                      <Image src={item.image_url || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start gap-2">
                      <h4 className="font-medium text-sm line-clamp-2 flex-1">
                        {isESim ? `${item.country_name} eSIM` : item.name}
                      </h4>
                      <Badge variant="outline" className="text-xs">
                        {isESim ? "eSIM" : "Ваучер"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Количество: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₽{(item.price * item.quantity).toFixed(0)}</p>
                  </div>
                </div>
              )
            })}

            <Separator />

            <div className="flex justify-between items-center text-lg font-bold">
              <span>Итого:</span>
              <span className="text-primary">₽{totalPrice.toFixed(0)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Checkout Form */}
        <Card>
          <CardHeader>
            <CardTitle>Платежная информация</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCheckout} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Полное имя</Label>
                <Input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Адрес электронной почты</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <p className="text-sm text-muted-foreground">
                  Ваши коды будут отправлены на этот адрес электронной почты
                </p>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Способ оплаты</h4>
                <p className="text-sm text-muted-foreground">
                  Демо-режим: Обработка платежей симулируется. В продакшене интегрируйте Stripe или аналог.
                </p>
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading ? "Обработка..." : `Завершить заказ - ₽${totalPrice.toFixed(0)}`}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
