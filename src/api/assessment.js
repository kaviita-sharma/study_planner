import apiService from './apiService';

export const assessmentApi = {
  getAllAssessments: async () => {
    const response = await apiService.get('/api/Assessments');
    return response.data;
  },

  getAssessmentById: async (id) => {
    const response = await apiService.get(`/api/Assessments/${id}`);
    return response.data;
  },

  createAssessment: async (assessmentData) => {
    const response = await apiService.post('/api/Assessments', assessmentData);
    return response.data;
  },

  updateAssessment: async (id, assessmentData) => {
    const response = await apiService.put(`/api/Assessments/${id}`, assessmentData);
    return response.data;
  },

  deleteAssessment: async (id) => {
    const response = await apiService.delete(`/api/Assessments/${id}`);
    return response.data;
  }
};