import http from "./httpService";
import jwtDecode from 'jwt-decode';
import { apiUrl } from '../config.json';

const apiEndpoint = `${apiUrl}/auth`;
const tokenKey = 'token';

export async function login(user) {
  const { data: token } = await http.post(apiEndpoint, user);

  localStorage.setItem(tokenKey, token);
}

export function autoLogin(token) {
  localStorage.setItem(tokenKey, token);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getUser() {
  try {
    const token = localStorage.getItem(tokenKey);
    
    return jwtDecode(token);
  } catch (error) {
    return null;
  }
}

export default {
  login,
  autoLogin,
  logout,
  getUser
}
