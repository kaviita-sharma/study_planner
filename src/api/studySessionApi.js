import apiService from './apiService';

export const studySessionApi = {
  getAllSessions: async () => {
    const response = await apiService.get('/api/study-sessions');
    return response.data;
  },

  getSessionById: async (id) => {
    const response = await apiService.get(`/api/study-sessions/${id}`);
    return response.data;
  },

  createSession: async (sessionData) => {
    const response = await apiService.post('/api/study-sessions', sessionData);
    return response.data;
  },

  updateSession: async (id, sessionData) => {
    const response = await apiService.put(`/api/study-sessions/${id}`, sessionData);
    return response.data;
  },

  deleteSession: async (id) => {
    const response = await apiService.delete(`/api/study-sessions/${id}`);
    return response.data;
  }
};