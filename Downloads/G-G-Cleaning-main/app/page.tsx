import HeroSection from "@/components/site/hero-section"
import ServicesOverviewSection from "@/components/site/services-overview-section"
import CallToActionSection from "@/components/site/call-to-action-section"
import Navbar from "@/components/site/navbar"
import Footer from "@/components/site/footer"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <ServicesOverviewSection />
        <CallToActionSection />
      </main>
      <Footer />
    </div>
  )
}
