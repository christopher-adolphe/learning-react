import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

function Loader({ isVisible = false }) {
  return (
    <Fragment>
      { (typeof(isVisible) === 'boolean' && isVisible) ? (
        <div className="loader">
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
      ) : null }
    </Fragment>
  );
}

Loader.propTypes = {
  isVisible: PropTypes.bool
}

export default Loader;
