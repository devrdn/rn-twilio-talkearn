import api from './axios';

export default {
  /**
   * User Login
   */
  login: async (email, password) => {
    return await api.post('/login', { email, password });
  },
};
