import axios from 'axios';
import { toast } from 'react-toastify';

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete
};

axios.interceptors.response.use(null, (error) => {
  const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;

  if (!expectedError) {
    console.log('Intercepted response error: ', error);
    toast.error('Sorry, an unexpected error occurred.');
  }
  
  return Promise.reject(error);
});

export default http;
