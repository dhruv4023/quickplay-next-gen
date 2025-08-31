// Schema-based API service factory
import { ApiResult, ApiResponse, ErrorResponse, isApiResponse } from '../schemas/Response.schema';
import api from './api';

export class SchemaBasedApiService<T> {
  private endpoint: string;
  private validator?: (data: any) => T;

  constructor(endpoint: string, validator?: (data: any) => T) {
    this.endpoint = endpoint;
    this.validator = validator;
  }

  async getAll(params?: Record<string, any>): Promise<ApiResult<T[]>> {
    try {
      const response = await api.get(this.endpoint, { params });
      const result: ApiResponse<T[]> = {
        success: true,
        message: response.data.message || 'Data retrieved successfully',
        timestamp: new Date().toISOString(),
        data: this.validator ? response.data.data.map(this.validator) : response.data.data,
        meta: response.data.meta
      };
      return result;
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  async getById(id: string): Promise<ApiResult<T>> {
    try {
      const response = await api.get(`${this.endpoint}/${id}`);
      const result: ApiResponse<T> = {
        success: true,
        message: response.data.message || 'Data retrieved successfully',
        timestamp: new Date().toISOString(),
        data: this.validator ? this.validator(response.data.data) : response.data.data
      };
      return result;
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  async create(data: Partial<T>): Promise<ApiResult<T>> {
    try {
      const response = await api.post(this.endpoint, data);
      const result: ApiResponse<T> = {
        success: true,
        message: response.data.message || 'Data created successfully',
        timestamp: new Date().toISOString(),
        data: this.validator ? this.validator(response.data.data) : response.data.data
      };
      return result;
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  async update(id: string, data: Partial<T>): Promise<ApiResult<T>> {
    try {
      const response = await api.put(`${this.endpoint}/${id}`, data);
      const result: ApiResponse<T> = {
        success: true,
        message: response.data.message || 'Data updated successfully',
        timestamp: new Date().toISOString(),
        data: this.validator ? this.validator(response.data.data) : response.data.data
      };
      return result;
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  async delete(id: string): Promise<ApiResult<boolean>> {
    try {
      const response = await api.delete(`${this.endpoint}/${id}`);
      const result: ApiResponse<boolean> = {
        success: true,
        message: response.data.message || 'Data deleted successfully',
        timestamp: new Date().toISOString(),
        data: true
      };
      return result;
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  private handleError(error: any): ErrorResponse {
    const errorResponse: ErrorResponse = {
      success: false,
      message: error?.response?.data?.message || 'An error occurred',
      timestamp: new Date().toISOString(),
      error: {
        code: error?.response?.data?.code || 'UNKNOWN_ERROR',
        type: this.getErrorType(error?.response?.status),
        details: error?.response?.data?.details || {},
        validationErrors: error?.response?.data?.validationErrors || []
      }
    };
    return errorResponse;
  }

  private getErrorType(status: number): string {
    switch (status) {
      case 400: return 'VALIDATION_ERROR';
      case 401: return 'AUTHENTICATION_ERROR';
      case 403: return 'AUTHORIZATION_ERROR';
      case 404: return 'NOT_FOUND_ERROR';
      case 409: return 'CONFLICT_ERROR';
      case 429: return 'RATE_LIMIT_ERROR';
      case 503: return 'MAINTENANCE_ERROR';
      default: return 'SERVER_ERROR';
    }
  }
}

// Type-safe API service creators
export const createLocationService = () => new SchemaBasedApiService('/locations');
export const createBookingService = () => new SchemaBasedApiService('/bookings');
export const createSessionService = () => new SchemaBasedApiService('/sessions');
export const createUserService = () => new SchemaBasedApiService('/users');
export const createAnalyticsService = () => new SchemaBasedApiService('/analytics');