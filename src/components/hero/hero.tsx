"use client"

import Link from "next/link"
import { heroConfig } from "@/config/hero"
import { DitherEffect } from "./dither-effect"
import { Container, ShimmerButton, SparklesText } from "@/components/ui"

export function Hero() {
  const { title, description, cta, ditherEffect } = heroConfig

  return (
    <section
      id="hero"
      className="relative h-screen w-full overflow-hidden"
      aria-label="Hero section"
    >
      <div className="absolute inset-0 mx-auto mt-6 h-96 w-full md:w-2/3" aria-hidden="true">
        <DitherEffect {...ditherEffect} />
      </div>

      <Container size="sm" className="relative z-20 flex h-full items-center justify-center px-4">
        <div className="text-shadow-hero flex flex-col items-center gap-6 text-center">
          <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
            {title.line1}
            <br />
            {title.line2}
          </h1>

          <p className="text-muted-foreground max-w-2xl px-4 text-sm font-medium sm:px-0 md:text-base">
            {description}
          </p>

          <div
            className="flex flex-col items-center gap-4 sm:flex-row sm:gap-8"
            role="group"
            aria-label="Call to action buttons"
          >
            <Link href={cta.primary.href} aria-label={`${cta.primary.text} - Browse components`}>
              <ShimmerButton
                shimmerDuration={cta.primary.shimmerDuration}
                className="w-full sm:w-auto"
              >
                {cta.primary.text}
              </ShimmerButton>
            </Link>
            <Link
              href={cta.secondary.href}
              aria-label={`${cta.secondary.text} - View documentation`}
            >
              <SparklesText
                className="cursor-pointer text-sm font-semibold"
                sparklesCount={cta.secondary.sparklesCount}
              >
                {cta.secondary.text}
              </SparklesText>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}
