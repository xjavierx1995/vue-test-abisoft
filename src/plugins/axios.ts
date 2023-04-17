import axios from 'axios';
const http = axios.create({
  baseURL: 'http://localhost:3000/',
});

http.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.message === 'Network Error') {
      // Manejar error de red aquí
    }
    return Promise.reject(error);
  }
);

export default http