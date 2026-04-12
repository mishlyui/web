import { memo } from "react"
import { Spinner } from "@/components/ui/spinner"

export interface PageLoaderProps {
  text?: string
  showText?: boolean
}

export const PageLoader = memo(({ text = "Loading...", showText = false }: PageLoaderProps) => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Spinner size="md" />
        {showText && <p className="text-muted-foreground text-sm">{text}</p>}
      </div>
    </div>
  )
})

PageLoader.displayName = "PageLoader"
