import BookingForm from "@/components/booking/booking-form"
import Navbar from "@/components/site/navbar"
import Footer from "@/components/site/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Book a Service",
  description:
    "Schedule your professional cleaning or maintenance service with G&G Services. Easy online booking for residential and commercial needs.",
}

export default function BookPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-20 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8">Book Your Service</h1>
            <BookingForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
