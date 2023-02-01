import api from './axios';

export default {
  /**
   * Get Call Token
   */
  getCallToken: async senderId => {
    return await api.get(`/calls/token?identity=${senderId}`);
  },

  /**
   * Get Device Token
   */
  patchDeviceToken: async (token, userid) => {
    return await api.patch(`/expert/device-token/${userid}`, {
      deviceToken: token,
    });
  },
};
