import React, { useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';

function Users(props) {
  const [ users, setUsers ] = useState([]);

  const getUsers = async () => {
    const { data: users } = await axios.get('/users');

    setUsers(users);
  };

  useEffect(() => {
    getUsers();
  });
  
  return (
    <ul>
      {
        users.map(user => (<li key={ user.id }>{ user.name }</li>))
      }
    </ul>
  );
}

export default Users;
