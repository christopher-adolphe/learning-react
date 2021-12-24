import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';

class RegisterForm extends Form {
  state = {
    data: { username: '', password: '', name: '' },
    errors: {}
  };

  schema = {
    username: Joi.string().required().email().label('Username'),
    password: Joi.string().required().min(5).label('Password'),
    name: Joi.string().required().label("Name")
  };

  doSubmit = () => {
    // TODO: Perform call to server to send data from the form
    console.log('doSubmit called to register!');
  };

  render() { 
    return (
      <div className="container">
        <div className="row">
          <div className="col-4">
            <h1 className="mb-4">Register</h1>

            <form onSubmit={ this.handleSubmit }>
              { this.renderFormInput('Username', 'username') }

              { this.renderFormInput('Password', 'password', 'password') }

              { this.renderFormInput('Name', 'name') }

              { this.renderFormButton('Register') }
            </form>
          </div>
        </div>
      </div>
    );
  }
}
 
export default RegisterForm;
