import http from './httpService';

const apiEndpoint = `/movies`;

export function getMovies() {
  return http.get(`${apiEndpoint}`);
}

export function getMovie(id) {
  return http.get(`${apiEndpoint}/${id}`);
}

export function saveMovie(movie) {
  if (movie._id) {
    const id = movie._id
    delete movie._id;

    return http.put(`${apiEndpoint}/${id}`, movie);
  }

  return http.post(`${apiEndpoint}`, movie);
}

export function deleteMovie(id) {
  return http.delete(`${apiEndpoint}/${id}`);
}