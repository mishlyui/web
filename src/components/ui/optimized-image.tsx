"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface OptimizedImageProps {
  src: string
  alt: string
  className?: string
  priority?: boolean
  fill?: boolean
  width?: number
  height?: number
  sizes?: string
}

export function OptimizedImage({
  src,
  alt,
  className,
  priority = false,
  fill = false,
  width,
  height,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className={cn("overflow-hidden", className)}>
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        sizes={sizes}
        priority={priority}
        quality={90}
        className={cn(
          "duration-300 ease-in-out",
          isLoading ? "scale-105 blur-sm" : "blur-0 scale-100",
          fill ? "object-cover" : "h-full w-full object-cover",
        )}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  )
}
