import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const http = axios.create({
  baseURL: 'https://api.jikan.moe/v4', //Release Base URL
  headers: {'Content-Type': 'application/json'},
});

/* http.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');
    const x_working_company = await AsyncStorage.getItem('x-working-company');
    const x_working_branch = await AsyncStorage.getItem('x-working-branch');
    if (token) {
      config.headers = {
        'Content-Type': 'application/json',
        Authorization: token,
        'x-working-company': x_working_company,
        'x-working-branch': x_working_branch,
      };
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  },
); */

export default http;
