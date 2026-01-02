/* Plugins. */
import { configureStore } from '@reduxjs/toolkit';

/* Reducers. */
import { userDetails } from './userDetails';
import { habits } from './habits';
import { modal } from './modal';

export const store = configureStore({
  reducer: {
    userDetails,
    habits,
    modal
  }
});
