import React, { Component } from 'react';
import Joi from 'joi-browser';
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

  // Using `Joi` to set a schema to handle form validation
  schema = {
    username: Joi.string().required().label('Username'),
    password: Joi.string().required().label('Password')
  };

  validate() {
    // const { username, password } = this.state.account;
    // const errors = {};

    // if (username.trim() === '') {
    //   errors.username = 'Username is required';
    // }

    // if (password.trim() === '') {
    //   errors.password = 'Password is required';
    // }

    // return Object.keys(errors).length ? errors : null;

    // Refactoring the `validate()` method to handle the validation with `Joi`
    // Using the `validate()` method from `Joi` and passing the oject we want to
    // validate and the schema against which we want to run the validation
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.account, this.schema, options);

    console.log('validate result: ', error);

    if (!error) {
      return null;
    }

    const errors = {};

    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }

    return errors;
  }

  validateInput = ({ name, value }) => {
    console.log('validateInput name: ', name);
    console.log('validateInput value: ', value);
    if (name === 'username') {
      if (value.trim() === '') {
        return 'Username is required';
      }
    }

    if (name === 'password') {
      if (value.trim() === '') {
        return 'Password is required';
      }
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();

    // Using the `username` ref to access the input element
    // const username = this.username.current.value;

    const errors = this.validate(event.currentTarget);

    this.setState({ errors: errors || {} });

    if (errors) {
      return;
    }
  };

  // Using object destructuring to rename the `event.currentTarget` property
  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    const errors = { ...this.state.errors };
    const errorMessage = this.validateInput(input);

    if (errorMessage) {
      errors[input.name] = errorMessage;
    } else {
      delete errors[input.name];
    }
    

    // Using the `event.currentTarget` property to get the
    // value of the username input
    account[input.name] = input.value;

    this.setState({ account, errors });
  };

  render() {
    const { account, errors } = this.state;

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

              <BaseInput label="Username" type="text" name="username" value={ account.username } error={ errors.username || null } onInputChange={ this.handleChange } />
              
              <BaseInput label="Password" type="password" name="password" value={ account.password } error={ errors.password || null } onInputChange={ this.handleChange } />

              <button type="submit" className="btn btn-primary">Login</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
 
export default LoginForm;
