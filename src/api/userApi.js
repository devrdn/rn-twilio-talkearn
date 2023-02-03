import api from "./axios";

export default {
  /**
   * Toggle User Status
   *
   * @param {Number} expertId id of expert
   */
  toggleAvailableStatus: async expertId => {
    return await api.patch(`/expert/status/${expertId}`);
  },
};
