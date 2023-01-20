import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchLogin } from './asyncActions';

/**
 * Initial State
 *
 * status: UNAUTHORIZED | AUTHORIZED | PENDING
 */
const initialState = {
  expert: {},
  token: '',
  isAuth: false,
  errors: [],
};

/**
 * ReduxToolkit slice
 * Responsible for User Authentication
 */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // Async actions for login
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.expert = action.payload.expert;
      state.errors = [];
      state.isAuth = true;
    });

    builder.addCase(fetchLogin.rejected, (state, action) => {
      state.expert = {};
      state.errors = new Array(action.payload.message);
      state.isAuth = false;
    });

    builder.addCase(fetchLogin.pending, state => {
      state.isAuth = false;
    });
  },
});

export default authSlice.reducer;
