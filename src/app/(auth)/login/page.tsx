import { Metadata } from "next"
import { AuthForm } from "@/components/auth/auth-form"

export const metadata: Metadata = {
  title: "Login - Mishly UI",
  description: "Sign in to access premium components",
}

export default function LoginPage() {
  return (
    <div className="w-full max-w-sm space-y-8">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Welcome to Mishly UI</h1>
      </div>
      <AuthForm />
    </div>
  )
}
