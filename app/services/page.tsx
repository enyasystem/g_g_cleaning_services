import ServicesOverviewSection from "@/components/site/services-overview-section"
import Navbar from "@/components/site/navbar"
import Footer from "@/components/site/footer"

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-20 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8">Our Services</h1>
          <ServicesOverviewSection />
        </div>
      </main>
      <Footer />
    </div>
  )
}
