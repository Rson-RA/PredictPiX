import api from './config';

interface UserBase {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  avatar_url: string | null;
}

export interface Trader extends UserBase {
  total_profit: number;
  total_predictions: number;
  win_rate: number;
  rank?: number;
  balance: number;
}

export interface Profile extends UserBase {
  email: string;
  phone_number: string;
  role: string;
  balance: number;
  referral_code: string;
  total_referrals: number;
  total_earnings_from_referrals: number;
  total_profit: number;
  predictions: number;
  win_rate: number;
  rank: number;
  created_at: string;
  updated_at: string;
}

interface TraderResponse {
  items: Trader[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

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

  updateUser: async (id: number, data: Partial<UserBase>): Promise<Profile> => {
    const response = await api.put(`/users/${id}`, data);
    return response.data;
  },

  getPortfolio: async (id: number): Promise<Trader> => {
    const response = await api.get(`/users/${id}/portfolio`);
    return response.data;
  },
};

export default usersApi; 