import { API_ERROR_MESSAGES, API_STATUS_CODES } from "@/constants/api"

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public code?: string,
  ) {
    super(message)
    this.name = "ApiError"
  }
}

export function handleApiError(error: unknown) {
  if (error instanceof ApiError) {
    return {
      error: error.message,
      code: error.code,
      statusCode: error.statusCode,
    }
  }

  if (error instanceof Error) {
    console.error("Unexpected error:", error)
    return {
      error: API_ERROR_MESSAGES.INTERNAL_ERROR,
      statusCode: API_STATUS_CODES.INTERNAL_ERROR,
    }
  }

  return {
    error: API_ERROR_MESSAGES.UNKNOWN_ERROR,
    statusCode: API_STATUS_CODES.INTERNAL_ERROR,
  }
}
