import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Hero() {
  return (
    <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold text-foreground mb-6 text-balance">
          Цифровые ваучеры, игровые ключи и eSIM тарифы
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
          Получите мгновенный доступ к вашим любимым играм, бизнес-приложениям и тарифам eSIM для путешествий.
          Безопасно, быстро и с доставкой прямо на вашу электронную почту.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Button size="lg" asChild>
            <Link href="#products">Просмотреть ваучеры</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/esim">Просмотреть eSIM</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/how-it-works">Как это работает</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
