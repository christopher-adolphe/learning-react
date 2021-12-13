import React from 'react';

const Filter = (props) => {
  const { genres, currentFilter, onFilterChange } = props;

  const setFilterActive = (genre) => {
    return currentFilter === genre ? 'active' : '';
  }

  return (
    <div className="btn-group-vertical" role="group" aria-label="Filter movies by genre">
      <button type="button" className="btn btn-outline-secondary" onClick={ () => onFilterChange('') }>All Genres</button>
      {
        genres.map(genre => (
          <button key={ genre._id } type="button" className={ `btn btn-outline-secondary ${setFilterActive(genre.name)}` } onClick={ () => onFilterChange(genre.name) }>{ genre.name }</button>
        ))
      }
    </div>
  );;
}
 
export default Filter;
