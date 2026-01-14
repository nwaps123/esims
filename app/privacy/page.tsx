export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto prose prose-gray dark:prose-invert">
        <h1>Privacy Policy</h1>
        <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

        <h2>Information We Collect</h2>
        <p>
          We collect information you provide directly to us, such as when you create an account, make a purchase, or
          contact us for support.
        </p>

        <h3>Personal Information</h3>
        <ul>
          <li>Name and email address</li>
          <li>Payment information (processed securely by our payment providers)</li>
          <li>Purchase history and preferences</li>
        </ul>

        <h3>Automatically Collected Information</h3>
        <ul>
          <li>Device information and IP address</li>
          <li>Usage data and analytics</li>
          <li>Cookies and similar technologies</li>
        </ul>

        <h2>How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Process and fulfill your orders</li>
          <li>Send you voucher codes and receipts</li>
          <li>Provide customer support</li>
          <li>Improve our services</li>
          <li>Send promotional communications (with your consent)</li>
        </ul>

        <h2>Information Sharing</h2>
        <p>
          We do not sell, trade, or otherwise transfer your personal information to third parties except as described in
          this policy or with your consent.
        </p>

        <h2>Data Security</h2>
        <p>
          We implement appropriate security measures to protect your personal information against unauthorized access,
          alteration, disclosure, or destruction.
        </p>

        <h2>Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access your personal information</li>
          <li>Correct inaccurate information</li>
          <li>Delete your account and data</li>
          <li>Opt out of marketing communications</li>
        </ul>

        <h2>Contact Us</h2>
        <p>If you have questions about this Privacy Policy, please contact us at privacy@voucherhub.com.</p>
      </div>
    </div>
  )
}
