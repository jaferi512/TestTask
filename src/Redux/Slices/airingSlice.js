import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import apiConfig from '../../api/apiConfig';
//import {setAsyncStorage, clearAsyncStorage} from '../../helpers/asyncStorage';

// First, create the thunk
export const getanime = createAsyncThunk('login', async data => {
  //make api request to login with that username and password
  try {
    //if Login , modify our state, and say that we are authenticated
    const response = await apiConfig.get('/anime');
    //console.log(response.headers.access_token);
    if (response.status === 200) {
      console.log(JSON.stringify(response.data.data));
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
      return {data: response.data.data, error: ''};
    } else {
      return {data: undefined, error: response.statusText};
    }
  } catch (err) {
    //if Login fails, then show error message
    //console.log(err.message);
    return {token: '', error: err.message};
  }
});

export const logout = createAsyncThunk('logout', async () => {
  try {
    //if Login , modify our state, and say that we are authenticated
    const response = await apiConfig.post('/account/logoff');
    if (response.status === 200) {
      //clearAsyncStorage();
      return {user: undefined, error: ''};
    } else {
      return {user: '', error: response.statusText};
    }
  } catch (err) {
    //if Login fails, then show error message
    //console.log(err.message);
    return {user: '', error: err.message};
  }
});

const initialState = {
  data: undefined,
  loading: false,
  user: undefined,
  error: '',
};

export const airingReducer = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addToken: (state, action) => {
      state.user = action.payload;
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
    builder.addCase(logout.pending, (state, action) => {
      // Add user to the state array
      state.loading = true;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      // Add user to the state array
      state.loading = false;
      if (action.payload.error) {
        state.error = action.payload.error;
      } else {
        state.error = '';
        state.user = action.payload.user;
      }
    });
  },
});
export const {addToken} = airingReducer.actions;
export default airingReducer.reducer;
