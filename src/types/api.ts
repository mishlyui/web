export interface ApiMetadata {
  timestamp: string
  requestId?: string
  version?: string
  source?: string
}

export interface ApiSuccessResponse<T = any> {
  success: true
  data: T
  message?: string
  metadata: ApiMetadata
}

export interface ApiErrorResponse {
  success: false
  error: {
    message: string
    code?: string
    details?: Record<string, any>
  }
  metadata: ApiMetadata
}

export type ApiResponse<T = any> = ApiSuccessResponse<T> | ApiErrorResponse

export interface ResponseOptions {
  message?: string
  requestId?: string
  version?: string
  source?: string
}

export interface ErrorOptions extends ResponseOptions {
  code?: string
  details?: Record<string, any>
}
