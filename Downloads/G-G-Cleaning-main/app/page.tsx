"use client"

import HeroSection from "@/components/site/hero-section"
import ServicesOverviewSection from "@/components/site/services-overview-section"
import CallToActionSection from "@/components/site/call-to-action-section"
import Navbar from "@/components/site/navbar"
import Footer from "@/components/site/footer"
import { ArrowUp } from "lucide-react"
import { useEffect, useState } from "react"

export default function HomePage() {
  const [showScroll, setShowScroll] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 200)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <ServicesOverviewSection />
        <CallToActionSection />
      </main>
      <Footer />
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 bg-primary text-primary-foreground rounded-full shadow-lg p-3 hover:bg-primary/90 transition-colors border-2 border-primary/30"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-6 w-6" />
        </button>
      )}
    </div>
  )
}
