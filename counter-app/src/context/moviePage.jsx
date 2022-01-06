import React, { Component } from 'react';
import MovieList from './movieList';

class MoviePage extends Component {
  render() {
    return (
      <div>
        <h2>Movie Page</h2>

        <MovieList />
      </div>
    );
  }
}

export default MoviePage;
