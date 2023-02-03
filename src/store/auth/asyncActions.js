import { createAsyncThunk } from '@reduxjs/toolkit';
import authApi from '../../api/authApi';
import userApi from '../../api/userApi';
import { setItem } from '../../utils/storage';

export const fetchLogin = createAsyncThunk(
  'auth/fetchLogin',
  async (userData, { rejectWithValue }) => {
    const { email, password } = userData;
    try {
      const { data } = await authApi.login(email, password);
      // if success auth, then set token
      await setItem('AccessToken', data.token, err => {
        console.log('Error', err);
      });


      return data;
    } catch (error) {
      // if error, then delete token
      await setItem('AccessToken', '', err => {
        console.log('Error', err);
      });

      return rejectWithValue(error.response.data);
    }
  },
);

export const fetchToggleAvailable = createAsyncThunk(
  'auth/setExpertStatus',
  async (expertId, { rejectWithValue }) => {
    try {
      const { data } = await userApi.toggleAvailableStatus(expertId);
      return data;
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  },
);
