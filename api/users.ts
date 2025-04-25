import api from './config';
import { User, Trader, Profile } from '@/types/models';

const usersApi = {
  getTopTraders: async (period: 'day' | 'week' | 'month' | 'all' = 'week', limit: number = 10): Promise<Trader[]> => {
    const response = await api.get('/users', {
      params: {
        period,
        limit,
      },
    });
    return response.data;
  },

  getTraderStats: async (userId: number): Promise<{
    total_profit: number;
    total_predictions: number;
    win_rate: number;
    rank: number;
  }> => {
    const response = await api.get(`/users/${userId}/stats`);
    return response.data;
  },

  searchTraders: async (query: string, page: number = 1, limit: number = 10): Promise<Trader[]> => {
    const response = await api.get('/users', {
      params: {
        query,
        page,
        limit,
      },
    });
    return response.data;
  },

  getProfile: async (id: number): Promise<Profile> => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  updateUser: async (id: number, data: Partial<User>): Promise<Profile> => {
    const response = await api.patch<Profile>(`/users/${id}`, data);
    return response.data;
  },

  getPortfolio: async (id: number): Promise<Trader> => {
    const response = await api.get(`/users/${id}/portfolio`);
    return response.data;
  },

  updateUserAvatar : async (id: number, file: File): Promise<User> => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post<User>(`/users/${id}/avatar`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },
  
  deleteUserAvatar : async (id: number): Promise<User> => {
    const response = await api.delete<User>(`/users/${id}/avatar`);
    return response.data;
  },
};

export default usersApi; 