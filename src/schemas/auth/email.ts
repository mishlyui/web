import { z } from "zod"

export const emailSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .toLowerCase()
    .trim(),
})

export type EmailInput = z.infer<typeof emailSchema>
