import { Fragment, Component } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import jwtDecode from 'jwt-decode';
import NavBar from './components/navBar';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

class App extends Component {
  state = {
    user: null
  };

  componentDidMount() {
    try {
      const token = localStorage.getItem('token');
      const user = jwtDecode(token);
      
      this.setState({ user });
    } catch (error) {}
  }

  render() {
    const { user } = this.state;

    return (
      <Fragment>
        <ToastContainer />
  
        <NavBar user={ user } />
  
        <div className="col-lg-8 mx-auto p-3 py-md-5">
          <main>
            <Outlet />
          </main>
        </div>
      </Fragment>
    );
  }
}

export default App;
