import React from 'react';
import PropTypes from 'prop-types';

const BaseSelect = ({ label, name, options, value, error, onInputChange }) => {
  let selectClasses = 'form-select ';

  selectClasses += error ? 'is-invalid' : '';

  return (
    <div className="mb-3">
      <label htmlFor={ name } className="form-label">{ label }</label>
      <select className={ selectClasses } id={ name } onChange={ onInputChange }>
        <option value="" />
        {
          options.map(option => (
            <option key={ option._id } value={ option._id }>{ option.name }</option>
          ))
        }
      </select>
      { error ? <div className="invalid-feedback">{ error }</div> : '' }
    </div>
  );
}

BaseSelect.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  error: PropTypes.string,
  onInputChange: PropTypes.func.isRequired
};
 
export default BaseSelect;
