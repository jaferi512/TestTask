import {configureStore} from '@reduxjs/toolkit';
import airingReducer from './Slices/airingSlice';

import logger from 'redux-logger';

export const store = configureStore({
  reducer: {
    airing: airingReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware(), //.concat(logger),
});
