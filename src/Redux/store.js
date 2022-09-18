import {configureStore} from '@reduxjs/toolkit';
import airingReducer from './Slices/airingSlice';
import completeReducer from './Slices/completeSlice';
import favouriteReducer from './Slices/favouriteSlice';

import logger from 'redux-logger';

export const store = configureStore({
  reducer: {
    airing: airingReducer,
    complete: completeReducer,
    favourite: favouriteReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware(), //.concat(logger),
});
