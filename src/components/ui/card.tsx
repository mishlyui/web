import Link from "next/link"
import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface CardProps {
  href: string
  preview?: ReactNode
  footer: ReactNode
  className?: string
}

export function Card({ href, preview, footer, className }: CardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "border-border/50 bg-card hover:border-border flex h-full flex-col rounded-xl border p-1 transition-colors",
        className,
      )}
    >
      <div className="bg-muted flex aspect-video items-center justify-center overflow-hidden rounded-lg">
        {preview}
      </div>
      <div className="flex flex-1 flex-col justify-center px-1 py-3">{footer}</div>
    </Link>
  )
}
