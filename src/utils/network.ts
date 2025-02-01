import axios from 'axios';
const backendUrl = import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:4000'
console.log(backendUrl)
const api = axios.create({
  baseURL: backendUrl,
  withCredentials: true,
});

export default api