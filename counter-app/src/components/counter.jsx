import React, { Component } from 'react';

class Counter extends Component {
  // Using the `state` property to store the data that will
  // be used in the component. The `state` object will store
  // the data as keys. Here for example, we are storing `count`
  // with an initial value of 0
  state = {
    count: 0,
    tags: ['tag1', 'tag2', 'tag3']
  };

  render() { 
    return (
      <div>
        <span className={ this.getBadgeClasses() }>{ this.formatCount() }</span>
        <button className="btn btn-secondary btn-sm" onClick={ () => this.handleIncrement('product1') }>Increment</button>
        { this.getTags() }
      </div>
    );
  }

  formatCount() {
    const { count } = this.state;

    return count === 0 ? 'Zero' : count;
  }

  getBadgeClasses() {
    const { count } = this.state;
    let classes = 'badge m-2 bg-';

    classes += count === 0 ? 'warning' : 'primary';

    return classes;
  }

  getTags() {
    const { tags } = this.state;

    return tags.length
      ? <ul>{ tags.map((tag, index) => <li key={ `tag-${index}` }>{ tag }</li>) }</ul>
      : <p>Sorry, there are no tags!</p>
  }

  handleIncrement = (product) => {
    // let { count } = this.state;
    console.log('Incrementing count! ', product);

    // Using the `setState()` method to update the `state` property
    // because in React you cannot mutate the `state` directly
    // The `setState()` method indicates React which part of the state
    // is being updated and synchronise the DOM with the virtual DOM
    // to reflect the changes
    this.setState({ count: this.state.count + 1 })
  }
}
 
export default Counter;
