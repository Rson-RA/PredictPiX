import api from './config';
import { PlacePredictResponse, Prediction } from '@/types/models';

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
  predicted_outcome: boolean;
}

const predictionsApi = {
  getPredictions: async (filters: PredictionFilters = {} ): Promise<Prediction[]> => {
    const response = await api.get('/predictions', {
      params: filters,
    });
    return response.data;
  },

  getPredictionById: async (id: number ): Promise<Prediction> => {
    const response = await api.get(`/predictions/${id}`);
    return response.data;
  },

  createPrediction: async (data: CreatePredictionData ): Promise<Prediction> => {
    const response = await api.post('/predictions/create', data);
    return response.data;
  },

  placePrediction: async (data: CreatePredictionData ): Promise<PlacePredictResponse> => {
    const response = await api.post(`/markets/${data.market_id}/predict?predicted_outcome=${data.predicted_outcome}&amount=${data.amount}`);
    return response.data;
  },

  getUserPredictions: async (userId: number, filters: Omit<PredictionFilters, 'user_id'> ): Promise<PredictionResponse> => {
    const response = await api.get(`/users/${userId}/predictions`, {
      params: filters
    });
    return response.data;
  },

  getMarketPredictions: async (marketId: number, filters: Omit<PredictionFilters, 'market_id'> ): Promise<PredictionResponse> => {
    const response = await api.get(`/markets/${marketId}/predictions`, {
      params: filters,
    });
    return response.data;
  },
};

export default predictionsApi; 