import { Metadata } from "next"
import { env } from "@/config/env"
import { SITE } from "@/constants/site"

export const createMetadata = (title: string, description?: string): Metadata => ({
  title: `${title} | ${SITE.NAME}`,
  description: description || SITE.DESCRIPTION,
})

export const metadataConfig = {
  home: {
    title: SITE.NAME,
    description: SITE.DESCRIPTION,
  } as Metadata,
  login: createMetadata("Sign In", "Sign in with email, GitHub, or Google to access your account"),
  profile: createMetadata("Profile", "View and manage your account settings"),
} as const

export const siteConfig = {
  name: SITE.NAME,
  description: SITE.DESCRIPTION,
  url: env.NEXT_PUBLIC_URL,
} as const
