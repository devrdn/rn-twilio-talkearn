import { getToken } from '../utils/storage';
import api from './axios';

export default {
  /**
   * User Login
   */
  login: async (email, password) => {
    return await api.post('/login', { email, password });
  },

  setStatus: async expertId => {
    return await api.patch(`/expert/status/${expertId}`);
  },
};
