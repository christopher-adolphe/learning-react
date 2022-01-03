import { Component } from 'react';
import { toast } from 'react-toastify';
import authenticationService from '../services/authenticationService';

class Logout extends Component {
  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;

    authenticationService.logout();
    toast.success('You have successfully been logged out!');
    window.location = '/';
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() { 
    return null;
  }
}
 
export default Logout;
