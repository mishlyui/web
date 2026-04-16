"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Skeleton } from "./skeleton"

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
  const [isLoading, setIsLoading] = useState(true)

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
      setIsLoading(false)
      video.play().catch(() => {})
    }

    const handleLoadedData = () => {
      setIsLoading(false)
    }

    video.addEventListener("canplay", handleCanPlay)
    video.addEventListener("loadeddata", handleLoadedData)

    if (video.readyState >= 2) {
      setIsLoading(false)
      video.play().catch(() => {})
    }

    return () => {
      video.removeEventListener("canplay", handleCanPlay)
      video.removeEventListener("loadeddata", handleLoadedData)
    }
  }, [shouldLoad])

  if (!shouldLoad) {
    return (
      <div
        ref={containerRef}
        className={cn("bg-muted relative h-auto w-full", className)}
        style={{ aspectRatio: "16/9" }}
      >
        <Skeleton className="absolute inset-0" aria-label="Loading video" />
      </div>
    )
  }

  return (
    <div ref={containerRef} className="relative">
      {isLoading && (
        <Skeleton
          className="absolute inset-0 z-10"
          style={{ aspectRatio: "16/9" }}
          aria-label="Loading video"
        />
      )}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        loop
        muted={muted}
        playsInline={playsInline}
        preload="metadata"
        className={cn(
          "h-auto w-full transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100",
          className,
        )}
        style={{ pointerEvents: "none" }}
      />
    </div>
  )
}
