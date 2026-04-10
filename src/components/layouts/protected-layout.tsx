"use client"

import { ReactNode, useEffect } from "react"
import { useRouter } from "next/navigation"
import { authClient } from "@/features/auth/lib/client"
import { useLoading } from "@/hooks/use-loading"

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  const { data: session, isPending } = authClient.useSession()
  const router = useRouter()

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login")
    }
  }, [session, isPending, router])

  return useLoading(isPending || !session, <>{children}</>)
}
