import { configureStore } from '@reduxjs/toolkit';

import auth from './auth/slice';
import videocall from './call/slice';

export const store = configureStore({
  reducer: {
    auth,
    videocall,
  },
});
