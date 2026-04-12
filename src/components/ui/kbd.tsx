import { cn } from "@/lib/utils/cn"
import { HTMLAttributes, memo } from "react"

interface KbdProps extends HTMLAttributes<HTMLElement> {
  size?: "sm" | "md"
}

export const Kbd = memo(({ className, size = "sm", children, ...props }: KbdProps) => {
  return (
    <kbd
      className={cn(
        "bg-muted text-muted-foreground inline-flex items-center justify-center rounded border font-mono font-medium",
        size === "sm" && "h-5 min-w-5 px-1.5 text-[10px]",
        size === "md" && "h-6 min-w-6 px-2 text-xs",
        className,
      )}
      {...props}
    >
      {children}
    </kbd>
  )
})

Kbd.displayName = "Kbd"
