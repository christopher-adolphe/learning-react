import React, { Component, Fragment } from 'react';
import withTooltip from './withTooltip';

class Movie extends Component {
  render() {
    const { tooltipText } = this.props;

    return (
      <Fragment>
        <div>Movie component</div>
        {
          this.props.showTooltip ? <span>{ tooltipText }</span> : null
        }
      </Fragment>
    );
  }
}
 
export default withTooltip(Movie);
