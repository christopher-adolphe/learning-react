import React, { Component } from 'react';
import { getMovies, deleteMovie } from '../services/fakeMovieService';

class Movies extends Component {
  state = {
    movies: getMovies()
  }

  getMovies() {
    const { movies } = this.state;

    return movies.length
      ? <React.Fragment>
        <p>Showing { `${movies.length} ${movies.length > 1 ? `movies` : `movie`} ` } in the database</p>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Stock</th>
              <th scope="col">Rate</th>
              <th scope="col"></th>
            </tr>
          </thead>

          <tbody>
            {
              movies.map(movie => (
                <tr key={ movie._id }>
                  <th scope="row">{ movie.title }</th>
                  <td>{ movie.genre.name }</td>
                  <td>{ movie.numberInStock }</td>
                  <td>{ movie.dailyRentalRate }</td>
                  <td><button className="btn btn-danger btn-sm" onClick={ () => this.handleDeleteMovie(movie._id) }>Delete</button></td>
                </tr>
              ))
            }
          </tbody>
        </table>
        </React.Fragment> 
    : <p>Sorry, there are no movies in the database.</p>
  }

  handleDeleteMovie = (id) => {
    const movies = this.state.movies.filter(movie => movie._id !== id);

    deleteMovie(id);

    this.setState({ movies })
  }

  render() {
    return this.getMovies();
  }
}
 
export default Movies;