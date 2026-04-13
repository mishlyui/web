"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface OptimizedVideoProps {
  src: string
  poster?: string
  className?: string
  muted?: boolean
  playsInline?: boolean
}

export function OptimizedVideo({
  src,
  poster,
  className,
  muted = true,
  playsInline = true,
}: OptimizedVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true)
          }
        })
      },
      { threshold: 0.5 },
    )

    observer.observe(container)

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !shouldLoad) return

    const handleCanPlay = () => {
      video.play().catch(() => {})
    }

    video.addEventListener("canplay", handleCanPlay)

    if (video.readyState >= 2) {
      video.play().catch(() => {})
    }

    return () => {
      video.removeEventListener("canplay", handleCanPlay)
    }
  }, [shouldLoad])

  if (!shouldLoad) {
    return (
      <div
        ref={containerRef}
        className={cn("bg-muted h-auto w-full", className)}
        style={{ aspectRatio: "16/9" }}
      />
    )
  }

  return (
    <div ref={containerRef}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        loop
        muted={muted}
        playsInline={playsInline}
        preload="metadata"
        className={cn("h-auto w-full", className)}
        style={{ pointerEvents: "none" }}
      />
    </div>
  )
}
