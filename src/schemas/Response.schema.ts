// Enhanced Response Schema with better error handling and metadata
export interface BaseResponse {
  success: boolean;
  message: string;
  timestamp?: string;
  requestId?: string;
  version?: string;
}

export interface ApiResponse<T = any> extends BaseResponse {
  success: true;
  data: T;
  meta?: ResponseMeta;
}

export interface ErrorResponse extends BaseResponse {
  success: false;
  error?: ErrorDetails;
}

export interface ResponseMeta {
  total?: number;
  page?: number;
  limit?: number;
  hasNext?: boolean;
  hasPrevious?: boolean;
  totalPages?: number;
  processingTime?: number;
  cacheHit?: boolean;
}

export interface ErrorDetails {
  code: string;
  type: ErrorType;
  details?: Record<string, any>;
  stack?: string;
  validationErrors?: ValidationError[];
  innerError?: ErrorDetails;
}

export type ErrorType = 
  | 'VALIDATION_ERROR'
  | 'AUTHENTICATION_ERROR'
  | 'AUTHORIZATION_ERROR'
  | 'NOT_FOUND_ERROR'
  | 'CONFLICT_ERROR'
  | 'RATE_LIMIT_ERROR'
  | 'SERVER_ERROR'
  | 'EXTERNAL_SERVICE_ERROR'
  | 'MAINTENANCE_ERROR';

export interface ValidationError {
  field: string;
  message: string;
  value?: any;
  constraint?: string;
}

// Type guards with better error information
export const isApiResponse = <T>(response: ApiResponse<T> | ErrorResponse): response is ApiResponse<T> => {
  return response.success === true;
};

export const isErrorResponse = (response: ApiResponse | ErrorResponse): response is ErrorResponse => {
  return response.success === false;
};

// Generic API response types
export type ApiResult<T> = ApiResponse<T> | ErrorResponse;

// API Configuration
export interface ApiConfig {
  baseURL: string;
  timeout: number;
  retryAttempts: number;
  retryDelay: number;
  headers: Record<string, string>;
}

// Request/Response interceptors
export interface RequestInterceptor {
  onRequest?: (config: any) => any;
  onRequestError?: (error: any) => any;
}

export interface ResponseInterceptor {
  onResponse?: (response: any) => any;
  onResponseError?: (error: any) => any;
}