import axios from 'axios';

const api = axios.create({
  baseURL: 'https://core.talkearn.app/api',
});

export default api;
