import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Like from './common/like';

class MoviesTable extends Component {
  dispatchSort = (path) => {
    const { onSortMovie } = this.props;

    const sortColumn = { ...this.props.sortColumn };

    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc';
    } else {
      sortColumn.path = path;
      sortColumn.order = 'asc';
    }

    onSortMovie(sortColumn);
  }

  render() {
    const { movies, onLikeMovie, onDeleteMovie } = this.props;

    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col" onClick={ () => this.dispatchSort('title') }>Title</th>
            <th scope="col" onClick={ () => this.dispatchSort('genre.name') }>Genre</th>
            <th scope="col" onClick={ () => this.dispatchSort('numberInStock') }>Stock</th>
            <th scope="col" onClick={ () => this.dispatchSort('dailyRentalRate') }>Rate</th>
            <th scope="col"></th>
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
                <td><Like liked={ movie.liked } onLike={ () => onLikeMovie(movie) } /></td>
                <td><button className="btn btn-danger btn-sm" onClick={ () => onDeleteMovie(movie._id) }>Delete</button></td>
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  }
}

MoviesTable.propTypes = {
  movies: PropTypes.array.isRequired,
  sortColumn: PropTypes.object.isRequired,
  onLikeMovie: PropTypes.func.isRequired,
  onDeleteMovie: PropTypes.func.isRequired,
  onSortMovie: PropTypes.func.isRequired
};
 
export default MoviesTable;
