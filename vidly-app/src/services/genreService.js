import http from './httpService';
import config from '../config.json';

export async function getGenres() {
  const { data: genres } = await http.get(`${config.apiEndpoint}/genres`);

  return genres;
}

export async function getGenre(id) {
  const { data: genre } = await http.get(`${config.apiEndpoint}/genres/${id}`);

  return genre;
}
