import Link from "next/link"
import { Globe, Mail, Shield } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-muted/30 to-muted/50 border-t mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
              iStreams
            </h3>
            <p className="text-muted-foreground text-sm">
              Ваш надежный источник eSIM для путешествий по всему миру. Мгновенная активация, безопасные транзакции.
            </p>
            <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
              <Globe className="h-4 w-4 text-primary" />
              <span>Работаем по всему миру</span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" />
              Поддержка
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/support" className="text-muted-foreground hover:text-primary transition-colors">
                  Центр помощи
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Связаться с нами
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-muted-foreground hover:text-primary transition-colors">
                  Как это работает
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              Правовая информация
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Политика конфиденциальности
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  Условия использования
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary/10 mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2026 iStreams. Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}
