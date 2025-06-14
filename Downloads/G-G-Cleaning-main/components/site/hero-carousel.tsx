"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
// import Autoplay from "embla-carousel-autoplay" // Temporarily removed

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"

interface CarouselSlideData {
  id: string
  imageUrl: string
  imageAlt: string
  titleLine1: string
  titleLine2: string
  subtitle: string
  ctaText: string
  ctaLink: string
}

const slides: CarouselSlideData[] = [
  {
    id: "slide1",
    imageUrl: "/images/medium-shot-man-servant-cleaning-table.jpeg",
    imageAlt: "Man in glasses and gloves meticulously cleaning a white table surface",
    titleLine1: "Experience Unmatched Cleanliness",
    titleLine2: "For Your Home & Business",
    subtitle: "Professional, reliable, and eco-friendly cleaning solutions tailored to your needs.",
    ctaText: "Book Residential Cleaning",
    ctaLink: "/book?service=residential",
  },
  {
    id: "slide2",
    imageUrl: "/images/full-shot-men-cleaning-office.jpeg",
    imageAlt: "Two professional cleaners working in a modern office, one cleaning glass, the other vacuuming",
    titleLine1: "Elevate Your Workspace",
    titleLine2: "With Expert Maintenance",
    subtitle: "Comprehensive commercial cleaning and maintenance to ensure a productive environment.",
    ctaText: "Get Commercial Quote",
    ctaLink: "mailto:Gilded183@gmail.com?subject=Commercial%20Cleaning%20Quote",
  },
  {
    id: "slide3",
    imageUrl: "/images/side-view-adult-male-cleaning-window.jpeg",
    imageAlt: "Cleaner wearing a mask and pink gloves, spraying and wiping a window for a streak-free finish",
    titleLine1: "Beyond Cleaning:",
    titleLine2: "Total Property Care",
    subtitle: "From garden upkeep to handyman services, we handle all your property maintenance.",
    ctaText: "Explore Maintenance Services",
    ctaLink: "/#services",
  },
]

export default function HeroCarousel() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  // const plugin = React.useRef(Autoplay({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true })) // Temporarily removed

  React.useEffect(() => {
    if (!api) {
      return
    }
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <div className="relative w-full h-full">
      <Carousel
        setApi={setApi}
        opts={{
          loop: true,
        }}
        // plugins={[plugin.current]} // Temporarily removed
        className="w-full h-full"
      >
        <CarouselContent className="h-full">
          {slides.map((slide) => (
            <CarouselItem key={slide.id} className="h-full">
              <div className="relative w-full h-full text-white">
                <Image
                  src={slide.imageUrl || "/placeholder.svg"}
                  alt={slide.imageAlt}
                  layout="fill"
                  objectFit="cover"
                  className="absolute inset-0 z-0"
                  priority={slide.id === "slide1"}
                />
                <div className="absolute inset-0 bg-black/60 z-10" />
                <div className="relative z-20 h-full flex flex-col items-center justify-center text-center p-4 sm:p-8 mx-2 pt-20 md:pt-24">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                    {slide.titleLine1}
                    <br />
                    <span className="text-primary-foreground/90">{slide.titleLine2}</span>
                  </h1>
                  <p className="text-lg sm:text-xl md:text-2xl mb-8 sm:mb-10 max-w-3xl mx-auto text-primary-foreground/80">
                    {slide.subtitle}
                  </p>
                  <Button
                    asChild
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4"
                  >
                    <Link href={slide.ctaLink}>{slide.ctaText}</Link>
                  </Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 h-10 w-10 sm:h-12 sm:w-12 text-white bg-black/30 hover:bg-black/50 border-none" />
        <CarouselNext className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 h-10 w-10 sm:h-12 sm:w-12 text-white bg-black/30 hover:bg-black/50 border-none" />
      </Carousel>
      <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={`h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full transition-all duration-300 ${
              index + 1 === current ? "bg-primary-foreground p-1.5 sm:p-2" : "bg-primary-foreground/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
