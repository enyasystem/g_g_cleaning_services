import type { Metadata } from "next"
import Navbar from "@/components/site/navbar"
import Footer from "@/components/site/footer"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Read the privacy policy for G&G Cleaning and Maintenance Services.",
}

const PrivacyPolicyPage = () => (
  <>
    <Navbar />
    <main className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">Last updated: June 15, 2025</p>
      <p className="mb-4">At G&amp;G Cleaning and Maintenance Services, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our website and services.</p>
      <h2 className="text-xl font-semibold mt-8 mb-2">Information We Collect</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Personal information you provide (such as name, email, phone number, and address) when booking services or contacting us.</li>
        <li>Usage data collected automatically (such as IP address, browser type, and pages visited).</li>
      </ul>
      <h2 className="text-xl font-semibold mt-8 mb-2">How We Use Your Information</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>To provide and manage our cleaning services.</li>
        <li>To communicate with you regarding bookings, updates, and promotions.</li>
        <li>To improve our website and customer experience.</li>
      </ul>
      <h2 className="text-xl font-semibold mt-8 mb-2">Data Sharing</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>We do not sell or rent your personal information.</li>
        <li>We may share data with trusted third-party service providers who assist us in operating our business, subject to confidentiality agreements.</li>
        <li>We may disclose information if required by law.</li>
      </ul>
      <h2 className="text-xl font-semibold mt-8 mb-2">Cookies</h2>
      <p className="mb-4">Our website may use cookies to enhance your browsing experience. You can disable cookies in your browser settings.</p>
      <h2 className="text-xl font-semibold mt-8 mb-2">Your Rights</h2>
      <p className="mb-4">You may request access to, correction of, or deletion of your personal information by contacting us.</p>
      <h2 className="text-xl font-semibold mt-8 mb-2">Contact Us</h2>
      <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:info@ggcleaning.com" className="text-blue-600 underline">info@ggcleaning.com</a>.</p>
    </main>
    <Footer />
  </>
)

export default PrivacyPolicyPage
