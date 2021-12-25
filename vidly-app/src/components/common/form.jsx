import { Component } from 'react';
import Joi from 'joi-browser';
import BaseInput from './baseInput';
import BaseSelect from './baseSelect';

class Form extends Component {
  state = {
    data: {},
    error: {}
  };

  validate() {
    // const { username, password } = this.state.data;
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
    const { error } = Joi.validate(this.state.data, this.schema, options);

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
    // if (name === 'username') {
    //   if (value.trim() === '') {
    //     return 'Username is required';
    //   }
    // }

    // if (name === 'password') {
    //   if (value.trim() === '') {
    //     return 'Password is required';
    //   }
    // }

    // Refactoring the `validate()` method to handle the validation with `Joi`
    const input = { [name]: value };
    const inputSchema = { [name]: this.schema[name] };
    const { error } = Joi.validate(input, inputSchema);

    return error ? error.details[0].message : null;
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

    this.doSubmit();
  };

  // Using object destructuring to rename the `event.currentTarget` property
  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    const errors = { ...this.state.errors };
    const errorMessage = this.validateInput(input);

    if (errorMessage) {
      errors[input.name] = errorMessage;
    } else {
      delete errors[input.name];
    }
    
    // Using the `event.currentTarget` property to get the
    // value of the username input
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  renderFormInput(label, name, type = 'text') {
    const { data, errors } = this.state;

    return (
      <BaseInput label={ label } type={ type } name={ name } value={ data[name] } error={ errors[name] || null } onInputChange={ this.handleChange } />
    );
  }

  renderFormSelect(label, name, options) {
    const { data, errors } = this.state;

    return (
      <BaseSelect label={ label } name={ name } options={ options } value={ data[name] } error={ errors[name] || null } onInputChange={ this.handleChange } />
    );
  }

  renderFormButton(label) {
    return (
      <button type="submit" className="btn btn-primary" disabled={ this.validate() }>{ label }</button>
    );
  }
}
 
export default Form;
