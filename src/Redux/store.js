import {configureStore} from '@reduxjs/toolkit';
import airingReducer from './Slices/airingSlice';
import completeReducer from './Slices/completeSlice';
import favouriteReducer from './Slices/favouriteSlice';
import upcomingReducer from './Slices/upcomingSlice';

import logger from 'redux-logger';

export const store = configureStore({
  reducer: {
    airing: airingReducer,
    complete: completeReducer,
    upcoming: upcomingReducer,
    favourite: favouriteReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware(), //.concat(logger),
});
