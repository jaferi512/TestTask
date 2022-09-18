import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import apiConfig from '../../api/apiConfig';
//import {setAsyncStorage, clearAsyncStorage} from '../../helpers/asyncStorage';

// First, create the thunk
export const getanime = createAsyncThunk('anime', async data => {
  //make api request to login with that username and password
  try {
    //if Login , modify our state, and say that we are authenticated
    const response = await apiConfig.get(
      '/anime?page=' + data.page + '&limit=' + data.limit,
    );
    //console.log(response.headers.access_token);
    if (response.status === 200) {
      //console.log(JSON.stringify(response.data.data));
      // Get the device token
      /* await setAsyncStorage('token', response.headers.access_token);
      await setAsyncStorage(
        'x-working-company',
        response.headers['x-working-company'],
      );
      await setAsyncStorage(
        'x-working-branch',
        response.headers['x-working-branch'],
      );
      await setAsyncStorage('x-user-role', response.headers['x-user-role']); */
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
    //if Login fails, then show error message
    //console.log(err.message);
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

export const completeReducer = createSlice({
  name: 'complete',
  initialState,
  reducers: {
    searchByName: (state, action) => {
      const filteredUsers = state.data.filter(user =>
        user.title.toLowerCase().includes(action.payload.toLowerCase()),
      );
      return {
        ...state,
        filteredUsers:
          action.payload.length > 0
            ? filteredUsers.filter(val => val.status === 'Finished Airing')
            : [...state.data.filter(val => val.status === 'Finished Airing')],
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
        state.filteredUsers = action.payload.data.filter(
          val => val.status === 'Finished Airing',
        );
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
export const {searchByName} = completeReducer.actions;
export default completeReducer.reducer;
