import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Table from './common/table';
import Like from './common/like';
import authenticationService from '../services/authenticationService';

class MoviesTable extends Component {
  columns = [
    {
      path: 'title',
      label: 'Title',
      content: (movie) => <Link to={ `/movies/${movie._id}` }>{ movie.title }</Link>
    },
    { path: 'genre.name', label: 'Genre' },
    { path: 'amountInStock', label: 'Stock' },
    { path: 'dailyRentalRate', label: 'Rate' },
    {
      key: 'like',
      content: (movie) => <Like liked={ movie.liked } onLike={ () => this.props.onLikeMovie(movie) } />
    }
  ];

  deleteColumn = {
    key: 'delete',
    content: (movie) => <button className="btn btn-danger btn-sm" onClick={ () => this.props.onDeleteMovie(movie._id) }>Delete</button>
  };

  constructor() {
    super();

    const user = authenticationService.getUser();

    if (user && user.isAdmin) {
      this.columns.push(this.deleteColumn);
    }
  }

  render() {
    const { movies, sortColumn, onSortMovie } = this.props;

    return (
      <Table columns={ this.columns } sortColumn={ sortColumn } data={ movies } onSortMovie={ onSortMovie } />
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
