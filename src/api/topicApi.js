import apiService from './apiService';

export const topicApi = {
  getAllTopics: async () => {
    const response = await apiService.get('/api/Topics');
    return response.data;
  },

  getTopicById: async (id) => {
    const response = await apiService.get(`/api/Topics/${id}`);
    return response.data;
  },

  createTopic: async (topicData) => {
    const response = await apiService.post('/api/Topics', topicData);
    return response.data;
  },

  updateTopic: async (id, topicData) => {
    const response = await apiService.put(`/api/Topics/${id}`, topicData);
    return response.data;
  },

  deleteTopic: async (id) => {
    const response = await apiService.delete(`/api/Topics/${id}`);
    return response.data;
  }
};