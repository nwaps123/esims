import { type NextRequest, NextResponse } from "next/server"
import { generateEmailHTML } from "@/lib/email"

// Demo endpoint to preview email templates
export async function GET(request: NextRequest) {
  const sampleEmailData = {
    to: "customer@example.com",
    customerName: "John Doe",
    orderId: "ORD-12345",
    totalAmount: 84.98,
    voucherCodes: [
      {
        id: "1",
        code: "STEAM25-ABC123XY",
        product: {
          name: "Steam Gift Card $25",
          description: "Steam digital gift card worth $25 USD",
        },
      },
      {
        id: "2",
        code: "OFFICE365-DEF456ZW",
        product: {
          name: "Microsoft Office 365",
          description: "Microsoft Office 365 Personal - 1 Year Subscription",
        },
      },
    ],
  }

  const htmlContent = generateEmailHTML(sampleEmailData)

  return new NextResponse(htmlContent, {
    headers: {
      "Content-Type": "text/html",
    },
  })
}
