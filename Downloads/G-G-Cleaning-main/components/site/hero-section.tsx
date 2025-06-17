"use client"

import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { useCallback, useEffect, useState } from "react"

const slides = [
   {
    content: (
      <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80" alt="European man cleaning floor" className="w-full h-full object-cover" />
    )
  },
  {
    content: (
      <img src="https://lemonblossomcleaning.com/wp-content/uploads/2020/02/hire-a-house-cleaning-service.jpeg" alt="Australian cleaner with mop" className="w-full h-full object-cover" />
    )
  },
  {
    content: (
      <img src="https://dbcinformatiesysteem.nl/wp-content/uploads/2023/02/schoonmaak-3-2048x1366.jpg" alt="European woman cleaning window" className="w-full h-full object-cover" />
    )
  },
  {
    content: (
      <img src="https://www.feelinspiredblog.com/wp-content/uploads/2022/10/Cleaning-Service-201709-001.jpg" alt="Cleaning Service" className="w-full h-full object-cover" />
    )
  },
 
 
]

export default function HeroSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, dragFree: false }, [Autoplay({ delay: 4000 })])
  const [selectedIndex, setSelectedIndex] = useState(0)

  // Swiper/slider controls
  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
    emblaApi.on("select", onSelect)
    onSelect()
    return () => {
      emblaApi.off("select", onSelect)
    }
  }, [emblaApi])

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      <div ref={emblaRef} className="embla absolute inset-0 z-0">
        <div className="embla__container h-full">
          {slides.map((slide, idx) => (
            <div className="embla__slide h-full" key={idx}>
              {slide.content}
            </div>
          ))}
        </div>
        {/* Swiper controls */}
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-primary/80 text-white rounded-full p-2 shadow hover:bg-primary focus:outline-none"
          onClick={scrollPrev}
          aria-label="Previous slide"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-primary/80 text-white rounded-full p-2 shadow hover:bg-primary focus:outline-none"
          onClick={scrollNext}
          aria-label="Next slide"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
        </button>
        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {slides.map((_, idx) => (
            <button
              key={idx}
              className={`embla__dot w-3 h-3 rounded-full transition-colors duration-200 ${selectedIndex === idx ? "bg-primary" : "bg-white/60"}`}
              onClick={() => emblaApi && emblaApi.scrollTo(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
      <div className="absolute inset-0 bg-black/40 z-5" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 h-full w-full z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg mb-4">Professional Cleaning & Maintenance</h1>
        <p className="text-lg md:text-2xl text-white drop-shadow mb-8 max-w-2xl">We make your home or business shine. Book a service with G&G Cleaning and Maintenance today!</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/book" className="bg-primary text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-primary/90 transition">Book Now</a>
          <a href="/services" className="bg-white text-primary px-6 py-3 rounded-lg font-semibold shadow hover:bg-gray-100 transition">View Services</a>
        </div>
      </div>
    </section>
  )
}
