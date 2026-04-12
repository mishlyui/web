"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeftIcon } from "@/components/ui/icons"

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center gap-8 px-4">
      <div className="absolute top-4 left-4">
        <Button variant="ghost" onClick={() => router.back()} className="h-10 w-10 p-0">
          <ArrowLeftIcon className="h-5 w-5" />
        </Button>
      </div>
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-foreground text-[10rem] leading-none font-bold tracking-tighter">
          404
        </h1>
        <div className="flex flex-col items-center gap-2">
          <p className="text-foreground text-2xl font-semibold">Page not found</p>
          <p className="text-muted-foreground max-w-md text-center text-sm">
            The page you&apos;re looking for doesn&apos;t exist or has been moved
          </p>
        </div>
      </div>
    </div>
  )
}
