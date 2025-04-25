import api from './config';
import { Prediction } from '@/types/models';

interface PredictionFilters {
  market_id?: number;
  user_id?: number;
  status?: Prediction['status'];
  page?: number;
  limit?: number;
}

interface PredictionResponse {
  items: Prediction[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

interface CreatePredictionData {
  market_id: number;
  amount: number;
  predicted_outcome: string;
}

const predictionsApi = {
  getPredictions: async (filters: PredictionFilters = {}, token: string): Promise<PredictionResponse> => {
    const response = await api.get('/predictions', {
      params: filters,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  getPredictionById: async (id: number, token: string): Promise<Prediction> => {
    const response = await api.get(`/predictions/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  createPrediction: async (data: CreatePredictionData, token: string): Promise<Prediction> => {
    const response = await api.post('/predictions', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  getUserPredictions: async (userId: number, filters: Omit<PredictionFilters, 'user_id'>, token: string): Promise<PredictionResponse> => {
    const response = await api.get(`/users/${userId}/predictions`, {
      params: filters,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  getMarketPredictions: async (marketId: number, filters: Omit<PredictionFilters, 'market_id'>, token: string): Promise<PredictionResponse> => {
    const response = await api.get(`/markets/${marketId}/predictions`, {
      params: filters,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
};

export default predictionsApi; 