import type { Metadata } from "next"
import Navbar from "@/components/site/navbar"
import Footer from "@/components/site/footer"

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Read the terms of service for G&G Cleaning and Maintenance Services.",
}

const TermsOfServicePage = () => (
  <>
    <Navbar />
    <main className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <p className="mb-4">Last updated: June 15, 2025</p>
      <p className="mb-4">Welcome to G&amp;G Cleaning and Maintenance Services. By using our website and booking our services, you agree to the following terms and conditions:</p>
      <h2 className="text-xl font-semibold mt-8 mb-2">1. Services</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>We provide residential and commercial cleaning services as described on our website.</li>
        <li>Service availability may vary by location.</li>
      </ul>
      <h2 className="text-xl font-semibold mt-8 mb-2">2. Bookings and Payments</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Bookings can be made online or by contacting us directly.</li>
        <li>Payment is due upon completion of service unless otherwise agreed.</li>
      </ul>
      <h2 className="text-xl font-semibold mt-8 mb-2">3. Cancellations and Rescheduling</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Please notify us at least 24 hours in advance to cancel or reschedule a booking.</li>
        <li>Late cancellations may be subject to a fee.</li>
      </ul>
      <h2 className="text-xl font-semibold mt-8 mb-2">4. Customer Responsibilities</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Ensure access to the premises at the scheduled time.</li>
        <li>Secure valuables and inform us of any special instructions or hazards.</li>
      </ul>
      <h2 className="text-xl font-semibold mt-8 mb-2">5. Liability</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>We are insured and take care to provide quality service, but are not liable for pre-existing damage or items not reported as fragile.</li>
      </ul>
      <h2 className="text-xl font-semibold mt-8 mb-2">6. Changes to Terms</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>We may update these terms from time to time. Continued use of our services constitutes acceptance of any changes.</li>
      </ul>
      <h2 className="text-xl font-semibold mt-8 mb-2">Contact Us</h2>
      <p>For questions about these Terms of Service, please contact us at <a href="mailto:info@ggcleaning.com" className="text-blue-600 underline">info@ggcleaning.com</a>.</p>
    </main>
    <Footer />
  </>
)

export default TermsOfServicePage
