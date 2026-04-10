import { cn } from "@/lib/utils/cn"
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
            variant === "primary" && "bg-primary text-primary-foreground hover:bg-primary/80",
            variant === "ghost" && "text-foreground hover:bg-muted/50",
            variant === "outline" &&
              "border-border text-foreground hover:bg-muted/30 hover:border-muted border",
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
