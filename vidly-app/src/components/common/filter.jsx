import React from 'react';
import PropTypes from 'prop-types';

const Filter = (props) => {
  const { genres, valueProperty, textProperty, currentFilter, onFilterChange } = props;

  const setFilterActive = (genre) => {
    return currentFilter === genre ? 'active' : '';
  }

  return (
    <div className="btn-group-vertical btn-group-filter" role="group" aria-label="Filter movies by genre">
      {
        genres.map(genre => (
          <button key={ genre[valueProperty] } type="button" className={ `btn btn-outline-secondary ${setFilterActive(genre[textProperty])}` } onClick={ () => onFilterChange(genre[textProperty]) }>{ genre.name }</button>
        ))
      }
    </div>
  );
}

// Setting default values to component props
Filter.defaultProps = {
  valueProperty: '_id',
  textProperty: 'name'
};

Filter.propTypes = {
  genres: PropTypes.array.isRequired,
  currentFilter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired
};
 
export default Filter;
