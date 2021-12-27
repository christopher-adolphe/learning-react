import axios from 'axios';
import logger from './logService';
import { toast } from 'react-toastify';

// Using the `interceptors` property of `axios` to handle errors
// in the request and response. This provides a centralized place
// handling errors. We can intercept requests before they go out
// and responses as the come in
// The `use()` method takes 2 callback functions arguments, the 1st one
// is called when the response is successful and the 2nd is called when
// the response contains an error
axios.interceptors.response.use((response) => {
  // toast.success('Response obtained from server.');

  return Promise.resolve(response);
}, (error) => {
  const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;

  if (!expectedError) {
    // console.log('Intercepting response error: ', error);

    // Using the `log()` function from the `logService` module to log errors with `Raven-js`
    logger.log(error);
    toast.error('Sorry, an unexpected error occurred.');
  }
  
  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete
};
