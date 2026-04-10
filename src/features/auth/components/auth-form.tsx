"use client"

import { authClient } from "@/features/auth/lib/client"
import { useCallback, useState, memo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { GitHubIcon, GoogleIcon } from "@/components/ui/icons"
import { emailSchema } from "@/features/auth/schemas/email.schema"
import { useFormValidation } from "@/hooks/use-form-validation"
import { AUTH_CALLBACKS, AUTH_PROVIDERS } from "@/constants/auth"

export const AuthForm = memo(() => {
  const [email, setEmail] = useState("")
  const [isEmailLoading, setIsEmailLoading] = useState(false)
  const [isGithubLoading, setIsGithubLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [message, setMessage] = useState("")
  const { errors, validate, clearError } = useFormValidation(emailSchema)

  const isLoading = isEmailLoading || isGithubLoading || isGoogleLoading

  const handleMagicLink = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()

      if (!validate({ email })) {
        return
      }

      setIsEmailLoading(true)
      setMessage("")

      try {
        await authClient.signIn.magicLink({
          email,
          callbackURL: AUTH_CALLBACKS.DEFAULT,
        })
        setMessage("Check your email for the magic link!")
        setEmail("")
      } catch {
        setMessage("Failed to send magic link. Try again.")
      } finally {
        setIsEmailLoading(false)
      }
    },
    [email, validate],
  )

  const handleEmailChange = (value: string) => {
    setEmail(value)
    if (errors.email) {
      clearError("email")
    }
  }

  const handleSocialSignIn = useCallback(
    async (provider: typeof AUTH_PROVIDERS.GITHUB | typeof AUTH_PROVIDERS.GOOGLE) => {
      if (provider === AUTH_PROVIDERS.GITHUB) {
        setIsGithubLoading(true)
      } else {
        setIsGoogleLoading(true)
      }

      try {
        await authClient.signIn.social({
          provider,
          callbackURL: AUTH_CALLBACKS.DEFAULT,
        })
      } catch {
        setMessage(`Failed to sign in with ${provider}`)
        if (provider === AUTH_PROVIDERS.GITHUB) {
          setIsGithubLoading(false)
        } else {
          setIsGoogleLoading(false)
        }
      }
    },
    [],
  )

  return (
    <div className="w-full max-w-sm space-y-6">
      <form onSubmit={handleMagicLink} className="space-y-4">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => handleEmailChange(e.target.value)}
          disabled={isLoading}
          error={errors.email}
          required
        />
        <Button type="submit" className="w-full" isLoading={isEmailLoading} disabled={isLoading}>
          Continue with Email
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="border-border w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-background text-muted-foreground px-4">or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          onClick={() => handleSocialSignIn(AUTH_PROVIDERS.GITHUB)}
          isLoading={isGithubLoading}
          disabled={isLoading}
          className="flex w-full items-center justify-center"
        >
          <GitHubIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          onClick={() => handleSocialSignIn(AUTH_PROVIDERS.GOOGLE)}
          isLoading={isGoogleLoading}
          disabled={isLoading}
          className="flex w-full items-center justify-center"
        >
          <GoogleIcon className="h-4 w-4" />
        </Button>
      </div>

      {message && <p className="text-muted-foreground text-center text-sm">{message}</p>}
    </div>
  )
})

AuthForm.displayName = "AuthForm"
