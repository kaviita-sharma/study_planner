import apiService from './apiService';

export const progressApi = {
  getAllProgress: async () => {
    const response = await apiService.get('/api/Progress');
    return response.data;
  },

  getProgressById: async (id) => {
    const response = await apiService.get(`/api/Progress/${id}`);
    return response.data;
  },

  createProgress: async (progressData) => {
    const response = await apiService.post('/api/Progress', progressData);
    return response.data;
  },

  updateProgress: async (id, progressData) => {
    const response = await apiService.put(`/api/Progress/${id}`, progressData);
    return response.data;
  },

  deleteProgress: async (id) => {
    const response = await apiService.delete(`/api/Progress/${id}`);
    return response.data;
  }
};