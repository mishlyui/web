import { Metadata } from "next"
import { env } from "@/config/env"

const SITE_NAME = "Mishly UI"
const SITE_DESCRIPTION = "Modern React component library"

export const createMetadata = (title: string, description?: string): Metadata => ({
  title: `${title} | ${SITE_NAME}`,
  description: description || SITE_DESCRIPTION,
})

export const metadataConfig = {
  home: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  } as Metadata,
  login: createMetadata("Sign In", "Sign in with email, GitHub, or Google to access your account"),
  profile: createMetadata("Profile", "View and manage your account settings"),
} as const

export const siteConfig = {
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: env.NEXT_PUBLIC_URL,
} as const
