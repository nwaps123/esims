import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Send } from "lucide-react"
import Link from "next/link"

export default function SupportPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Центр поддержки</h1>
          <p className="text-xl text-muted-foreground">Мы всегда готовы помочь вам с любыми вопросами</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardHeader className="text-center">
              <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Поддержка по Email</CardTitle>
              <CardDescription>Напишите нам на почту</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-4">Ответ в течение 24 часов</p>
              <a href="mailto:icommmarket@gmail.com" className="text-primary font-medium hover:underline block mb-4">
                icommmarket@gmail.com
              </a>
              <Button asChild>
                <Link href="mailto:icommmarket@gmail.com">Написать</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Send className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Telegram</CardTitle>
              <CardDescription>Быстрая связь через мессенджер</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-4">Оперативные ответы</p>
              <Button variant="outline" disabled>
                Скоро будет доступно
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="bg-muted/50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Часто задаваемые вопросы</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-foreground mb-2">Как быстро я получу eSIM?</h3>
              <p className="text-muted-foreground">
                eSIM активируется мгновенно после успешной оплаты. Вы получите QR-код и инструкции на указанный email.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Что делать, если eSIM не работает?</h3>
              <p className="text-muted-foreground">
                Свяжитесь с нашей службой поддержки. Мы проверим статус вашей eSIM и поможем решить проблему.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Можно ли вернуть деньги?</h3>
              <p className="text-muted-foreground">
                Возврат возможен только для неактивированных eSIM в течение 24 часов после покупки.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Какие устройства поддерживают eSIM?</h3>
              <p className="text-muted-foreground">
                Большинство современных смартфонов поддерживают eSIM: iPhone XS и новее, Samsung Galaxy S20 и новее,
                Google Pixel 3 и новее.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
