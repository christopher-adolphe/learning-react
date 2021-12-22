import React from 'react';
import PropTypes from 'prop-types';

const BaseInput = ({ label, type, name, value, onInputChange }) => {
  return (
    <div className="mb-3">
      <label htmlFor={ name } className="form-label">{ label }</label>
      <input type={ type } className="form-control" id={ name } name={ name } value={ value } onChange={ onInputChange } />
    </div>
  );
}

BaseInput.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired
};
 
export default BaseInput;
