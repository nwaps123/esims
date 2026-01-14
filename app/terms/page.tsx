export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto prose prose-gray dark:prose-invert">
        <h1>Terms of Service</h1>
        <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

        <h2>Acceptance of Terms</h2>
        <p>
          By accessing and using VoucherHub, you accept and agree to be bound by the terms and provision of this
          agreement.
        </p>

        <h2>Digital Products</h2>
        <p>
          All products sold on VoucherHub are digital voucher codes and licenses. These products are delivered
          electronically and cannot be returned once the code has been revealed.
        </p>

        <h3>Product Authenticity</h3>
        <ul>
          <li>All voucher codes are sourced from authorized distributors</li>
          <li>Codes are guaranteed to be valid at the time of purchase</li>
          <li>Regional restrictions may apply to certain products</li>
        </ul>

        <h2>Refund Policy</h2>
        <p>Due to the digital nature of our products, refunds are only available under the following circumstances:</p>
        <ul>
          <li>The voucher code is invalid or already used</li>
          <li>The product was not delivered within 24 hours</li>
          <li>Technical issues prevent code redemption</li>
        </ul>

        <h2>User Accounts</h2>
        <p>
          You are responsible for maintaining the confidentiality of your account credentials and for all activities
          that occur under your account.
        </p>

        <h2>Prohibited Uses</h2>
        <p>You may not use our service:</p>
        <ul>
          <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
          <li>To violate any international, federal, provincial, or state regulations or laws</li>
          <li>To transmit or procure the sending of any advertising or promotional material</li>
          <li>To impersonate or attempt to impersonate the company or other users</li>
        </ul>

        <h2>Limitation of Liability</h2>
        <p>
          VoucherHub shall not be liable for any indirect, incidental, special, consequential, or punitive damages
          resulting from your use of the service.
        </p>

        <h2>Contact Information</h2>
        <p>Questions about the Terms of Service should be sent to us at legal@voucherhub.com.</p>
      </div>
    </div>
  )
}
