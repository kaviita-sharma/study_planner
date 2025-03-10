import apiService from './apiService';

export const subjectApi = {
  getAllSubjects: async () => {
    const response = await apiService.get('/api/Subjects');
    return response.data;
  },

  getSubjectById: async (id) => {
    const response = await apiService.get(`/api/Subjects/${id}`);
    return response.data;
  },

  createSubject: async (subjectData) => {
    const response = await apiService.post('/api/Subjects/AddSubjectWithDetails', subjectData);
    return response.data;
  },

  updateSubject: async (id, subjectData) => {
    const response = await apiService.put(`/api/Subjects/${id}`, subjectData);
    return response.data;
  },

  deleteSubject: async (id) => {
    const response = await apiService.delete(`/api/Subjects/${id}`);
    return response.data;
  }
};