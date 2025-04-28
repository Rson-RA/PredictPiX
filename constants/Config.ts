// API configuration
import Constants from 'expo-constants';
const { apiUrl, baseURL } = Constants.expoConfig?.extra ?? {};

export const API_URL = apiUrl || 'http://152.42.252.223:8000/api';
export const BASE_URL = baseURL || 'http://152.42.252.223:8000'; 