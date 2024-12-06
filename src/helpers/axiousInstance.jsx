import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // Corrected baseURL
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// Add a request interceptor to include the CSRF token
axiosInstance.interceptors.request.use(config => {
  const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  if (token) {
    config.headers['X-CSRF-TOKEN'] = token;
  }
  return config;
});


export default axiosInstance;