import { CheckCircle, Download, Mail, ShoppingCart } from "lucide-react"

export default function HowItWorksPage() {
  const steps = [
    {
      icon: ShoppingCart,
      title: "Browse & Select",
      description:
        "Browse our extensive catalog of digital vouchers, game keys, and business software. Filter by category, price, or platform to find exactly what you need.",
    },
    {
      icon: CheckCircle,
      title: "Secure Checkout",
      description:
        "Add items to your cart and proceed to our secure checkout. We accept all major payment methods and ensure your transaction is protected.",
    },
    {
      icon: Mail,
      title: "Instant Delivery",
      description:
        "Receive your voucher codes instantly via email after successful payment. No waiting, no delays - your digital products are delivered immediately.",
    },
    {
      icon: Download,
      title: "Redeem & Enjoy",
      description:
        "Use the provided codes to redeem your products on the respective platforms. Follow the simple instructions included with each purchase.",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">How It Works</h1>
          <p className="text-xl text-muted-foreground">Get your digital vouchers in 4 simple steps</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <step.icon className="h-8 w-8 text-primary" />
              </div>
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                {index + 1}
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-muted/50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Why Choose VoucherHub?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-foreground mb-2">✅ Instant Delivery</h3>
              <p className="text-muted-foreground text-sm">
                All digital products are delivered immediately to your email after purchase.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">🔒 Secure Transactions</h3>
              <p className="text-muted-foreground text-sm">
                Your payment information is protected with industry-standard encryption.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">💯 Authentic Products</h3>
              <p className="text-muted-foreground text-sm">
                All voucher codes are sourced directly from authorized distributors.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">🎯 24/7 Support</h3>
              <p className="text-muted-foreground text-sm">
                Our customer support team is available around the clock to help you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
