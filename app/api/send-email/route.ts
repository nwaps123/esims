import { type NextRequest, NextResponse } from "next/server"
import { generateEmailHTML, generateEmailText } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    const emailData = await request.json()

    // In a real application, you would integrate with an email service like:
    // - Resend (recommended for Next.js)
    // - SendGrid
    // - AWS SES
    // - Mailgun

    // For demo purposes, we'll simulate email sending
    console.log("📧 Email would be sent to:", emailData.to)
    console.log("📧 Email subject: Your Voucher Codes - Order", emailData.orderId)
    console.log(
      "📧 Voucher codes:",
      emailData.voucherCodes.map((v: any) => v.code),
    )

    // Generate email content
    const htmlContent = generateEmailHTML(emailData)
    const textContent = generateEmailText(emailData)

    // Simulate email service API call
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate network delay

    // In production, replace this with actual email service integration:
    /*
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'VoucherHub <noreply@voucherhub.com>',
        to: [emailData.to],
        subject: `Your Voucher Codes - Order ${emailData.orderId}`,
        html: htmlContent,
        text: textContent,
      }),
    })
    */

    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
      // In demo mode, return the email content for debugging
      debug: {
        to: emailData.to,
        subject: `Your Voucher Codes - Order ${emailData.orderId}`,
        htmlPreview: htmlContent.substring(0, 500) + "...",
      },
    })
  } catch (error) {
    console.error("Email sending error:", error)
    return NextResponse.json({ success: false, error: "Failed to send email" }, { status: 500 })
  }
}
