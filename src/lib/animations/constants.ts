export const DURATION = {
  fast: 0.15,
  normal: 0.2,
  slow: 0.3,
} as const

export const EASING = {
  easeInOut: [0.4, 0, 0.2, 1] as const,
  easeOut: [0, 0, 0.2, 1] as const,
  easeIn: [0.4, 0, 1, 1] as const,
} as const

export const STAGGER_DELAY = 0.05
