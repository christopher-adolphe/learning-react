import React, { Component } from 'react';

class Filter extends Component {
  render() { 
    return (
      <div className="btn-group-vertical" role="group" aria-label="Filter movies by genre">
        <button type="button" className="btn btn-outline-secondary">All Genres</button>
        <button type="button" className="btn btn-outline-secondary">Genre 1</button>
        <button type="button" className="btn btn-outline-secondary">Genre 2</button>
        <button type="button" className="btn btn-outline-secondary">Genre 3</button>
      </div>
    );
  }
}
 
export default Filter;
