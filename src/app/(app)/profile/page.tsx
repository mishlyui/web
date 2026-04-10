"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"

export default function ProfilePage() {
  const { data: session } = authClient.useSession()
  const router = useRouter()
  const [isSigningOut, setIsSigningOut] = useState(false)

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true)
      await authClient.signOut()
      router.push("/login")
    } catch (error) {
      console.error("Sign out failed:", error)
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
        <div className="flex justify-center">
          <Button variant="link" onClick={handleSignOut} isLoading={isSigningOut}>
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  )
}
