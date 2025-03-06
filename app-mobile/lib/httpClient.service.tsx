import { RestApplicationClient } from '@/models/api';
import Axios from 'axios';

export const API_BASE_URL="https://8e6a-187-19-176-183.ngrok-free.app";

const httpClient = Axios.create({
  baseURL: API_BASE_URL, 
  headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
      'Accept': 'application/json'
  },
  withCredentials: true,
  xsrfCookieName: 'XSRF-TOKEN',
  withXSRFToken: true,
});

export const restClient = new RestApplicationClient(httpClient)

export default httpClient;