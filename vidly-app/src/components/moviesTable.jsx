import React from 'react';
import PropTypes from 'prop-types';
import Like from './common/like';

const MoviesTable = (props) => {
  const { movies, onLikeMovie, onDeleteMovie } = props;

  return (
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

MoviesTable.propTypes = {
  movies: PropTypes.array.isRequired,
  onLikeMovie: PropTypes.func.isRequired,
  onDeleteMovie: PropTypes.func.isRequired
};
 
export default MoviesTable;
