import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import apiConfig from '../../api/apiConfig';

export const getanime = createAsyncThunk('anime', async data => {
  try {
    const response = await apiConfig.get(
      '/anime?page=' + data.page + '&limit=' + data.limit + '&status=upcoming',
    );
    if (response.status === 200) {
      return {
        data: response.data.data,
        error: '',
        filteredUsers: response.data.data,
        page: response.data.pagination,
      };
    } else {
      return {data: undefined, error: response.statusText};
    }
  } catch (err) {
    return {token: '', error: err.message};
  }
});

const initialState = {
  data: [],
  loading: false,
  filteredUsers: [],
  error: '',
  pagination: {
    last_visible_page: 0,
    has_next_page: true,
    current_page: 1,
    items: {
      count: 0,
      total: 0,
      per_page: 25,
    },
  },
};

export const upcomingReducer = createSlice({
  name: 'upcoming',
  initialState,
  reducers: {
    searchByName: (state, action) => {
      const filteredUsers = state.data.filter(user =>
        user.title.toLowerCase().includes(action.payload.toLowerCase()),
      );
      return {
        ...state,
        filteredUsers:
          action.payload.length > 0 ? filteredUsers : [...state.data],
      };
    },
  },
  extraReducers: builder => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getanime.fulfilled, (state, action) => {
      state.loading = false;
      // Add user to the state array
      if (action.payload.error) {
        state.error = action.payload.error;
      } else {
        state.error = '';
        state.data = action.payload.data;
        state.filteredUsers = action.payload.data;
        state.pagination = action.payload.page;
      }
    });
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getanime.pending, state => {
      // Add user to the state array
      state.error = '';
      state.loading = true;
    });
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getanime.rejected, (state, action) => {
      // Add user to the state array
      state.loading = false;
    });
  },
});
export const {searchByName} = upcomingReducer.actions;
export default upcomingReducer.reducer;
