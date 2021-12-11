import React, { Component } from 'react';
import Navbar  from './components/navbar';
import Counters from './components/counters';
import './App.css';

// React Component Lifecylce Hook
// 1. Mounting Phase: When an instance of a component is created
// and inserted into the DOM. Methods that hook into 
// this phase are: `constructor()`, `render()` and `componentDidMount()`
// NOTE: These methods are called in order

// 2. Updating Phase: When the `props` or the `state` of a component
// get changed. Methods that hook into this phase are:
// `render()`, `componentDidUpdate()`
// NOTE: These methods are called in order

// 3. Unmounting Phase: When an instance of a component is removed
// from the DOM. The method that hooks into this phase is: `componentWillUnmount()`

// NOTE: These lifecycle hooks are the most commonly used but there
// exist others

class App extends Component {
  state = {
    counters: [
      { id: 1, value: 2 },
      { id: 2, value: 6 },
      { id: 3, value: 0 },
      { id: 4, value: 12 }
    ]
  };

  constructor(props) {
    super(props);
    console.log('App - constructor() method called');

    // This is the ideal place to initialize the `state`
    // of a component. In the `constructor()` method, the
    // `state` property is initialized without using the
    // `setState()` method
    // NOTE: If we want to get access to the `props` property
    // inside the `constructor()` method, we need to pass it
    // as an argument to both the `constructor()` and the `super()`
    // methods before we start using `this.props`
  }

  componentDidMount() {
    console.log('App - componentDidMount() method called');
    // This is the ideal place to get data from the server and update
    // the `state` property using the `setState()` method as the
    // `componentDidMount()` method is called after the component
    // is rendered into the DOM
  }

  handlerIncrement = (counter) => {
    console.log('Incrementing count! ', counter);

    const counters = [ ...this.state.counters ];
    const index = counters.indexOf(counter);

    counters[index].value += 1;

    this.setState({ counters });
  }

  handleDelete = (id) => {
    console.log('handleDelete called: ', id);
    const counters = this.state.counters.filter(counter => counter.id !== id );

    this.setState({ counters });
  }

  handleReset = () => {
    console.log('handleReset called');
    const counters = this.state.counters.map(counter => {
      counter.value = 0;

      return counter;
    });

    this.setState({ counters });
  }

  render() {
    console.log('App - render() method called');
    // This is the place where a React element representing the virtual DOM is
    // created and returned
    return (
      <React.Fragment>
        <Navbar totalCounters={ this.state.counters.filter(counter => counter.value > 0).length } />
  
        <main className="container mt-3">
          <Counters
            counters={ this.state.counters }
            onIncrement={ this.handlerIncrement }
            onDelete={ this.handleDelete }
            onReset={ this.handleReset }
          />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
