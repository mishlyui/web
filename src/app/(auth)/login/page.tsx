import { metadataConfig } from "@/config"
import { AuthForm } from "@/components/auth"

export const metadata = metadataConfig.login

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
