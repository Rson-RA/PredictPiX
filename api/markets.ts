import api from './config';
import { Market } from '@/types/models';

interface MarketFilters {
  category?: string;
  status?: Market['status'];
  search?: string;
  page?: number;
  limit?: number;
}

interface MarketResponse {
  items: Market[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

const marketsApi = {
  getMarkets: async (filters: MarketFilters = {}): Promise<MarketResponse> => {
    const response = await api.get('/markets', {
      params: filters,
    });
    return response.data;
  },

  getMarketById: async (id: number): Promise<Market> => {
    const response = await api.get(`/markets/${id}`);
    return response.data;
  },

  getPopularMarkets: async (limit: number = 5): Promise<Market[]> => {
    const response = await api.get('/markets', {
      params: { limit },
    });
    return response.data;
  },

  getTrendingMarkets: async (limit: number = 5): Promise<Market[]> => {
    const response = await api.get('/markets/trending', {
      params: { limit },
    });
    return response.data;
  },

  getMarketsByCategory: async (category: string, filters: Omit<MarketFilters, 'category'> = {}): Promise<MarketResponse> => {
    const response = await api.get(`/markets/category/${category}`, {
      params: filters,
    });
    return response.data;
  },
};

export default marketsApi; 