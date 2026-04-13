import { ROUTES } from "@/constants/routes"

export const heroConfig = {
  title: {
    line1: "UI components for",
    line2: "Modern Web Apps",
  },
  description:
    "Production-ready animated components with seamless integration. Modern design system powered by React, Next.js, and Tailwind CSS.",
  cta: {
    primary: {
      text: "Browse Components",
      href: "#components",
      shimmerDuration: "2s",
    },
    secondary: {
      text: "View Pricing →",
      href: ROUTES.PRICING,
      sparklesCount: 2,
    },
  },
  ditherEffect: {
    variant: "square" as const,
    pixelSize: 3,
    color: "#5e5e5e",
    patternScale: 3,
    patternDensity: 1.5,
    pixelSizeJitter: 0.2,
    enableRipples: true,
    rippleSpeed: 0.5,
    rippleThickness: 0.15,
    rippleIntensityScale: 2,
    liquid: false,
    speed: 0.3,
    edgeFade: 0.4,
    transparent: true,
    overlayVariant: "corner-fade" as const,
  },
} as const

export type HeroConfig = typeof heroConfig
