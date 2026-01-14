import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, MessageCircle, Phone } from "lucide-react"
import Link from "next/link"

export default function SupportPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Support Center</h1>
          <p className="text-xl text-muted-foreground">We're here to help you with any questions or issues</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader className="text-center">
              <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Email Support</CardTitle>
              <CardDescription>Get help via email</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-4">Response within 24 hours</p>
              <Button asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <MessageCircle className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Live Chat</CardTitle>
              <CardDescription>Chat with our team</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-4">Available 9 AM - 6 PM EST</p>
              <Button variant="outline" disabled>
                Coming Soon
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Phone className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Phone Support</CardTitle>
              <CardDescription>Call us directly</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-4">1-800-VOUCHER</p>
              <Button variant="outline">Call Now</Button>
            </CardContent>
          </Card>
        </div>

        <div className="bg-muted/50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-foreground mb-2">How quickly will I receive my voucher codes?</h3>
              <p className="text-muted-foreground">
                All digital products are delivered instantly to your email address after successful payment completion.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">What if my code doesn't work?</h3>
              <p className="text-muted-foreground">
                Contact our support team immediately. We'll verify the code and provide a replacement if needed.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Can I get a refund?</h3>
              <p className="text-muted-foreground">
                Due to the digital nature of our products, refunds are only available for unused codes within 24 hours
                of purchase.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Are your products authentic?</h3>
              <p className="text-muted-foreground">
                Yes, all our voucher codes are sourced directly from authorized distributors and publishers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
