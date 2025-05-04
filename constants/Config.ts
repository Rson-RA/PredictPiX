// API configuration
import Constants from 'expo-constants';
const { apiUrl, baseURL } = Constants.expoConfig?.extra ?? {};

export const API_URL = apiUrl || 'http://localhost:8000/api';
export const BASE_URL = baseURL || 'http://localhost:8000'; 
export const APP_URL = 'https://predictpix.com/'; // Replace with your app URL