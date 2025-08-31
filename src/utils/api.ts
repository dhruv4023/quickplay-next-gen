import axios from 'axios';
import { setToken } from '../state/slices/authSlice';
import { store } from '../state/store';

const api = axios.create({
    baseURL: import.meta.env.VITE_APP_REST_API,
    headers: {
        'Content-Type': 'application/json',
    },
});

const ignoredUrls = ["/owner/login", "/player/login", "/owner/otp/create", "/player/otp/create", "/owner/otp/verify", "/player/otp/verify",  "/player/otp/refresh"];

// Add response interceptor to handle 401 errors
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        // If error is 401 and we haven't already tried refreshing
        if (error.response?.status === 401 && !originalRequest._retry && !ignoredUrls.includes(originalRequest.url || "")) {
            originalRequest._retry = true;
            try {
                const state = store.getState();
                const refreshToken = state.auth.refreshToken;

                if (!refreshToken) {
                    throw new Error('No refresh token available');
                }

                const response = await axios.post(
                    `${import.meta.env.VITE_APP_REST_API}/player/otp/refresh`,
                    { refreshToken },
                    {
                        headers: { 'Content-Type': 'application/json' }
                    }
                );

                const newToken = response.data.data.token;
                store.dispatch(setToken({ token: newToken }));
                console.log("Token refreshed successfully");
                // Update the original request with new token
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default api;
