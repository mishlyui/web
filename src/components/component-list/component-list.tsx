"use client"

import { Container } from "@/components/ui"
import { ComponentCard } from "./component-card"
import { componentsConfig } from "@/config/components"

export function ComponentList() {
  return (
    <section id="components" className="-mt-50 py-4">
      <Container size="full">
        <div className="grid gap-4 sm:grid-cols-2 lg:auto-rows-fr lg:grid-cols-3">
          {componentsConfig.map((component, index) => (
            <ComponentCard key={component.slug} component={component} index={index} />
          ))}
        </div>
      </Container>
    </section>
  )
}
