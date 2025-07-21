import Link from "next/link"
import { SprayCan, MapPin, Mail, Phone, ShieldCheck } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="bg-slate-900 text-slate-200 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <SprayCan className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-slate-50">G&G Services</span>
            </Link>
            <p className="text-sm">
              Providing top-quality cleaning and maintenance services with reliability and care.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-100 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-primary transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/book" className="hover:text-primary transition-colors">
                  Book Now
                </Link>
              </li>
              <li>
                {/* <Link href="/admin" className="hover:text-primary transition-colors">
                  Admi//n Login
                </Link> */}
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-100 mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 mt-1 text-primary shrink-0" />
                <span>77/ Harris street Fairfield</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a href="mailto:Gilded183@gmail.com" className="hover:text-primary transition-colors">
                  Gilded183@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a href="tel:0466065903" className="hover:text-primary transition-colors">
                  0466 065 903
                </a>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
                <span>ABN: 20461679508</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-100 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy" className="hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-700 pt-8 text-center text-sm">
          <p>&copy; {currentYear} G&G Cleaning and Maintenance Services. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

// Dummy pages for legal links
export function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1>Privacy Policy</h1>
      <p>Details about privacy...</p>
    </div>
  )
}
export function TermsOfServicePage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1>Terms of Service</h1>
      <p>Details about terms...</p>
    </div>
  )
}
