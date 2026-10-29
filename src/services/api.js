import axios from 'axios';
import { message } from 'antd';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  
  // baseURL: import.meta.env.VITE_API_URL || 'http://3.25.141.103:5000/api',

  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('estateflow_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for unified error formatting & session management
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const data = error.response?.data;

    if (status === 401) {
      // Token expired or invalid
      const currentPath = window.location.pathname;
      if (!currentPath.includes('/login') && !currentPath.includes('/setup')) {
        localStorage.removeItem('estateflow_token');
        localStorage.removeItem('estateflow_user');
        message.warning('Session expired. Please sign in again.');
        window.location.href = '/login';
      }
    } else if (status === 403 && data?.message?.includes('deactivated')) {
      localStorage.removeItem('estateflow_token');
      localStorage.removeItem('estateflow_user');
      message.error(data.message || 'Your account has been deactivated.');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default api;
