"use client"

import { cn } from "@/lib/utils/cn"
import { SearchIcon } from "@/components/ui/icons"
import { Kbd } from "@/components/ui/kbd"
import { ButtonHTMLAttributes, memo } from "react"

export interface SearchButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  placeholder?: string
  shortcut?: string
  showShortcut?: boolean
}

export const SearchButton = memo(
  ({
    className,
    placeholder = "Search..",
    shortcut = "⌘K",
    showShortcut = true,
    disabled,
    ...props
  }: SearchButtonProps) => {
    return (
      <button
        aria-label="Search components"
        className={cn(
          "border-border bg-card text-muted-foreground group flex h-9 w-60 items-center justify-between gap-2 rounded-md border px-3.5 text-[13px] transition-colors",
          disabled ? "cursor-not-allowed opacity-50" : "hover:bg-muted/50 cursor-pointer",
          className,
        )}
        disabled={disabled}
        {...props}
      >
        <div className="flex items-center gap-2.5">
          <SearchIcon className="h-4 w-4 shrink-0" />
          <span className="truncate">{placeholder}</span>
        </div>
        {showShortcut && <Kbd size="sm">{shortcut}</Kbd>}
      </button>
    )
  },
)

SearchButton.displayName = "SearchButton"
