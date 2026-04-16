import { useEffect, RefObject } from "react"

export function useFocusTrap(ref: RefObject<HTMLElement | null>, isActive: boolean) {
  useEffect(() => {
    if (!isActive || !ref.current) return

    const element = ref.current
    const focusableElements = element.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    )

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement?.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement?.focus()
        }
      }
    }

    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        const closeButton = element.querySelector<HTMLElement>('[aria-label*="close"]')
        closeButton?.click()
      }
    }

    element.addEventListener("keydown", handleTabKey)
    element.addEventListener("keydown", handleEscapeKey)

    firstElement?.focus()

    return () => {
      element.removeEventListener("keydown", handleTabKey)
      element.removeEventListener("keydown", handleEscapeKey)
    }
  }, [ref, isActive])
}
