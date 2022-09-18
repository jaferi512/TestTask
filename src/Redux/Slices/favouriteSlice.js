import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: [],
  loading: false,
  error: '',
};

export const favouriteReducer = createSlice({
  name: 'favourite',
  initialState,
  reducers: {
    addTofav: (state, action) => {
      state.data = [...state.data, action.payload];
    },
    removeFromfav: (state, action) => {
      state.data = state.data.filter(i => i.mal_id !== action.payload);
    },
  },
});
export const {addTofav, removeFromfav} = favouriteReducer.actions;
export default favouriteReducer.reducer;
