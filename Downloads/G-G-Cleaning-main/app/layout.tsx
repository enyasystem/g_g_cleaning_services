import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "G&G Cleaning and Maintenance Services",
    template: "%s | G&G Services",
  },
  description:
    "Professional cleaning and maintenance services for homes and businesses in Fairfield and surrounding areas. Contact G&G for reliable cleaning, gardening, and handyman services.",
  keywords: [
    "cleaning services Fairfield",
    "maintenance services",
    "commercial cleaning",
    "residential cleaning",
    "gardening",
    "handyman",
  ],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  manifest: "/manifest.ts",
  generator: "v0.dev",
  openGraph: {
    images: "/opengraph-image.svg",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#3C4E76" },
    { media: "(prefers-color-scheme: dark)", color: "#5E76A9" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
