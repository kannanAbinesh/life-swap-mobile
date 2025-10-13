/* Plugins. */
import { configureStore } from '@reduxjs/toolkit';

/* Reducers. */
import { userDetails } from './userDetails';

export const store = configureStore({
  reducer: {
    userDetails
  },
});
