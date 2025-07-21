import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import Head from "next/head"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "G&G Cleaning and Maintenance Services",
    template: "%s | G&G Services",
  },
  description:
    "Professional cleaning and maintenance services for homes and businesses in Fairfield and surrounding areas. Contact G&G for reliable cleaning, and handyman services.",
  keywords: [
    "cleaning services Fairfield",
    "maintenance services",
    "commercial cleaning",
    "residential cleaning",
    // "gardening",
    "handyman",
  ],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  manifest: "/manifest.webmanifest",
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
    <>
      <Head>
        <meta property="og:title" content="G&G Cleaning and Maintenance Services" />
        <meta property="og:description" content="Professional cleaning and maintenance services for homes and businesses." />
        <meta property="og:image" content="/opengraph-image.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bmeebycicmkdkidtzdxn.supabase.co" />
      </Head>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
