import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import { Suspense } from "react"
import "./globals.css"

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "iStreams - eSIM для путешествий по всему миру",
  description: "Мгновенная активация eSIM для путешествий. Интернет в любой точке мира без роуминга.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body className={`font-sans ${inter.variable}`}>
        <Suspense fallback={<div>Загрузка...</div>}>
          <Header />
          {children}
          <Footer />
        </Suspense>
        <Analytics />
        <Toaster />
      </body>
    </html>
  )
}
