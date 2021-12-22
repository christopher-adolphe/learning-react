import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import { faSortUp } from '@fortawesome/free-solid-svg-icons';

class TableHeader extends Component {
  dispatchSort = (path) => {
    const { onSortMovie } = this.props;

    const sortColumn = { ...this.props.sortColumn };

    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc';
    } else {
      sortColumn.path = path;
      sortColumn.order = 'asc';
    }

    onSortMovie(sortColumn);
  };

  renderSortIcon(column) {
    const { sortColumn } = this.props;

    if (column.path !== sortColumn.path) {
      return null;
    }

    return sortColumn.order === 'asc' ? <FontAwesomeIcon icon={ faSortUp } /> : <FontAwesomeIcon icon={ faSortDown } />
  }

  render() { 
    return (
      <thead>
        <tr>
          {
            this.props.columns.map(column => (
            <th
              className="clickable"
              key={ column.path || column.key }
              onClick={ () => this.dispatchSort(column.path) }
            >
              { column.label } { this.renderSortIcon(column) }
            </th>
            ))
          }
        </tr>
      </thead>
    );
  }
}

TableHeader.propTypes = {
  columns: PropTypes.array.isRequired,
  sortColumn: PropTypes.object.isRequired,
  onSortMovie: PropTypes.func.isRequired
}
 
export default TableHeader;
