import axios from 'axios';

const api = axios.create({
  baseURL: 'https://core.instantexpert.online/api',
});

export default api;
