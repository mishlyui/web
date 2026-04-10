import { useState, useCallback } from "react"
import { z } from "zod"

export const useFormValidation = <T extends z.ZodType>(schema: T) => {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = useCallback(
    (data: unknown): data is z.infer<T> => {
      try {
        schema.parse(data)
        setErrors({})
        return true
      } catch (error) {
        if (error instanceof z.ZodError) {
          const fieldErrors: Record<string, string> = {}
          error.issues.forEach((issue) => {
            if (issue.path[0]) {
              fieldErrors[issue.path[0].toString()] = issue.message
            }
          })
          setErrors(fieldErrors)
        }
        return false
      }
    },
    [schema],
  )

  const clearError = useCallback((field: string) => {
    setErrors((prev) => {
      const newErrors = { ...prev }
      delete newErrors[field]
      return newErrors
    })
  }, [])

  const clearErrors = useCallback(() => {
    setErrors({})
  }, [])

  return { errors, validate, clearError, clearErrors }
}
