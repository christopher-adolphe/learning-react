import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import MoviesTable from './moviesTable';
import Filter from './common/filter';
import Search from './common/search';
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
    pageSize: 4,
    sortColumn: { path: 'title', order: 'asc' },
    searchQuery: ''
  };

  componentDidMount() {
    const genres = [ { _id: '', name: 'All genres' }, ...getGenres() ];

    this.setState({ movies: getMovies(), genres });
  }

  getpaginatedData() {
    const { movies, currentPage, currentFilter, pageSize, sortColumn, searchQuery } = this.state;
    let filteredMovies = movies;

    if (searchQuery) {
      filteredMovies = movies.filter(movie => movie.title.toLowerCase().startsWith(searchQuery.toLowerCase()));
    } else if (currentFilter !== 'All genres') {
      filteredMovies = movies.filter(movie => movie.genre.name === currentFilter);
    }

    const count = filteredMovies.length;
    const sortedMovies = _.orderBy(filteredMovies, [sortColumn.path], [sortColumn.order]);
    const paginatedData = paginate(sortedMovies, currentPage, pageSize);

    return { count, paginatedData };
  }

  displayMovies() {
    const { genres, currentPage, currentFilter, pageSize, sortColumn, searchQuery } = this.state;
    const { count, paginatedData: movies } = this.getpaginatedData();

    return count
      ? <div className="container">
          <div className="row">
            <div className="col-2">
              <Filter genres={ genres } currentFilter= { currentFilter } onFilterChange={ this.handleFilterChange } />
            </div>
            <div className="col">
              <Link className="btn btn-primary mb-4" to="/movies/new">New Movie</Link>

              <p>Showing { `${count} ${count > 1 ? `movies` : `movie`} ` } in the database</p>

              <Search value={ searchQuery } onSearchChange={ this.handleSearch } />

              <MoviesTable
                movies={ movies }
                sortColumn={ sortColumn }
                onLikeMovie={ this.handleLike }
                onDeleteMovie={ this.handleDeleteMovie }
                onSortMovie={ this.handleSortMovie } />

              <Pagination itemCount={ count } currentPage={ currentPage } pageSize={ pageSize } onPageChange={ this.handlePageChange } />
            </div>
          </div>
        </div>
        
    : <p>Sorry, there are no movies in the database.</p>
  }

  handleLike = (movie) => {
    const movies = [ ...this.state.movies ];
    const index = movies.indexOf(movie);

    movies[index].liked = !movies[index].liked;

    this.setState({ movies });
  };

  handleDeleteMovie = (id) => {
    const movies = this.state.movies.filter(movie => movie._id !== id);

    deleteMovie(id);

    this.setState({ movies })
  };

  handleSortMovie = (sortColumn) => {
    this.setState({ sortColumn })
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleFilterChange = (genre) => {
    this.setState({ currentFilter: genre, currentPage: 1, searchQuery: '' });
  };
  
  handleSearch = (query) => {
    this.setState({ searchQuery: query, currentFilter: 'All genres', currentPage: 1 });
  };

  render() {
    return this.displayMovies();
  }
}
 
export default Movies;