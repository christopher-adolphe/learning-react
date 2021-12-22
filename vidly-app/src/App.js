import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './components/navBar';
import './App.css';

function App() {
  return (
    <Fragment>
      <NavBar />

      <div className="col-lg-8 mx-auto p-3 py-md-5">
        <main>
          <Outlet />
        </main>
      </div>
    </Fragment>
  );
}

export default App;
