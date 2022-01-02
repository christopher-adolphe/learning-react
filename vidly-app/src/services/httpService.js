import axios from 'axios';
import { toast } from 'react-toastify';

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
  setAuthorizationToken
};

// Using `axios interceptors` to run a callback function to intercept errors
// on any response. The `use()` method takes 2 functions as argument; the 1st
// callback function is called when the response is successful while the 2nd
// is called when the response contains an error
axios.interceptors.response.use(null, (error) => {
  const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;

  if (!expectedError) {
    console.log('Intercepted response error: ', error);
    toast.error('Sorry, an unexpected error occurred.');
  }
  
  return Promise.reject(error);
});

function setAuthorizationToken(token) {
  // Specifiying config defaults that will apply to all requests
  // axios.defaults.headers.common['x-auth-token'] = authenticationService.getToken();

  // Alternatively, we can also use axios interceptors to intercept any request
  // and add the authorization headers
  axios.interceptors.request.use((config) => {
    config.headers['x-auth-token'] = token;

    return config;
  });
}

export default http;
