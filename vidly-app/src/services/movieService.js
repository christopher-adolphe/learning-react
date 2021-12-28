import http from './httpService';
import config from '../config.json';

export async function getMovies() {
  const { data: movies } = await http.get(`${config.apiEndpoint}/movies`);

  return movies;
}

export async function getMovie(id) {
  const { data: movie } = await http.get(`${config.apiEndpoint}/movies/${id}`);

  return movie;
}

export async function saveMovie(movie) {
  try {
    if (movie._id) {
      const id = movie._id
      delete movie._id;

      await http.put(`${config.apiEndpoint}/movies/${id}`, movie);
    } else {
      await http.post(`${config.apiEndpoint}/movies`, movie);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function deleteMovie(id) {
  try {
    await http.delete(`${config.apiEndpoint}/movies/${id}`);
  } catch (error) {
    console.log(error);
  }
}