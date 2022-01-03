import http from './httpService';

const apiEndpoint = `/users`;

export function register(user) {
  return http.post(`${apiEndpoint}`, user);
}

const userService = {
  register
};

export default userService;
