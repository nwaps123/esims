interface VoucherCode {
  id: string
  code: string
  product: {
    name: string
    description: string
  }
}

interface EmailData {
  to: string
  customerName: string
  orderId: string
  voucherCodes: VoucherCode[]
  totalAmount: number
}

export async function sendVoucherEmail(emailData: EmailData) {
  try {
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailData),
    })

    if (!response.ok) {
      throw new Error("Failed to send email")
    }

    return await response.json()
  } catch (error) {
    console.error("Email sending error:", error)
    throw error
  }
}

export function generateEmailHTML(emailData: EmailData): string {
  const { customerName, orderId, voucherCodes, totalAmount } = emailData

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Voucher Codes - VoucherHub</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f8f9fa;
        }
        .container {
          background: white;
          border-radius: 8px;
          padding: 30px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 2px solid #e9ecef;
        }
        .logo {
          font-size: 28px;
          font-weight: bold;
          color: #2563eb;
          margin-bottom: 10px;
        }
        .voucher-code {
          background: #f8f9fa;
          border: 2px dashed #6c757d;
          border-radius: 8px;
          padding: 20px;
          margin: 15px 0;
          text-align: center;
        }
        .code {
          font-family: 'Courier New', monospace;
          font-size: 24px;
          font-weight: bold;
          color: #2563eb;
          background: white;
          padding: 10px 15px;
          border-radius: 4px;
          display: inline-block;
          margin: 10px 0;
          letter-spacing: 2px;
        }
        .product-name {
          font-weight: bold;
          color: #495057;
          margin-bottom: 5px;
        }
        .instructions {
          background: #e3f2fd;
          border-left: 4px solid #2196f3;
          padding: 15px;
          margin: 20px 0;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #e9ecef;
          color: #6c757d;
          font-size: 14px;
        }
        .order-summary {
          background: #f8f9fa;
          padding: 15px;
          border-radius: 6px;
          margin: 20px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">VoucherHub</div>
          <h1>Your Digital Voucher Codes</h1>
          <p>Thank you for your purchase, ${customerName}!</p>
        </div>

        <div class="order-summary">
          <h3>Order Details</h3>
          <p><strong>Order ID:</strong> ${orderId}</p>
          <p><strong>Total Amount:</strong> $${totalAmount.toFixed(2)}</p>
          <p><strong>Number of Items:</strong> ${voucherCodes.length}</p>
        </div>

        <h2>Your Voucher Codes:</h2>
        
        ${voucherCodes
          .map(
            (voucher) => `
          <div class="voucher-code">
            <div class="product-name">${voucher.product.name}</div>
            <div class="code">${voucher.code}</div>
            <p style="margin: 5px 0; color: #6c757d; font-size: 14px;">
              ${voucher.product.description}
            </p>
          </div>
        `,
          )
          .join("")}

        <div class="instructions">
          <h3>How to Redeem Your Codes:</h3>
          <ul>
            <li><strong>Steam Codes:</strong> Open Steam → Games → Activate a Product on Steam → Enter your code</li>
            <li><strong>Microsoft Products:</strong> Visit account.microsoft.com → Redeem → Enter your code</li>
            <li><strong>Adobe Products:</strong> Visit adobe.com/redeem → Sign in → Enter your code</li>
            <li><strong>Other Platforms:</strong> Visit the respective platform's redemption page</li>
          </ul>
          <p><strong>Important:</strong> These codes are single-use only. Please store them safely until redemption.</p>
        </div>

        <div class="footer">
          <p>Need help? Contact our support team at support@voucherhub.com</p>
          <p>This email was sent to ${emailData.to}</p>
          <p>&copy; 2024 VoucherHub. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `
}

export function generateEmailText(emailData: EmailData): string {
  const { customerName, orderId, voucherCodes, totalAmount } = emailData

  return `
VoucherHub - Your Digital Voucher Codes

Thank you for your purchase, ${customerName}!

Order Details:
- Order ID: ${orderId}
- Total Amount: $${totalAmount.toFixed(2)}
- Number of Items: ${voucherCodes.length}

Your Voucher Codes:

${voucherCodes
  .map(
    (voucher) => `
${voucher.product.name}
Code: ${voucher.code}
${voucher.product.description}
`,
  )
  .join("\n")}

How to Redeem Your Codes:
- Steam Codes: Open Steam → Games → Activate a Product on Steam → Enter your code
- Microsoft Products: Visit account.microsoft.com → Redeem → Enter your code
- Adobe Products: Visit adobe.com/redeem → Sign in → Enter your code
- Other Platforms: Visit the respective platform's redemption page

Important: These codes are single-use only. Please store them safely until redemption.

Need help? Contact our support team at support@voucherhub.com

This email was sent to ${emailData.to}
© 2024 VoucherHub. All rights reserved.
  `
}
