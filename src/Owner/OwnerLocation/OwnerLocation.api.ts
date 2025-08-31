import { Location } from '../../schemas/Location/OwnerLocation.schema';
import api from '../../utils/api';
import { ApiResponse, ErrorResponse } from '../../schemas/Response.schema';


export const createLocationApiCall = async (locationData: Location, token: string): Promise<ApiResponse|ErrorResponse> => {
    try {
        const { _id, ...locationDataWithoutId } = locationData;
        locationDataWithoutId.sports = locationDataWithoutId.sports.map((sport: any) => {
            delete sport._id;
            return sport;
        });
        const response = await api.post('/location/create', locationDataWithoutId, {
            headers: {
                'Authorization': `${token}`
            }
        });
        return {
            success: true,
            data: response.data.data.location,
            message: response.data.message
        }
    } catch (error: any) {
        return {
            success: false,
            error: error,
            message: error.response?.data?.message || 'An error occurred with the API request'
        }
    }
}

export const getLocationApiCall = async (locationId: string, token: string): Promise<ApiResponse|ErrorResponse> => {
    try {
        const response = await api.get(`/location/${locationId}`, {
            headers: {
                'Authorization': `${token}`
            }
        });
        return {
            success: true,
            data: response.data.data.location,
            message: response.data.message
        }
    } catch (error: any) {
        return {
            success: false,
            error: error,
            message: error.response?.data?.message || 'An error occurred with the API request'
        }
    }
}

export const updateLocationApiCall = async (locationId: string, locationData: Location, token: string): Promise<ApiResponse|ErrorResponse> => {
    try {
        locationData.sports = locationData.sports.map((sport: any) => {
            delete sport._id;
            return sport;
        });
        const response = await api.put(`/location/${locationId}`, locationData, {
            headers: {
                'Authorization': `${token}`
            }
        });
        return {
            success: true,
            data : response.data.data.location,
            message: response.data.message
        }
    } catch (error: any) {
        return {
            success: false,
            error: error,
            message: error.response?.data?.message || 'An error occurred with the API request'
        }
    }
}

export const getAllLocationsApiCall = async (token: string): Promise<ApiResponse|ErrorResponse> => {
    try {
        const response = await api.get('/location/all', {
            headers: {
                'Authorization': `${token}`
            }
        });
        return {
            success: true,
            data: response.data.data.locations,
            message: response.data.message
        }
    } catch (error: any) {   
        return {
            success: false,
            error: error,
            message: error.response?.data?.message || 'An error occurred with the API request'
        }
    }   
}

export const deleteLocationApiCall = async (locationId: string, token: string): Promise<ApiResponse|ErrorResponse> => {
    try {
        const response = await api.delete(`/location/${locationId}`, {
            headers: {
                'Authorization': `${token}`
            }
        });
        return {
            success: true,
            data: {},
            message: response?.data?.message
        }
    } catch (error: any) {
        return {
            success: false,
            error: error,
            message: error.response?.data?.message || 'An error occurred with the API request'
        }
    }
}
