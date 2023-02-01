import api from './axios';

export default {
  /**
   * User Login
   */
  getCallToken: async senderId => {
    return await api.get(`/calls/token?identity=${senderId}`);
  },
};
