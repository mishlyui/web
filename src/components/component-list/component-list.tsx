"use client"

import { Suspense } from "react"
import { Container } from "@/components/ui"
import { ComponentCard } from "./component-card"
import { ComponentListSkeleton } from "@/components/skeletons"
import { componentsConfig } from "@/config/components"

function ComponentListContent() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:auto-rows-fr lg:grid-cols-3">
      {componentsConfig.map((component, index) => (
        <ComponentCard key={component.slug} component={component} index={index} />
      ))}
    </div>
  )
}

export function ComponentList() {
  const componentCount = componentsConfig.length

  return (
    <section id="components" className="-mt-50 py-4" aria-label="Component library">
      <Container size="full">
        <span className="sr-only">Loading {componentCount} components</span>
        <Suspense fallback={<ComponentListSkeleton count={componentCount} />}>
          <ComponentListContent />
        </Suspense>
      </Container>
    </section>
  )
}
