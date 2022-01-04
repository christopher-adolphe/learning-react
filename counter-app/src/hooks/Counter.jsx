import React, { useState, Fragment } from 'react';

function Counter(props) {
  // Using the `useState()` hook to make state available inside the functional component
  // The `useState()` hook takes an initial value as argument and returns an array containing
  // as its 1st element the state set to the initial value passed as argument and a function
  // as its 2nd element to update the  value of the state
  // const array = useState(0);
  // const count = array[0] ==> this.state.count
  // const setCount = array[1] ==> this.setState({ count: 2 })
  // To simplify the syntax, we can use array destructuring to extract both the state and the
  // function to update the state in a single line
  // NOTE: React Hooks cannot be called conditionnally or inside loops because React relies
  // on the order the hooks are called to internally keep track and manage the states
  const [ count, setCount ] = useState(0);

  // The naming convention when destructuring the array returned by the `useState()` hook is to
  // prefix the name of the function to update the state with `set`; meaning if we name the state
  // `age`, we should name the function to update the state as `setAge`
  const [ name, setName ] = useState('');

  return (
    <Fragment>
      <input type="text" onChange={ (event) => setName(event.target.value) } />
      <div>
        { name } has clicked { count } times!
      </div>
      <button type="button" onClick={ () => setCount(count + 1) }>Increase count</button>
    </Fragment>
  );
}

export default Counter;
