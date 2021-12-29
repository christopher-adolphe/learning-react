import http from './httpService';
import { apiEndpoint } from '../config.json';

export function getGenres() {
  return http.get(`${apiEndpoint}/genres`);
}

export function getGenre(id) {
  return http.get(`${apiEndpoint}/genres/${id}`);
}
