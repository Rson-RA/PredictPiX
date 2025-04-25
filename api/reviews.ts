import api from './config';
import { Review } from '@/types/models';

interface ReviewFilters {
  market_id?: number;
  user_id?: number;
  rating?: number;
  page?: number;
  limit?: number;
}

interface ReviewResponse {
  items: Review[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

interface CreateReviewData {
  market_id: number;
  rating: number;
  comment: string;
}

interface MarketReviewStats {
  average_rating: number;
  total_reviews: number;
  rating_distribution: {
    [key: number]: number;
  };
}

const reviewsApi = {
  getReviews: async (filters: ReviewFilters = {}, token: string): Promise<ReviewResponse> => {
    const response = await api.get('/reviews', {
      params: filters,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  getReviewById: async (id: number, token: string): Promise<Review> => {
    const response = await api.get(`/reviews/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  createReview: async (data: CreateReviewData, token: string): Promise<Review> => {
    const response = await api.post('/reviews', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  updateReview: async (id: number, data: Partial<CreateReviewData>, token: string): Promise<Review> => {
    const response = await api.put(`/reviews/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  deleteReview: async (id: number, token: string): Promise<void> => {
    await api.delete(`/reviews/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  getUserReviews: async (userId: number, filters: Omit<ReviewFilters, 'user_id'>, token: string): Promise<ReviewResponse> => {
    const response = await api.get(`/users/${userId}/reviews`, {
      params: filters,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  getMarketReviews: async (marketId: number, filters: Omit<ReviewFilters, 'market_id'>, token: string): Promise<ReviewResponse> => {
    const response = await api.get(`/markets/${marketId}/reviews`, {
      params: filters,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  getMarketReviewStats: async (marketId: number): Promise<MarketReviewStats> => {
    const response = await api.get(`/markets/${marketId}/review-stats`);
    return response.data;
  },
};

export default reviewsApi; 