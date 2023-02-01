import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchLogin, fetchToggleAvailable } from './asyncActions';

/**
 * Initial State
 *
 * status: UNAUTHORIZED | AUTHORIZED | PENDING
 */
const initialState = {
  expert: {
    available: false,
  },
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

    // Toggle Expert Status
    builder.addCase(fetchToggleAvailable.fulfilled, (state, action) => {
      state.expert = action.payload;
    });

    builder.addCase(fetchToggleAvailable.rejected, (state, action) => {
      state.expert.available = false;
      state.errors = new Array(action.payload.message);
    });

    builder.addCase(fetchToggleAvailable.pending, state => {
      state.expert.available = false;
      state.errors = [];
    });
  },
});

export default authSlice.reducer;
