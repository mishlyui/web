import { memo } from "react"
import { Skeleton } from "@/components/ui/skeleton"

export const ComponentCardSkeleton = memo(() => {
  return (
    <div className="border-border/50 bg-card flex h-full flex-col rounded-xl border p-1">
      <div className="bg-muted relative flex aspect-auto items-center justify-center overflow-hidden rounded-lg">
        <Skeleton className="h-full min-h-[200px] w-full" />
      </div>

      <div className="flex flex-1 flex-col justify-center px-1 py-3">
        <div className="flex items-center justify-between">
          <div className="flex-1 space-y-2">
            <Skeleton variant="text" className="h-4 w-3/4" />
            <Skeleton variant="text" className="h-3 w-1/2" />
          </div>
          <Skeleton variant="text" className="h-3 w-12" />
        </div>
      </div>
    </div>
  )
})

ComponentCardSkeleton.displayName = "ComponentCardSkeleton"
