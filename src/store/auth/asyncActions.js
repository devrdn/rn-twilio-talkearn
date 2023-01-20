import { createAsyncThunk } from '@reduxjs/toolkit';
import authApi from '../../api/authApi';
import { setItem } from '../../utils/storage';

export const fetchLogin = createAsyncThunk(
  'auth/fetchLogin',
  async (userData, { rejectWithValue }) => {
    const { email, password } = userData;
    try {
      const { data } = await authApi.login(email, password);

      // if success auth, then set token
      await setItem('AccessToken', data.token, err => {
        console.log(err);
      });

      return data;
    } catch (error) {
      // if error, then delete token
      await setItem('AccessToken', '', err => {
        console.log(err);
      });

      return rejectWithValue(error.response.data);
    }
  },
);
