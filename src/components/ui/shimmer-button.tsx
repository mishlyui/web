import { cn } from "@/lib/utils"
import React, { type ComponentPropsWithoutRef, type CSSProperties } from "react"

export interface ShimmerButtonProps extends ComponentPropsWithoutRef<"button"> {
  shimmerColor?: string
  shimmerSize?: string
  borderRadius?: string
  shimmerDuration?: string
  background?: string
  className?: string
  children?: React.ReactNode
}

export const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  (
    {
      shimmerColor = "#ffffff",
      shimmerSize = "0.05em",
      shimmerDuration = "3s",
      borderRadius = "0.5rem",
      background = "hsl(0 0% 13%)",
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        style={
          {
            "--spread": "90deg",
            "--shimmer-color": shimmerColor,
            "--radius": borderRadius,
            "--speed": shimmerDuration,
            "--cut": shimmerSize,
            "--bg": background,
          } as CSSProperties
        }
        className={cn(
          "group border-border text-card-foreground relative z-0 flex cursor-pointer items-center justify-center overflow-hidden [border-radius:var(--radius)] border px-6 py-2.5 whitespace-nowrap [background:var(--bg)]",
          "transform-gpu transition-all duration-300 ease-in-out hover:opacity-90 active:translate-y-px",
          "text-sm font-semibold",
          className,
        )}
        ref={ref}
        {...props}
      >
        <div className={cn("@container-[size] absolute inset-0 -z-30 overflow-visible blur-[2px]")}>
          <div className="animate-shimmer-slide absolute inset-0 aspect-[1] h-[100cqh] rounded-none [mask:none]">
            <div className="animate-spin-around absolute -inset-full w-auto [translate:0_0] rotate-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))]" />
          </div>
        </div>

        {children}

        <div
          className={cn(
            "absolute inset-0 size-full",
            "[border-radius:var(--radius)] px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#ffffff1f]",
            "transform-gpu transition-all duration-300 ease-in-out",
            "group-hover:shadow-[inset_0_-6px_10px_#ffffff3f]",
            "group-active:shadow-[inset_0_-10px_10px_#ffffff3f]",
          )}
        />

        <div
          className={cn(
            "absolute inset-(--cut) -z-20 [border-radius:var(--radius)] [background:var(--bg)]",
          )}
        />
      </button>
    )
  },
)

ShimmerButton.displayName = "ShimmerButton"
