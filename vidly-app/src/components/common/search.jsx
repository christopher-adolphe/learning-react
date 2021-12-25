import React from 'react';
import PropTypes from 'prop-types';

const Search = ({ value, onSearchChange }) => {
  return (
    <form className="d-flex mb-3">
      <input className="form-control" type="search" placeholder="Search..." value={ value } onChange={ (event) => onSearchChange(event.currentTarget.value) } />
    </form>
  );
};

Search.propTypes = {
  value: PropTypes.string,
  onSearchChange: PropTypes.func.isRequired
};
 
export default Search;
