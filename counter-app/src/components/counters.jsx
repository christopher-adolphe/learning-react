import React, { Component } from 'react';
import Counter from './counter';

class Counters extends Component {
  componentDidUpdate() {
    console.log('Counters - componentDidUpdate() method called');
  }

  getCounters() {
    const { counters, onIncrement, onDecrement, onDelete } = this.props;

    return counters.length
      ? counters.map(counter => <Counter key={ counter.id } counter={ counter } onIncrement={ onIncrement } onDecrement= { onDecrement } onDelete={ onDelete } />)
      : <p>Sorry, there are no counters</p>
  }

  render() {
    console.log('Counters - render() method called');

    return (
      <React.Fragment>
        <button className="btn btn-primary btn-sm m-2" onClick={ this.props.onReset }>Reset</button>
        { this.getCounters() }
      </React.Fragment>
    );
  }
}
 
export default Counters;
