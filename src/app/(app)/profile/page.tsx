"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth"
import { Button } from "@/components/ui"
import { ROUTES } from "@/constants"

export default function ProfilePage() {
  const { data: session } = authClient.useSession()
  const router = useRouter()
  const [isSigningOut, setIsSigningOut] = useState(false)
  const [error, setError] = useState<string>("")

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true)
      setError("")
      await authClient.signOut()
      router.push(ROUTES.LOGIN)
    } catch {
      setError("Failed to sign out. Please try again.")
    } finally {
      setIsSigningOut(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <p className="text-muted-foreground text-sm">{session?.user?.email}</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button variant="link" onClick={handleSignOut} isLoading={isSigningOut}>
            Sign Out
          </Button>
          {error && <p className="text-destructive text-xs">{error}</p>}
        </div>
      </div>
    </div>
  )
}
