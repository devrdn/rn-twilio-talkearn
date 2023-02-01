import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isCall: false,
  senderId: '',
  recipientId: '',
  roomSid: '',
  token: '',
  errors: [],
};

/**
 * ReduxToolkit slice
 * Responsible for Video Call
 */
const videoSlice = createSlice({
  name: 'video-call',
  initialState,
  reducers: {
    setRecipientId: (state, action) => {
      state.recipientId = action.payload;
    },
    setSenderId: (state, action) => {
      state.senderId = action.payload;
    },
    setRoomSid: (state, action) => {
      state.roomSid = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setError: (state, action) => {
      state.errors = new Array(action.payload);
    },
    setIsCall: (state, action) => {
      state.isCall = action.payload;
    },
    clearCallData: state => {
      state.senderId = 0;
      state.isCall = false;
      state.roomSid = '';
      state.token = '';
      state.errors = [];
    },
    clearSenderId: state => {
      state.senderId = '';
    },
  },
});

export const {
  setRecipientId,
  setSenderId,
  clearSenderId,
  setRoomSid,
  setToken,
  setError,
  clearCallData,
  setIsCall,
} = videoSlice.actions;

export default videoSlice.reducer;
