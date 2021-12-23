import React from 'react';
import PropTypes from 'prop-types';

const BaseInput = ({ label, type, name, value, error, onInputChange }) => {
  let inputClasses = 'form-control ';

  inputClasses += error ? 'is-invalid' : '';

  return (
    <div className="mb-3">
      <label htmlFor={ name } className="form-label">{ label }</label>
      <input type={ type } className={ inputClasses } id={ name } name={ name } value={ value } onChange={ onInputChange } />
      { error ? <div className="invalid-feedback">{ error }</div> : '' }
    </div>
  );
}

BaseInput.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  onInputChange: PropTypes.func.isRequired
};
 
export default BaseInput;
