import { cn } from "@/lib/utils/cn"
import { HTMLAttributes, memo } from "react"

export interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg"
}

export const Spinner = memo(({ size = "md", className, ...props }: SpinnerProps) => {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn(
        "inline-block animate-spin rounded-full border-2 border-solid border-current border-r-transparent",
        size === "sm" && "h-4 w-4",
        size === "md" && "h-6 w-6",
        size === "lg" && "h-8 w-8",
        className,
      )}
      {...props}
    />
  )
})

Spinner.displayName = "Spinner"
