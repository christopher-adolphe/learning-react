import React from 'react';

// Using Stateless Functional Component to create
// a simple component which has no state
// NOTE: Lifecylce hooks cannot be used inside
// Stateless Functional Components
const Navbar = ({ totalCounters }) => {
  console.log('Navbar - render() method called');
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <span className="navbar-brand mb-0 h1">Total counters: <span className="badge rounded-pill bg-info text-dark">{ totalCounters }</span></span>
        </div>
      </nav>
    </header>
  );
}
 
export default Navbar;
