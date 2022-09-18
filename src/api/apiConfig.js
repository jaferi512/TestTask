import axios from 'axios';

const http = axios.create({
  baseURL: 'https://api.jikan.moe/v4', //Release Base URL
  headers: {'Content-Type': 'application/json'},
});

export default http;
