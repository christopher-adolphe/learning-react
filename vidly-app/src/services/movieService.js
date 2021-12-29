import http from './httpService';
import { apiEndpoint } from '../config.json';

export function getMovies() {
  return http.get(`${apiEndpoint}/movies`);
}

export function getMovie(id) {
  return http.get(`${apiEndpoint}/movies/${id}`);
}

export function saveMovie(movie) {
  if (movie._id) {
    const id = movie._id
    delete movie._id;

    return http.put(`${apiEndpoint}/movies/${id}`, movie);
  }

  return http.post(`${apiEndpoint}/movies`, movie);
}

export function deleteMovie(id) {
  return http.delete(`${apiEndpoint}/movies/${id}`);
}