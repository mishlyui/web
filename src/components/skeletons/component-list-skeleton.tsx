import { memo } from "react"
import { ComponentCardSkeleton } from "./component-card-skeleton"

interface ComponentListSkeletonProps {
  count?: number
}

export const ComponentListSkeleton = memo(({ count = 3 }: ComponentListSkeletonProps) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:auto-rows-fr lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <ComponentCardSkeleton key={index} />
      ))}
    </div>
  )
})

ComponentListSkeleton.displayName = "ComponentListSkeleton"
