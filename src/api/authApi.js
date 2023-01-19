import api from './axios';

export default {
  /**
   * User Login
   */
  login: async (userData, cb = err => console.log(err)) => {
    try {
      return await api.post('/login', userData);
    } catch (error) {
      cb(error.response.data);
    }
  },
};
