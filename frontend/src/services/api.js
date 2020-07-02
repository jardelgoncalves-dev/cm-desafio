import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3003/',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(
  async config => {
    return config;
  },
  err => {
    return Promise.reject(err.response);
  }
);

export default api;