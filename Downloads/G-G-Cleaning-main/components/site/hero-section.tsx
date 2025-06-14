import HeroCarousel from "./hero-carousel"

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* h-screen ensures it takes full viewport height. Navbar is fixed on top. */}
      <HeroCarousel />
    </section>
  )
}
