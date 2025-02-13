import axios from 'axios';

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:4500';

export const axiosClient = axios.create({
  baseURL: API_BASE_URL,
});
