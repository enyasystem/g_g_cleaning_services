"use client"

import type React from "react"

import { motion, useInView, type Variants } from "framer-motion"
import { useRef } from "react"

interface ScrollRevealWrapperProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  animationType?: "fadeInUp" | "fadeIn" | "scaleUp"
  yOffset?: number
  once?: boolean
}

export default function ScrollRevealWrapper({
  children,
  className,
  delay = 0,
  duration = 0.6,
  animationType = "fadeInUp",
  yOffset = 20,
  once = true,
}: ScrollRevealWrapperProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: once, amount: 0.2 }) // Trigger when 20% is in view

  const variants: Record<string, Variants> = {
    fadeInUp: {
      hidden: { opacity: 0, y: yOffset },
      visible: { opacity: 1, y: 0, transition: { duration, ease: "easeInOut", delay } },
    },
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration, ease: "easeInOut", delay } },
    },
    scaleUp: {
      hidden: { opacity: 0, scale: 0.9 },
      visible: { opacity: 1, scale: 1, transition: { duration, ease: "easeOut", delay } },
    },
  }

  const selectedVariant = variants[animationType] || variants.fadeInUp

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={selectedVariant}
      className={className}
    >
      {children}
    </motion.div>
  )
}
