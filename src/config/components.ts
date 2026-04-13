export interface ComponentItem {
  slug: string
  name: string
  category: string
  description?: string
  tags?: string[]
  version: string
  featured?: boolean
  createdAt: string
  preview?: string
}

export const componentListConfig = {
  hrefPattern: "/components/{slug}",
} as const

export const componentsConfig: ComponentItem[] = [] as const
