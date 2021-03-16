import http from "./httpService";
import { apiURL } from "../config.json";

const apiEndpoint = `${apiURL}/movies`;

function getMovieURL(movieId) {
  return `${apiEndpoint}/${movieId}`;
}

export function getMovies() {
  return http.get(apiEndpoint);
}

export function getMovie(movieId) {
  return http.get(getMovieURL(movieId));
}

export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;

    return http.put(getMovieURL(movie._id), body);
  }
  return http.post(apiEndpoint, movie);
}

export function deleteMovie(movieId) {
  return http.delete(getMovieURL(movieId));
}
