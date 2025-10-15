/* Plugins. */
import { configureStore } from '@reduxjs/toolkit';

/* Reducers. */
import { userDetails } from './userDetails';
import { habits } from './habits';

export const store = configureStore({
  reducer: {
    userDetails,
    habits
  },
});
