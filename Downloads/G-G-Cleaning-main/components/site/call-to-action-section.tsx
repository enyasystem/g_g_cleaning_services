import Link from "next/link"
import { Button } from "@/components/ui/button"
import ScrollRevealWrapper from "@/components/motion/scroll-reveal-wrapper"

export default function CallToActionSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <ScrollRevealWrapper
        animationType="fadeInUp"
        delay={0.2}
        className="container mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready for a Spotless Space?</h2>
        <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
          Get a free quote or book our professional cleaning and maintenance services online today. Experience the G&G
          difference!
        </p>
        <div className="space-x-0 sm:space-x-4 space-y-4 sm:space-y-0 flex flex-col sm:flex-row justify-center items-center">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href="/book">Book Online Now</Link>
          </Button>
          <a
            href="mailto:Gilded183@gmail.com"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8 w-full sm:w-auto"
          >
            Get a Free Quote
          </a>
        </div>
      </ScrollRevealWrapper>
    </section>
  )
}
