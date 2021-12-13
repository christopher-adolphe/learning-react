import React, { Component } from 'react';
import Like from './common/like';
import Filter from './common/filter';
import Pagination from './common/pagination';
import { getMovies, deleteMovie } from '../services/fakeMovieService';
import { paginate } from '../utils/paginate';

class Movies extends Component {
  state = {
    movies: [],
    currentPage: 1,
    pageSize: 4
  }

  componentDidMount() {
    this.setState({ movies: getMovies() });
  }

  handleLike = (movie) => {
    const movies = [ ...this.state.movies ];
    const index = movies.indexOf(movie);

    movies[index].liked = !movies[index].liked;

    this.setState({ movies });
  }

  displayMovies() {
    const { movies, currentPage, pageSize } = this.state;
    const count = movies.length;
    const paginatedMovies = paginate(movies, currentPage, pageSize);

    return count
      ? <React.Fragment>
          <div className="container">
            <div className="row">
              <div className="col-lg-2">
                <Filter />
              </div>
              <div className="col-lg-10">
                <p>Showing { `${count} ${count > 1 ? `movies` : `movie`} ` } in the database</p>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Title</th>
                      <th scope="col">Genre</th>
                      <th scope="col">Stock</th>
                      <th scope="col">Rate</th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                    </tr>
                  </thead>

                  <tbody>
                    {
                      paginatedMovies.map(movie => (
                        <tr key={ movie._id }>
                          <th scope="row">{ movie.title }</th>
                          <td>{ movie.genre.name }</td>
                          <td>{ movie.numberInStock }</td>
                          <td>{ movie.dailyRentalRate }</td>
                          <td><Like liked={ movie.liked } onLike={ () => this.handleLike(movie) } /></td>
                          <td><button className="btn btn-danger btn-sm" onClick={ () => this.handleDeleteMovie(movie._id) }>Delete</button></td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>

                <Pagination itemCount="{ count }" currentPage={ currentPage } pageSize={ pageSize } onPageChange={ this.handlePageChange } />
              </div>
            </div>
          </div>
        </React.Fragment> 
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

  render() {
    return this.displayMovies();
  }
}
 
export default Movies;