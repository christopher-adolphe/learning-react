import React, { Component } from 'react';

class Counter extends Component {
  // Using the `state` property to store the data that will
  // be used in the component. The `state` object will store
  // the data as keys. Here for example, we are storing `value`
  // and initializing it with a value from outside the component
  // using the `props` property. The `state` is local and internal
  // to a component, it is invisible to other components
  // NOTE: A component can be created without the `state` property
  // and get all its data via the `props` property. Such a component
  // is called a `controlled component`; meaning it will receive its
  // data from a parent component and will notify this parent when
  // changes to its data occur and will do so by raising events
  // state = {
  //   value: this.props.counter.value,
  //   tags: ['tag1', 'tag2', 'tag3']
  // }

  componentDidUpdate(prevProps, prevState) {
    console.log('Counter - componentDidUpdate() method called', { prevProps, prevState });
  }

  componentWillUnmount() {
    console.log('Counter - componentWillUnmount() method called');
  }

  formatCount() {
    const { value } = this.props.counter;

    return value === 0 ? 'Zero' : value;
  }

  getBadgeClasses() {
    const { value } = this.props.counter;
    let classes = 'badge m-auto bg-';

    classes += value === 0 ? 'warning' : 'primary';

    return classes;
  }

  isButtonDisabled() {
    const { value } = this.props.counter;

    return value === 0 ? 'disabled' : '';
  }

  // getTags() {
  //   const { tags } = this.state;

  //   return tags.length
  //     ? <ul>{ tags.map((tag, index) => <li key={ `tag-${index}` }>{ tag }</li>) }</ul>
  //     : <p>Sorry, there are no tags!</p>
  // }

  // handleIncrement = (product) => {
  //   // let { count } = this.state;
  //   console.log('Incrementing count! ', product);

  //   // Using the `setState()` method to update the `state` property
  //   // because in React you cannot mutate the `state` directly
  //   // The `setState()` method indicates React which part of the state
  //   // is being updated and synchronise the DOM with the virtual DOM
  //   // to reflect the changes
  //   this.setState({ value: this.state.value + 1 })
  // }

  render() {
    // Every React component has a `props` property which is a
    // plain javascript object contains all the attribute that
    // are set on that component and can thus be used to pass
    // data to the component from outside
    // NOTE: The `state` property is private to a component
    // meaning that it is only accessible within the component.
    // The `props` property on the other hand are attributes
    // set from outside the component as inputs to pass data
    // and it is read only
    // console.log('Counter props: ', this.props);

    console.log('Counter - render() method called');

    return (
      <div className="row">
        <div className="col-1">
          <span className={ this.getBadgeClasses() }>{ this.formatCount() }</span>
        </div>

        <div className="col">
          <button className="btn btn-secondary btn-sm m-2" onClick={ () => this.props.onIncrement(this.props.counter) }>+</button>
          <button className="btn btn-secondary btn-sm m-2" onClick={ () => this.props.onDecrement(this.props.counter) } disabled={ this.isButtonDisabled() }>-</button>
          <button className="btn btn-danger btn-sm m-2" onClick={ () => this.props.onDelete(this.props.counter.id) }>X</button>
        </div>
      </div>
    );
  }
}
 
export default Counter;
