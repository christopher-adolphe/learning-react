import React from 'react';
import Joi from 'joi-browser';
import { toast } from 'react-toastify';
import Form from './common/form';
import userService from '../services/userService';
import authenticationService from '../services/authenticationService';

class RegisterForm extends Form {
  _isMounted = false;

  state = {
    data: { username: '', password: '', name: '' },
    errors: {}
  };

  schema = {
    username: Joi.string().required().email().label('Username'),
    password: Joi.string().required().min(5).label('Password'),
    name: Joi.string().required().label("Name")
  };

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  doSubmit = async () => {
    try {
      const { username: email, password, name } = this.state.data;
      const response = await userService.register({ name, email, password });

      authenticationService.autoLogin(response.headers['x-auth-token'])
      toast.success('User was successfully registered');
      window.location = '/';
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const { data: errorMessage } = error.response;

        toast.error(errorMessage);
      }
    }

    this.resetForm();
  };

  resetForm() {
    const data = { username: '', password: '', name: '' };

    if (this._isMounted) {
      this.setState({ data });
    }
  }

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
