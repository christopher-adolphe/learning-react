import { Fragment, Component } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import NavBar from './components/navBar';
import Loader from './components/loader';
import authenticationService from './services/authenticationService';
import AppContext from './context/appContext';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

class App extends Component {
  state = {
    user: null,
    isLoaderVisible: false
  };

  componentDidMount() {
    const user = authenticationService.getUser();
    
    this.setState({ user });
  }

  handleToggleLoader = (isVisible) => {
    this.setState({ isLoaderVisible: isVisible });
  };

  render() {
    const { user, isLoaderVisible } = this.state;

    return (
      <Fragment>
        <AppContext.Provider value={ { onToggleLoader: this.handleToggleLoader } }>
          <ToastContainer />
    
          <NavBar user={ user } />
    
          <div className="col-lg-8 mx-auto p-3 py-md-5">
            <main>
              <Outlet />
            </main>
          </div>

          <Loader isVisible={ isLoaderVisible } />
        </AppContext.Provider>
      </Fragment>
    );
  }
}

export default App;
