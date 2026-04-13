"use client"

import { useEffect, useRef } from "react"
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

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const playVideo = async () => {
      try {
        await video.play()
      } catch (error) {
        console.error("Video autoplay failed:", error)
      }
    }

    playVideo()
  }, [])

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      autoPlay
      loop
      muted={muted}
      playsInline={playsInline}
      preload="metadata"
      className={cn("h-auto w-full", className)}
      style={{ pointerEvents: "none" }}
    />
  )
}
