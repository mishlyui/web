import { cn } from "@/lib/core/utils"
import { ButtonHTMLAttributes, forwardRef, memo } from "react"
import { Spinner } from "@/components/ui/spinner"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "outline" | "link"
  isLoading?: boolean
}

export const Button = memo(
  forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", isLoading, disabled, children, ...props }, ref) => {
      return (
        <button
          ref={ref}
          disabled={disabled || isLoading}
          className={cn(
            "flex cursor-pointer items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-50",
            variant === "primary" && "bg-primary text-primary-foreground hover:opacity-70",
            variant === "ghost" &&
              "bg-card text-card-foreground hover:bg-secondary border shadow-sm hover:opacity-90",
            variant === "outline" &&
              "border-border bg-background text-foreground hover:bg-card hover:border-muted border",
            variant === "link" && "text-foreground px-0 underline-offset-4 hover:underline",
            className,
          )}
          {...props}
        >
          {isLoading ? <Spinner size="sm" /> : children}
        </button>
      )
    },
  ),
)

Button.displayName = "Button"
