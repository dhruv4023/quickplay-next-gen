import { ApiResponse, ErrorResponse } from '../../schemas/Response.schema';
import { SessionTemplate } from '../../schemas/SessionTemplate/SessionTemplate';
import api from '../../utils/api';

export const getAllSessionTemplatesApi = async (token: string): Promise<ApiResponse | ErrorResponse> => {
    try {
        const response = await api.get('/sessionTemplet', {
            headers: {
                'Authorization': token,
            },
        });
        return { success: true, message: response.data.message || 'Session templates fetched successfully', data: response.data.data.sessionTemplets };
    } catch (error) {
        console.error('Error fetching session templates:', error);
        return { success: false, message: 'Error fetching session templates', error: error };
    }
};


export const createSessionTemplateApi = async (token: string, data: SessionTemplate): Promise<ApiResponse | ErrorResponse> => {
    try {
        const response = await api.post('/sessionTemplet/create', data, {
            headers: {
                'Authorization': token,
            },
        });
        return { success: true, message: response.data.message || 'Session template created successfully', data: response.data.data };
    } catch (error) {
        console.error('Error creating session template:', error);
        return { success: false, message: 'Error creating session template', error: error };
    }
};

export const updateSessionTemplateApi = async (token: string, data: SessionTemplate): Promise<ApiResponse | ErrorResponse> => {
    try {
        const response = await api.put(`/sessionTemplet/${data._id}`, data, {
            headers: {
                'Authorization': token,
            },
        });
        return { success: true, message: response.data.message || 'Session template updated successfully', data: response.data.data };
    } catch (error) {
        console.error('Error updating session template:', error);
        return { success: false, message: 'Error updating session template', error: error };
    }
};

export const deleteSessionTemplateApi = async (token: string, id: string): Promise<ApiResponse | ErrorResponse> => {
    try {
        const response = await api.delete(`/sessionTemplet/${id}`, {
            headers: {
                'Authorization': token,
            },
        });
        return { success: true, message: response.data.message || 'Session template deleted successfully', data: response.data.data };
    } catch (error) {
        console.error('Error deleting session template:', error);
        return { success: false, message: 'Error deleting session template', error: error };
    }
};      

export const getLocationSortsApi = async (token: string): Promise<ApiResponse | ErrorResponse> => {
    try {
        const response = await api.get('/sessionTemplet/locations', {
            headers: {
                'Authorization': token,
            },
        });
        return { success: true, message: response.data.message || 'Location sorts fetched successfully', data: response.data.data.locations };
    } catch (error) {
        console.error('Error fetching location sorts:', error);
        return { success: false, message: 'Error fetching location sorts', error: error };
    }
}
