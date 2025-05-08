import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authApi, { AuthResponse, LoginCredentials, RegisterCredentials } from '@/api/auth';

interface AuthContextType {
  user: AuthResponse | null;
  setUser: (user: AuthResponse | null) => void;
  token: string | null;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  loginWithPi: (code: string) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<RegisterCredentials>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthResponse | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStoredAuth();
  }, []);

  const loadStoredAuth = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('auth_token');
      const storedUser = await AsyncStorage.getItem('user');

      if (storedToken && storedUser) {
        // Validate token
        try {
          await authApi.validateToken(storedToken);
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        } catch (error) {
          // Token invalid, clear storage
          await AsyncStorage.multiRemove(['auth_token', 'user']);
        }
      }
    } catch (error) {
      console.error('Error loading auth state:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const storeAuthData = async (authResponse: AuthResponse) => {
    try {
      await AsyncStorage.setItem('auth_token', authResponse.access_token);
      await AsyncStorage.setItem('user', JSON.stringify(authResponse));
      setToken(authResponse.access_token);
      setUser(authResponse);
    } catch (error) {
      console.error('Error storing auth data:', error);
      throw error;
    }
  };

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await authApi.login(credentials);
      await storeAuthData(response);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const loginWithPi = async (code: string) => {
    try {
      const response = await authApi.loginWithPi(code);
      await storeAuthData(response);
    } catch (error) {
      console.error('Pi login error:', error);
      throw error;
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    try {
      const response = await authApi.register(credentials);
      await storeAuthData(response);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.multiRemove(['auth_token', 'user']);
      setToken(null);
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const updateProfile = async (data: Partial<RegisterCredentials>) => {
    if (!token) throw new Error('Not authenticated');
    try {
      const response = await authApi.updateProfile(token, data);
      await storeAuthData(response);
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        setUser,
        login,
        loginWithPi,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}; 