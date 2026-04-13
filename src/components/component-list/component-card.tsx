"use client"

import { memo } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui"
import { componentCardAnimation } from "@/lib/animations"
import { componentListConfig, type ComponentItem } from "@/config/components"

interface ComponentCardProps {
  component: ComponentItem
  index: number
}

export const ComponentCard = memo(({ component, index }: ComponentCardProps) => {
  const href = componentListConfig.hrefPattern.replace("{slug}", component.slug)

  const preview = component.preview ? (
    <img src={component.preview} alt={component.name} className="h-full w-full object-cover" />
  ) : (
    <div className="text-muted-foreground text-6xl font-bold opacity-10">
      {component.name.charAt(0)}
    </div>
  )

  const footer = (
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <h3 className="text-foreground mb-0.5 text-sm font-medium">{component.name}</h3>
        <p className="text-muted-foreground text-xs">
          {new Date(component.createdAt).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>
      <div className="text-muted-foreground text-xs font-medium">View →</div>
    </div>
  )

  return (
    <motion.div {...componentCardAnimation(index)}>
      <Card href={href} preview={preview} footer={footer} />
    </motion.div>
  )
})

ComponentCard.displayName = "ComponentCard"
