"use client"

import { ReactNode, useEffect } from "react"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth"
import { useLoading } from "@/hooks"
import { ROUTES } from "@/constants"

export function ProtectedLayout({ children }: { children: ReactNode }) {
  const { data: session, isPending } = authClient.useSession()
  const router = useRouter()

  useEffect(() => {
    if (!isPending && !session) {
      router.push(ROUTES.LOGIN)
    }
  }, [session, isPending, router])

  return useLoading(isPending || !session, <>{children}</>)
}
