import { NextResponse } from "next/server"
import type {
  ApiSuccessResponse,
  ApiErrorResponse,
  ApiMetadata,
  ResponseOptions,
  ErrorOptions,
} from "@/types/api"
import { API_CONFIG, API_STATUS_CODES, API_ERROR_CODES, API_ERROR_MESSAGES } from "@/constants/api"

function createMetadata(options?: ResponseOptions): ApiMetadata {
  return {
    timestamp: new Date().toISOString(),
    requestId: options?.requestId || crypto.randomUUID(),
    version: options?.version || API_CONFIG.DEFAULT_VERSION,
    source: options?.source || API_CONFIG.DEFAULT_SOURCE,
  }
}

export function apiSuccess<T>(data: T, options?: ResponseOptions) {
  return NextResponse.json<ApiSuccessResponse<T>>(
    {
      success: true,
      data,
      ...(options?.message && { message: options.message }),
      metadata: createMetadata(options),
    },
    { status: API_STATUS_CODES.OK },
  )
}

export function apiCreated<T>(data: T, options?: ResponseOptions) {
  return NextResponse.json<ApiSuccessResponse<T>>(
    {
      success: true,
      data,
      ...(options?.message && { message: options.message }),
      metadata: createMetadata(options),
    },
    { status: API_STATUS_CODES.CREATED },
  )
}

export function apiError(message: string, status: number, options?: ErrorOptions) {
  return NextResponse.json<ApiErrorResponse>(
    {
      success: false,
      error: {
        message,
        ...(options?.code && { code: options.code }),
        ...(options?.details && { details: options.details }),
      },
      metadata: createMetadata(options),
    },
    { status },
  )
}

export function apiBadRequest(message: string, options?: ErrorOptions) {
  return apiError(message, API_STATUS_CODES.BAD_REQUEST, options)
}

export function apiUnauthorized(message = API_ERROR_MESSAGES.UNAUTHORIZED, options?: ErrorOptions) {
  return apiError(message, API_STATUS_CODES.UNAUTHORIZED, {
    ...options,
    code: options?.code || API_ERROR_CODES.UNAUTHORIZED,
  })
}

export function apiForbidden(message = API_ERROR_MESSAGES.FORBIDDEN, options?: ErrorOptions) {
  return apiError(message, API_STATUS_CODES.FORBIDDEN, {
    ...options,
    code: options?.code || API_ERROR_CODES.FORBIDDEN,
  })
}

export function apiNotFound(message = API_ERROR_MESSAGES.NOT_FOUND, options?: ErrorOptions) {
  return apiError(message, API_STATUS_CODES.NOT_FOUND, {
    ...options,
    code: options?.code || API_ERROR_CODES.NOT_FOUND,
  })
}

export function apiValidationError(
  message = API_ERROR_MESSAGES.VALIDATION_FAILED,
  details?: Record<string, any>,
  options?: ErrorOptions,
) {
  return apiError(message, API_STATUS_CODES.VALIDATION_ERROR, {
    ...options,
    code: options?.code || API_ERROR_CODES.VALIDATION_ERROR,
    details,
  })
}

export function apiInternalError(message?: string, options?: ErrorOptions) {
  return apiError(message || API_ERROR_MESSAGES.INTERNAL_ERROR, API_STATUS_CODES.INTERNAL_ERROR, {
    ...options,
    code: options?.code || API_ERROR_CODES.INTERNAL_ERROR,
  })
}
