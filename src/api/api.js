// src/api/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/', // Adjust to your API's base URL
    headers: {
        'Content-Type': 'application/json'
    }
});

const refreshToken = async () => {
    try {
        const response = await axios.post('http://localhost:5000/refresh', {}, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('refreshToken')}` }
        });
        localStorage.setItem('accessToken', response.data.access_token);
        return response.data.access_token;
    } catch (error) {
        console.error('Refresh token failed', error);
        throw error;
    }
};

api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        // Check the URL to exclude logout from auto-refresh logic
        if (error.response.status === 401 && !originalRequest._retry && !originalRequest.url.includes('/logout')) {
            originalRequest._retry = true;
            try {
                const newAccessToken = await refreshToken();
                api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default api;
