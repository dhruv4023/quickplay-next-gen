export interface ApiResponse {
    success: boolean;
    message: string;
    data: Object
}

export interface ErrorResponse {
    success: boolean;
    message: string;
    error: any
}

export const isApiResponse = (response: ApiResponse | ErrorResponse): response is ApiResponse => {
    return response.success;
};
