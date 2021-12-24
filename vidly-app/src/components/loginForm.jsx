import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';

class LoginForm extends Form {
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
    data: { username: '', password: '' },
    errors: {}
  };

  // Using `Joi` to set a schema to handle form validation
  schema = {
    username: Joi.string().required().label('Username'),
    password: Joi.string().required().label('Password')
  };

  doSubmit = () => {
    // TODO: Perform call to server to send data from the form
    console.log('doSubmit called!');
  };

  render() {
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

                Creating a controlled element by binding the `data.username` state to the `value` attribute of the input element
                <input autoFocus type="text" className="form-control" id="username" name="username" value={ username } onChange={ this.handleChange } />
              </div> */}

              {/* <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" name="password" value={ password } onChange={ this.handleChange } />
              </div> */}


              {/* <BaseInput label="Username" type="text" name="username" value={ data.username } error={ errors.username || null } onInputChange={ this.handleChange } />
              
              <BaseInput label="Password" type="password" name="password" value={ data.password } error={ errors.password || null } onInputChange={ this.handleChange } /> */}

              { this.renderFormInput('Username', 'username') }

              { this.renderFormInput('Password', 'password', 'password') }

              { this.renderFormButton('Login') }
            </form>
          </div>
        </div>
      </div>
    );
  }
}
 
export default LoginForm;
