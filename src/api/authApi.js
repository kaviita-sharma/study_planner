import apiService from './apiService';

export const authApi = {
  register: async (userData) => {
    const response = await apiService.post('/api/auth/register', userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await apiService.post('/api/auth/login', credentials);
    return response.data;
  },

  logout: async () => {
    const response = await apiService.post('/api/auth/logout');
    return response.data;
  },

  getProfile: async () => {
    const response = await apiService.get('/api/auth/profile');
    return response.data;
  },

  updateProfile: async (profileData) => {
    const response = await apiService.put('/api/auth/profile', profileData);
    return response.data;
  }
};