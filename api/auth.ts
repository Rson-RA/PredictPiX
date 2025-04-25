import api from './config';

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

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user_id: number;
  username: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone_number: string | null;
  role: string;
  total_profit: number;
  balance: number;
  created_at: string | null;
  updated_at: string | null;
  avatar_url: string | null;
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