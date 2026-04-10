import { cn } from "@/lib/core/utils"
import { InputHTMLAttributes, forwardRef, memo } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string
}

export const Input = memo(
  forwardRef<HTMLInputElement, InputProps>(({ className, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          ref={ref}
          className={cn(
            "border-input bg-background text-foreground placeholder:text-muted-foreground focus:border-ring w-full cursor-text rounded-lg border px-4 py-2.5 text-sm transition-colors focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-destructive",
            className,
          )}
          {...props}
        />
        {error && <p className="text-destructive mt-1 text-xs">{error}</p>}
      </div>
    )
  }),
)

Input.displayName = "Input"
