import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">VoucherHub</h3>
            <p className="text-muted-foreground text-sm">
              Your reliable source of digital vouchers and game keys. Instant delivery, secure transactions.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Products</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/games" className="text-muted-foreground hover:text-foreground">
                  Game Keys
                </Link>
              </li>
              <li>
                <Link href="/business" className="text-muted-foreground hover:text-foreground">
                  Business Applications
                </Link>
              </li>
              <li>
                <Link href="/esim" className="text-muted-foreground hover:text-foreground">
                  eSIM
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help" className="text-muted-foreground hover:text-foreground">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/refunds" className="text-muted-foreground hover:text-foreground">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal Information</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 VoucherHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
