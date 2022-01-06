import React, { useContext } from 'react';
import UserContext from './userContext';

function Login(props) {
  const userContext = useContext(UserContext);

  return (
    <div>
      <button type="button" onClick={ () => userContext.onLoggedIn({ name: 'Jack Bauer', role: 'admin'}) }>Login</button>
    </div>
  );
}

export default Login;
