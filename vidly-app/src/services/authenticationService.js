import http from "./httpService";
import { apiUrl } from '../config.json';

const apiEndpoint = `${apiUrl}/auth`;

export function login(user) {
  return http.post(apiEndpoint, user);
}
