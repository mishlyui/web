import { metadataConfig } from "@/config"
import { ReactNode } from "react"

export const metadata = metadataConfig.profile

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
