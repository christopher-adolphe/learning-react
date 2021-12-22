import React, { Component } from 'react';
import BaseInput from './common/baseInput';

class LoginForm extends Component {
  // Using the `createRef()` method to add a reference to
  // an element in the component's jsx template so that we
  // can get access to this DOM element inside the component's
  // logic
  // username = createRef();

  // Using the `componentDidMount()` lifecycle hook to add
  // focus to the username input by accessing the DOM with
  // the `ref`
  // componentDidMount() {
  //   this.username.current.focus();
  // }
  state = {
    // NOTE: When creating controlled elements, always set the state to
    // an empty string or a default value so as to avoid errors when
    // the component is mounted or when it updates; i.e
    // DON'T DO THIS => account: { username: null, password: null }
    // NOR THIS => account: { username: '' }
    // Both would cause errors
    account: { username: '', password: '' },
    errors: {}
  };

  validate() {
    const { account } = this.state;
    const errors = {};

    if (account.username.trim() === '') {
      errors.username = 'Username is required';
    }

    if (account.password.trim() === '') {
      errors.password = 'Password is required';
    }

    return Object.keys(errors).length ? errors : null;
  }

  handleSubmit = (event) => {
    event.preventDefault();

    // Using the `username` ref to access the input element
    // const username = this.username.current.value;

    const errors = this.validate(event.currentTarget);

    console.log('handleSubmit errors: ', errors);

    this.setState({ errors });

    if (errors) {
      return;
    }

    console.log('handleSubmit called...');
  };

  // Using object destructuring to rename the `event.currentTarget` property
  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };

    // Using the `event.currentTarget` property to get the
    // value of the username input
    account[input.name] = input.value;

    this.setState({ account });
  };

  render() {
    const { username, password } = this.state.account;

    return (
      <div className="container">
        <div className="row">
          <div className="col-4 mx-auto">
            <h1>Login</h1>

            <form onSubmit={ this.handleSubmit }>
              {/* <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                Setting the `ref` attribute on the input element
                <input type="text" className="form-control" id="username" ref={ this.username } />

                Creating a controlled element by binding the `account.username` state to the `value` attribute of the input element
                <input autoFocus type="text" className="form-control" id="username" name="username" value={ username } onChange={ this.handleChange } />
              </div> */}

              {/* <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" name="password" value={ password } onChange={ this.handleChange } />
              </div> */}

              <BaseInput label="Username" type="text" name="username" value={ username } onInputChange={ this.handleChange } />
              
              <BaseInput label="Password" type="password" name="password" value={ password } onInputChange={ this.handleChange } />

              <button type="submit" className="btn btn-primary">Login</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
 
export default LoginForm;
