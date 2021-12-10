import React, { Component } from 'react';
import Counter from './counter';

class Counters extends Component {
  state = {
    counters: [
      { id: 1, value: 2 },
      { id: 2, value: 6 },
      { id: 3, value: 0 },
      { id: 4, value: 12 }
    ]
  }

  getCounters() {
    const { counters } = this.state;

    return counters.length
      ? counters.map(counter => <Counter key={ counter.id } id={ counter.id } value={ counter.value } onDelete={ this.handleDelete } />)
      : <p>Sorry, there are no counters</p>
  }

  handleDelete = (id) => {
    console.log('handleDelete called: ', id);
    const { counters } = this.state;

    this.setState({ counters: counters.filter(counter => counter.id !== id )});
  }

  render() {
    return (
      <div>
        { this.getCounters() }
      </div>
    );
  }
}
 
export default Counters;