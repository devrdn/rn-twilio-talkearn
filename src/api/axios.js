import axios from 'axios';
import { getToken } from '../utils/token';

const api = axios.create({
  baseURL: 'https://core.instantexpert.online/api',
});

api.interceptors.request.use(async config => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
