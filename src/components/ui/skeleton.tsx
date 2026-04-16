import { cn } from "@/lib/utils"
import { HTMLAttributes } from "react"

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "text" | "circular" | "rectangular"
}

export function Skeleton({ className, variant = "default", ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "bg-muted/30 animate-skeleton-pulse",
        variant === "default" && "rounded-lg",
        variant === "text" && "h-4 rounded",
        variant === "circular" && "rounded-full",
        variant === "rectangular" && "rounded-none",
        className,
      )}
      aria-live="polite"
      aria-busy="true"
      {...props}
    />
  )
}
