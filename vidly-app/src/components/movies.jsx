import React, { Component } from 'react';
import MoviesTable from './moviesTable';
import Filter from './common/filter';
import Pagination from './common/pagination';
import { getMovies, deleteMovie } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import { paginate } from '../utils/paginate';

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    currentFilter: 'All genres',
    pageSize: 4
  }

  componentDidMount() {
    const genres = [ { _id: 'default', name: 'All genres' }, ...getGenres() ];

    this.setState({ movies: getMovies(), genres });
  }

  handleLike = (movie) => {
    const movies = [ ...this.state.movies ];
    const index = movies.indexOf(movie);

    movies[index].liked = !movies[index].liked;

    this.setState({ movies });
  }

  displayMovies() {
    const { movies, genres, currentPage, currentFilter, pageSize } = this.state;
    const filteredMovies = currentFilter !== 'All genres' ? movies.filter(movie => movie.genre.name === currentFilter) : movies;
    const count = filteredMovies.length;
    const paginatedMovies = paginate(filteredMovies, currentPage, pageSize);

    return count
      ? <div className="container">
          <div className="row">
            <div className="col-2">
              <Filter genres={ genres } currentFilter= { currentFilter } onFilterChange={ this.handleFilterChange } />
            </div>
            <div className="col">
              <p>Showing { `${count} ${count > 1 ? `movies` : `movie`} ` } in the database</p>

              <MoviesTable movies={ paginatedMovies } onLikeMovie={ this.handleLike } onDeleteMovie={ this.handleDeleteMovie }/>

              <Pagination itemCount={ count } currentPage={ currentPage } pageSize={ pageSize } onPageChange={ this.handlePageChange } />
            </div>
          </div>
        </div>
        
    : <p>Sorry, there are no movies in the database.</p>
  }

  handleDeleteMovie = (id) => {
    const movies = this.state.movies.filter(movie => movie._id !== id);

    deleteMovie(id);

    this.setState({ movies })
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  }

  handleFilterChange = (genre) => {
    this.setState({ currentFilter: genre, currentPage: 1 });
  }

  render() {
    return this.displayMovies();
  }
}
 
export default Movies;