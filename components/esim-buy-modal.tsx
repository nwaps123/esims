"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Database, Clock, Loader2 } from "lucide-react"

interface ESim {
  id: string
  name: string
  country_name?: string
  amount_gb: number
  amount_days: number
  price: number
}

interface ESimBuyModalProps {
  esim: ESim | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ESimBuyModal({ esim, open, onOpenChange }: ESimBuyModalProps) {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [apiResponse, setApiResponse] = useState<any>(null)
  const [redirecting, setRedirecting] = useState(false)

  const handleBuy = async () => {
    if (!esim || !email.trim()) {
      setError("Пожалуйста, введите email")
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("Пожалуйста, введите корректный email")
      return
    }

    setLoading(true)
    setError(null)
    setApiResponse(null)

    try {
      const response = await fetch("/api/esim/buy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: esim.name,
          email: email.trim(),
        }),
      })

      const data = await response.json()
      setApiResponse(data)

      if (data.status === true && data.acquiring_page) {
        setRedirecting(true)
        window.location.href = data.acquiring_page
      } else {
        setError(data.error || data.message || "Не удалось оформить заказ. Попробуйте позже.")
      }
    } catch (err) {
      console.error("Error buying eSIM:", err)
      setError("Произошла ошибка. Попробуйте позже.")
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    if (redirecting) return // Prevent closing during redirect
    setEmail("")
    setError(null)
    setApiResponse(null)
    onOpenChange(false)
  }

  if (!esim) return null

  const isDisabled = loading || redirecting

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Покупка eSIM</DialogTitle>
          <DialogDescription>Введите ваш email для получения eSIM</DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="bg-muted/50 rounded-lg p-4 mb-4">
            <h4 className="font-semibold mb-2">{esim.country_name || "eSIM"}</h4>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Database className="h-4 w-4" />
                <span>{esim.amount_gb} ГБ</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{esim.amount_days} дней</span>
              </div>
            </div>
            <div className="mt-2 text-xl font-bold text-primary">{esim.price} ₽</div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setError(null)
                setApiResponse(null)
              }}
              disabled={isDisabled}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}

            {apiResponse && !apiResponse.acquiring_page && (
              <div className="mt-2 p-2 bg-red-50 rounded text-xs text-red-800 overflow-auto max-h-32">
                <p className="font-semibold mb-1">Ответ сервера:</p>
                <pre className="whitespace-pre-wrap break-all">{JSON.stringify(apiResponse, null, 2)}</pre>
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={isDisabled}>
            Отмена
          </Button>
          <Button onClick={handleBuy} disabled={isDisabled || !email.trim()}>
            {redirecting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Переход к оплате...
              </>
            ) : loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Обработка...
              </>
            ) : (
              "Купить"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
