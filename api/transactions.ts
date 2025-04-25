import api from './config';
import { Transaction } from '@/types/models';

interface TransactionFilters {
  type?: Transaction['type'];
  status?: Transaction['status'];
  page?: number;
  limit?: number;
  start_date?: string;
  end_date?: string;
}

interface TransactionResponse {
  items: Transaction[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

interface CreateTransactionData {
  amount: number;
  type: Transaction['type'];
}

const transactionsApi = {
  getTransactions: async (filters: TransactionFilters = {}, token: string): Promise<TransactionResponse> => {
    const response = await api.get('/transactions', {
      params: filters,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  getTransactionById: async (id: number, token: string): Promise<Transaction> => {
    const response = await api.get(`/transactions/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  createTransaction: async (data: CreateTransactionData, token: string): Promise<Transaction> => {
    const response = await api.post('/transactions', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  getUserTransactions: async (userId: number, filters: TransactionFilters = {}, token: string): Promise<TransactionResponse> => {
    const response = await api.get(`/users/${userId}/transactions`, {
      params: filters,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  getMarketTransactions: async (marketId: number, filters: TransactionFilters = {}, token: string): Promise<TransactionResponse> => {
    const response = await api.get(`/markets/${marketId}/transactions`, {
      params: filters,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  // For withdrawals and deposits
  initiateWithdrawal: async (amount: number, token: string): Promise<Transaction> => {
    const response = await api.post(
      '/transactions/withdraw',
      { amount },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  },

  initiateDeposit: async (amount: number, token: string): Promise<Transaction> => {
    const response = await api.post(
      '/transactions/deposit',
      { amount },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  },
};

export default transactionsApi; 