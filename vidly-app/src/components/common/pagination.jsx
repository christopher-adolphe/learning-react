import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

// Should know the length of the movie list
// Should know the page size to limit number of movies to display per page
// Should raise an event to navigate to next page

const Pagination = (props) => {
  const { itemCount, currentPage, pageSize, onPageChange } = props;
  const pageCount = Math.ceil(itemCount / pageSize);

  if (pageCount === 1) {
    return null;
  }

  const pages = _.range(1, pageCount + 1);

  const isPageActive = (page) => {
    return currentPage === page ? 'active' : '';
  };

  return (
    <nav aria-label="Movie pagination">
      <ul className="pagination">
        {
          pages.map(page => (
            <li className={ `page-item ${isPageActive(page)}` } key={ `page-${page}` }><a className="page-link" onClick={ () => onPageChange(page) }>{ page }</a></li>
          ))
        }
      </ul>
    </nav>
  );
};

// Implementing type checking on Pagination component props
Pagination.propTypes = {
  itemCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};
 
export default Pagination;
