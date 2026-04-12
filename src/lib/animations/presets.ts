import type { Transition } from "framer-motion"
import { fadeIn, slideDown, slideFromLeft } from "./variants"
import { DURATION, STAGGER_DELAY } from "./constants"

const prefersReducedMotion =
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

function getTransition(transition: Transition): Transition {
  if (prefersReducedMotion) {
    return { duration: 0 }
  }
  return transition
}

export const headerAnimation = {
  ...fadeIn,
  transition: getTransition({ duration: DURATION.slow }),
}

export const mobileMenuAnimation = {
  ...slideDown,
  transition: getTransition({ duration: DURATION.normal, ease: "easeInOut" }),
}

export function iconRotateAnimation(isOpen: boolean) {
  return {
    initial: { opacity: 0, rotate: isOpen ? -90 : 90 },
    animate: { opacity: 1, rotate: 0 },
    exit: { opacity: 0, rotate: isOpen ? 90 : -90 },
    transition: getTransition({ duration: DURATION.slow, ease: "easeInOut" }),
  }
}

export function staggerItemAnimation(index: number) {
  return {
    ...slideFromLeft,
    transition: getTransition({
      duration: DURATION.normal,
      delay: index * STAGGER_DELAY,
    }),
  }
}
