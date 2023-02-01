import { createAsyncThunk } from '@reduxjs/toolkit';
import authApi from '../../api/authApi';
import { setItem } from '../../utils/storage';

export const fetchLogin = createAsyncThunk(
  'auth/fetchLogin',
  async (userData, { rejectWithValue }) => {
    const { email, password } = userData;
    try {
      const { data } = await authApi.login(email, password);


      console.log(124324);

      // if success auth, then set token
      await setItem('AccessToken', data.token, err => {
        console.log("Error", err);
      });


      return data;
    } catch (error) {
      // if error, then delete token
      await setItem('AccessToken', '', err => {
        console.log("Error", err);
      });

      return rejectWithValue(error.response.data);
    }
  },
);

export const fetchSetStatus = createAsyncThunk(
  'auth/setExpertStatus',
  async (expertId, { rejectWithValue }) => {
    try {
      const { data } = await authApi.setStatus(expertId);
      console.log("data");
      console.log(data);
      return data;
    } catch (error) {
      console.log("Error", error);
     return rejectWithValue(error.response.data);
    }
  },
);
