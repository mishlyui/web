import { ROUTES } from "@/constants/routes"

export const headerConfig = {
  logo: {
    text: "mishlyui",
    href: ROUTES.HOME,
  },
  navLinks: [
    { label: "Components", href: ROUTES.COMPONENTS },
    { label: "Pricing", href: ROUTES.PRICING },
  ],
  socialLinks: [
    {
      name: "Discord",
      href: "https://discord.gg/",
      icon: "discord" as const,
    },
  ],
  search: {
    placeholder: "Search components...",
    shortcut: "⌘K",
  },
  mobileMenu: {
    showSearch: true,
  },
} as const

export type HeaderConfig = typeof headerConfig
