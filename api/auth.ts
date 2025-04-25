import api from './config';
import { User } from '@/types/models';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  username: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
}

export interface AuthResponse extends User {
  access_token: string;
  token_type: string;
}

const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post('/auth/email/login', credentials);
    return response.data;
  },

  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', credentials);
    return response.data;
  },

  validateToken: async (token: string): Promise<{ status: string; user_id: string }> => {
    const response = await api.get('/auth/validate', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  updateProfile: async (token: string, data: Partial<RegisterCredentials>): Promise<AuthResponse> => {
    const response = await api.put(
      '/auth/profile',
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  },
};

export default authApi; 